// "STÅLCO" där O:et är en sexkantsmutter, som i loggan.
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} aria-label="Stålco">
      <span aria-hidden="true">STÅLC</span>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="nut">
        <path d="M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z M50 30 A20 20 0 1 0 50.01 30 Z" fillRule="evenodd" />
      </svg>
    </span>
  );
}
