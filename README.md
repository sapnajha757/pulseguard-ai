<p align="center">
  <img src="https://img.shields.io/badge/PulseGuard-AI-00e5ff?style=for-the-badge&logo=heartbeat&logoColor=white" alt="PulseGuard AI" />
</p>

<h1 align="center">🫀 PulseGuard AI</h1>

<p align="center">
  <strong>Intelligent Healthcare, Always On.</strong><br/>
  AI-powered health monitoring platform with predictive risk analysis, smart medication management, and blockchain-anchored medical records.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Solidity-0.8.20-363636?style=flat-square&logo=solidity&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

<p align="center">
  <a href="https://pulseguard-ai-techchaos.netlify.app">🌐 Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Setup</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-architecture">Architecture</a>
</p>

---

## 📋 Overview

**PulseGuard AI** is a full-stack intelligent healthcare platform that combines AI-driven health analytics, smart medication tracking, predictive risk scoring, and blockchain-backed audit trails to provide a comprehensive health monitoring experience.

The platform serves three distinct user roles — **Patients**, **Doctors (Clinicians)**, and **Family Members** — each with a tailored dashboard providing role-specific insights and controls.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based secure authentication with role-based access control
- User registration with role selection (Patient / Clinician / Family)
- Protected routes and automatic session management
- Interactive **Demo Mode** to explore dashboards with mock data

### 🩺 Patient Dashboard
- **AI Health Score** — Real-time composite health score powered by AI analysis
- **Smart Medication Reminders** — Scheduled reminders with priority levels and adherence tracking
- **Medication Timeline** — Visual history of taken/missed medications
- **Adherence Calendar** — Monthly heatmap of medication compliance
- **AI Insights** — Personalized health recommendations and future risk predictions
- **Risk Assessment** — Visual risk score with contributing factor breakdown
- **Emergency SOS** — One-tap emergency alert to notify family and doctors
- **Add/Manage Medications** — Full CRUD for medication schedules

### 👨‍⚕️ Doctor (Clinician) Dashboard
- **Patient Overview** — Monitor all assigned patients from a single view
- **AI Risk Cards** — Per-patient risk scores with severity indicators
- **Patient Leaderboard** — Adherence ranking across patient roster
- **Top Missed Medicines** — Identify the most frequently missed medications
- **Analytics Dashboard** — Deep-dive charts for adherence trends, risk distribution, and patient stats
- **AI Recommendations** — AI-generated clinical suggestions per patient

### 👨‍👩‍👧 Family Dashboard
- **Loved One Monitoring** — View connected patient's health score and medication status
- **Alert Feed** — Real-time alerts for missed medications and health events
- **Emergency Notifications** — Instant notification when SOS is triggered

### 🔗 Blockchain Integration
- **Polygon Network** — Immutable audit trail on Polygon blockchain
- **PulseGuardAudit Smart Contract** — SHA-256 hash proofs of healthcare events
- **Event Types** — `MEDICINE_TAKEN`, `RISK_ASSESSMENT`, `EMERGENCY_ALERT`
- **Tamper-Proof Records** — HIPAA-aligned data integrity verification

### 🤖 AI-Powered Intelligence
- AI Health Score computation with multi-factor analysis
- Predictive risk assessment with future trend forecasting
- Personalized medication recommendations
- Adherence pattern analysis with actionable insights

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** + **TypeScript** | UI framework with type safety |
| **Vite** | Lightning-fast build tooling |
| **React Router v7** | Client-side routing |
| **Tailwind CSS 3** | Utility-first styling |
| **Lucide React** | Beautiful icon system |
| **Axios** | HTTP client with interceptors |
| **date-fns** | Date formatting and manipulation |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** + **Express** | REST API server |
| **MongoDB** + **Mongoose** | Database and ODM |
| **JWT** (jsonwebtoken) | Stateless authentication |
| **bcryptjs** | Password hashing |
| **node-cron** | Scheduled medication reminders |
| **Nodemailer** | Email alert notifications |
| **Twilio** | SMS alert notifications |
| **Winston** | Structured logging |
| **Helmet** + **CORS** + **Rate Limiting** | Security middleware stack |
| **express-validator** | Input validation |

### Blockchain
| Technology | Purpose |
|---|---|
| **Solidity 0.8.20** | Smart contract language |
| **Hardhat** | Development & testing framework |
| **Ethers.js v6** | Blockchain interaction library |
| **OpenZeppelin** | Secure contract base (Ownable) |
| **Polygon Network** | L2 deployment chain |

### Deployment
| Service | Purpose |
|---|---|
| **Netlify** | Frontend hosting with CI/CD |
| **Render** | Backend API hosting |
| **MongoDB Atlas** | Cloud database |

