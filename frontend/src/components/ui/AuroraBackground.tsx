export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-base" />
      {/* grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* radial top glow */}
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade" />
      {/* floating orbs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-neon/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[140px] animate-float" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-neon/10 blur-[120px] animate-glow-pulse" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,6,12,0.9))]" />
    </div>
  );
}
