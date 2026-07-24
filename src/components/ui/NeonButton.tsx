import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/50 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-neon/10 text-neon border border-neon/40 hover:bg-neon/20 hover:shadow-neon-md hover:border-neon/70',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  outline:
    'border border-white/15 text-slate-200 hover:border-neon/40 hover:text-neon hover:bg-neon/5',
  danger:
    'bg-danger/10 text-danger-400 border border-danger/40 hover:bg-danger/20 hover:shadow-neon-danger',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };
type AsLink = CommonProps & { to: string };

export default function NeonButton(props: AsButton | AsLink) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...rest
  } = props as AsButton & Partial<AsLink>;

  const classes = [base, variants[variant], sizes[size], className].join(' ');

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
