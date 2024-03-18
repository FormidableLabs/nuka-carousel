type NavButtonsProps = {
  enablePrevNavButton: boolean;
  enableNextNavButton: boolean;
  goBack: () => void;
  goForward: () => void;
};

export function NavButtons({
  enablePrevNavButton,
  enableNextNavButton,
  goBack,
  goForward,
}: NavButtonsProps) {
  return (
    <div className="nuka-nav">
      <span
        className={`nuka-nav-button ${
          enablePrevNavButton ? 'nuka-nav-button-enabled' : ''
        }`}
        onClick={goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentcolor"
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span
        className={`nuka-nav-button ${
          enableNextNavButton ? 'nuka-nav-button-enabled' : ''
        }`}
        onClick={goForward}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentcolor"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
}