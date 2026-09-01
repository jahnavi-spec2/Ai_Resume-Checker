// Same visual idea (a soft rounded icon with a diamond mark) but static.
// If you want ONE subtle touch of motion later, a plain CSS animate-pulse
// on the outer div is enough — no need for 6 independently-timed effects.
export default function AILogo({ size = 36 }) {
  return (
    <div
      className="rounded-[12px] flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #EEF5EF 0%, #D9E7DD 100%)",
      }}
    >
      <div
        className="h-[14px] w-[14px] rounded-[3px] rotate-45"
        style={{ background: "linear-gradient(135deg, #5B7C6A 0%, #2F4A3A 100%)" }}
      />
    </div>
  );
}