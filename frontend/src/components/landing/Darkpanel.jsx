
export function DarkPanel({ className = "", children, radius = "rounded-[32px]" }) {
  return (
    <div
      className={`relative overflow-hidden ${radius} ${className}`}
      style={{
        background:
          "linear-gradient(140deg, #18271F 0%, #2F4A3A 38%, #1A2B22 72%, #0E1812 100%)",
      }}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}