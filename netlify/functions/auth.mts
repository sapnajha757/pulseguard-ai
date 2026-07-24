import type { Config } from '@netlify/functions';
import { and, eq, gt } from 'drizzle-orm';
import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { db } from '../../db/client';
import { authSessions, users } from '../../db/schema';

const scrypt = promisify(scryptCallback);
const allowedRoles = new Set(['patient', 'doctor', 'family']);
const sessionLifetimeMs = 24 * 60 * 60 * 1000;

type AuthBody = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
};

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
};

const verifyPassword = async (password: string, storedHash: string) => {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;

  const storedKey = Buffer.from(key, 'hex');
  const derivedKey = (await scrypt(password, salt, storedKey.length)) as Buffer;
  return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
};

const publicUser = (user: typeof users.$inferSelect) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const createSession = async (userId: string) => {
  const token = randomBytes(32).toString('base64url');
  await db.insert(authSessions).values({
    id: randomUUID(),
    userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + sessionLifetimeMs),
  });
  return token;
};

const getBearerToken = (req: Request) => {
  const authorization = req.headers.get('authorization');
  return authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
};

const getAuthenticatedUser = async (req: Request) => {
  const token = getBearerToken(req);
  if (!token) return null;

  const [result] = await db
    .select({ user: users })
    .from(authSessions)
    .innerJoin(users, eq(authSessions.userId, users.id))
    .where(and(eq(authSessions.tokenHash, hashToken(token)), gt(authSessions.expiresAt, new Date())))
    .limit(1);

  return result?.user ?? null;
};

const register = async (req: Request) => {
  const body = (await req.json()) as AuthBody;
  const name = body.name?.trim();
  const email = body.email ? normalizeEmail(body.email) : '';
  const password = body.password ?? '';
  const role = body.role && allowedRoles.has(body.role) ? body.role : 'patient';

  if (!name || !email || !password) return json({ message: 'Name, email and password are required' }, 400);
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ message: 'Please provide a valid email address' }, 400);
  if (password.length < 6) return json({ message: 'Password must be at least 6 characters' }, 400);

  const [existingUser] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existingUser) return json({ message: 'User with this email already exists' }, 409);

  const [user] = await db
    .insert(users)
    .values({
      id: randomUUID(),
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
    })
    .returning();

  const token = await createSession(user.id);
  return json({ user: publicUser(user), token }, 201);
};

const login = async (req: Request) => {
  const body = (await req.json()) as AuthBody;
  const email = body.email ? normalizeEmail(body.email) : '';
  const password = body.password ?? '';

  if (!email || !password) return json({ message: 'Email and password are required' }, 400);

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return json({ message: 'Invalid credentials' }, 401);
  }

  const now = new Date();
  await db.update(users).set({ lastLogin: now, updatedAt: now }).where(eq(users.id, user.id));
  const token = await createSession(user.id);
  return json({ user: publicUser(user), token });
};

const logout = async (req: Request) => {
  const token = getBearerToken(req);
  if (token) await db.delete(authSessions).where(eq(authSessions.tokenHash, hashToken(token)));
  return json({ message: 'Logged out successfully' });
};

export default async (req: Request) => {
  try {
    const action = new URL(req.url).pathname.split('/').pop();

    if (req.method === 'POST' && action === 'register') return await register(req);
    if (req.method === 'POST' && action === 'login') return await login(req);
    if (req.method === 'POST' && action === 'logout') return await logout(req);

    if (req.method === 'GET' && action === 'me') {
      const user = await getAuthenticatedUser(req);
      return user ? json(publicUser(user)) : json({ message: 'Not authorized' }, 401);
    }

    return json({ message: 'Route not found' }, 404);
  } catch {
    console.error('Authentication request failed');
    return json({ message: 'Unable to complete authentication request' }, 500);
  }
}

export const config: Config = {
  path: [
    '/api/v1/auth/register',
    '/api/v1/auth/login',
    '/api/v1/auth/logout',
    '/api/v1/auth/me',
  ],
};
