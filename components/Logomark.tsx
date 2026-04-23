export default function Logomark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" opacity=".25" />
      <path d="M 12 32 A 20 20 0 0 1 52 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" />
    </svg>
  );
}
