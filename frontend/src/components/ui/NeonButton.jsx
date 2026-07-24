// NeonButton — Reusable button with neon glow variants
export default function NeonButton({
  children,
  variant = 'primary', // primary | danger | success | warning | ghost
  solid = false,
  size = 'md', // sm | md | lg
  block = false,
  iconOnly = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const variantMap = {
    primary: '',
    danger: 'danger',
    success: 'success',
    warning: 'warning',
    ghost: 'ghost',
  }
  const sizeMap = { sm: 'sm', md: '', lg: 'lg' }

  const classes = [
    'btn-neon',
    variantMap[variant],
    solid ? 'solid' : '',
    sizeMap[size],
    block ? 'block' : '',
    iconOnly ? 'icon-only' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