---

## 🏗 Architecture

```
PulseGuard-AI/
├── frontend/                    # React + TypeScript SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/            # Login & Register forms
│   │   │   ├── dashboard/       # 20+ dashboard components
│   │   │   ├── landing/         # Landing page sections
│   │   │   ├── layout/          # DashboardLayout, PageHeader
│   │   │   └── ui/              # Reusable UI primitives
│   │   ├── context/             # AuthContext (global state)
│   │   ├── pages/               # Route-level page components
│   │   └── services/            # API client & auth service
│   └── package.json
│
├── backend/                     # Express REST API
│   ├── config/                  # DB connection, env, logger
│   ├── controllers/             # Route handlers
│   ├── middleware/               # Auth, error, validation
│   ├── models/                  # Mongoose schemas (6 models)
│   ├── routes/                  # API route definitions (9 routes)
│   ├── services/                # Business logic (10 services)
│   ├── server.js                # App entrypoint
│   └── package.json
│
├── contracts/                   # Solidity smart contracts
│   └── PulseGuardAudit.sol      # Blockchain audit trail
│
├── blockchain/                  # Blockchain interaction utilities
├── netlify.toml                 # Netlify deployment config
├── vercel.json                  # Vercel deployment config
└── hardhat.config.js            # Hardhat blockchain config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/sapnajha757/pulseguard-ai.git
cd pulseguard-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pulseguard

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Email Notifications (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ALERT_EMAIL_FROM=noreply@pulseguard.ai

# SMS Notifications (optional)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Blockchain (optional)
RISK_MODEL_API_URL=
RISK_MODEL_API_KEY=
```

Start the backend:

```bash
npm run dev      # Development with hot-reload
# or
npm start        # Production
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Optionally create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

> **Note:** If `VITE_API_URL` is not set, the app uses `localhost:5000` in development and the production Render backend URL in production builds.

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |

### Medicines
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/medicines` | Get user's medications |
| `POST` | `/medicines` | Add a new medication |
| `PUT` | `/medicines/:id` | Update a medication |
| `DELETE` | `/medicines/:id` | Delete a medication |

### Risk Assessment
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/risk/latest` | Get latest risk score |
| `POST` | `/risk/assess` | Trigger new risk assessment |

### Alerts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/alerts` | Get user's alerts |
| `POST` | `/alerts/sos` | Trigger emergency SOS |

### AI Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/ai-health/score` | Get AI health score |
| `GET` | `/ai-health/insights` | Get AI-generated insights |

### Adherence
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/adherence/calendar` | Get adherence calendar data |
| `GET` | `/adherence/stats` | Get adherence statistics |

### Doctor Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/doctor/patients` | Get all assigned patients |
| `GET` | `/doctor/analytics` | Get analytics dashboard data |

### Blockchain
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/blockchain/records` | Get audit trail records |
| `POST` | `/blockchain/anchor` | Anchor a new health event |

---

## 🔒 Security

- **Helmet** — HTTP security headers
- **CORS** — Configurable origin allowlist (Vercel, Netlify, custom domains)
- **Rate Limiting** — 100 requests per 15-minute window per IP
- **JWT Authentication** — Stateless token-based auth with expiry
- **bcrypt** — Password hashing with salt rounds
- **Input Validation** — express-validator on all endpoints
- **HIPAA-Aligned** — End-to-end encryption and blockchain audit trails

---

## 🌐 Deployment

### Frontend (Netlify)
The frontend auto-deploys from the `main` branch. Build settings:
- **Build command:** `cd frontend && npm install && npm run build`
- **Publish directory:** `frontend/dist`

### Backend (Render)
The backend auto-deploys from the `main` branch. Settings:
- **Build command:** `cd backend && npm install`
- **Start command:** `cd backend && npm start`
- **Environment:** Node.js 18+

### Environment Variables
Set all variables from the `.env` template above in your Render dashboard under **Environment**.

---

## 📊 Data Models

| Model | Description |
|-------|-------------|
| **User** | Patient, Doctor, or Family member with auth credentials |
| **Medicine** | Medication schedule with dosage, frequency, and reminders |
| **MedicationLog** | Record of taken/missed medication events |
| **Risk** | Risk assessment scores with contributing factors |
| **RiskAssessment** | Detailed risk analysis with predictions |
| **Alert** | Emergency and notification alerts |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Author

**Sapna Jha** — [@sapnajha757](https://github.com/sapnajha757)

---

<p align="center">
  <sub>Built with ❤️ for a healthier tomorrow</sub><br/>
  <sub>© 2026 PulseGuard AI · Secured on Polygon</sub>
</p>
