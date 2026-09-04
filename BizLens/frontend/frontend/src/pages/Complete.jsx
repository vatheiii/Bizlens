import { useNavigate } from "react-router-dom";

function GrowthIllustration() {
  return (
    <svg
      className="growth-art"
      viewBox="0 0 210 150"
      role="img"
      aria-label="Business growth illustration"
    >
      <path d="M35 126h120" stroke="#222" strokeWidth="4" strokeLinecap="round" />
      <path d="M54 124V94h21v30M83 124V72h22v52M113 124V45h22v79M143 124V22h20v102" fill="#202020" />
      <path d="M36 113c35-4 76-29 128-82" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" />
      <path d="m153 25 14 3-7 13" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="#222" stroke="#fff" strokeWidth="1.5">
        <circle cx="39" cy="65" r="9" />
        <circle cx="63" cy="50" r="8" />
        <circle cx="79" cy="31" r="8" />
        <circle cx="99" cy="18" r="8" />
        <circle cx="177" cy="58" r="8" />
        <circle cx="167" cy="94" r="11" />
        <circle cx="42" cy="102" r="9" />
      </g>
      <g fill="#fff" fontFamily="Arial" fontSize="10" fontWeight="700" textAnchor="middle">
        <text x="39" y="69">$</text>
        <text x="63" y="54">$</text>
        <text x="79" y="35">$</text>
        <text x="99" y="22">$</text>
        <text x="177" y="62">$</text>
        <text x="167" y="98">$</text>
        <text x="42" y="106">$</text>
      </g>
      <path
        d="M25 125c11-8 22 9 32 0M24 120c10-8 21 9 32 0M25 115c11-8 20 8 31 0M168 128c12-9 23 9 35 0M170 123c10-8 20 8 33 0M171 118c10-8 19 8 31 0"
        fill="none"
        stroke="#222"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Complete() {
  const navigate = useNavigate();
  return (
    <main className="onboarding-shell">
      <section className="phone-screen complete-screen" aria-label="Business setup complete">
        <div className="status-bar">
          <span>9:41</span>
          <span className="status-icons">
            <span>◢</span>
            <span>◠</span>
            <span>▱</span>
          </span>
        </div>
        <div className="complete-content">
          <GrowthIllustration />
          <h1>You’re All Set!</h1>
          <p>
            Your business setup is complete
            <br />
            You can now start analyzing your
            <br />
            business data with BizLens
          </p>
          <button type="button" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
        <div className="home-indicator" />
      </section>
    </main>
  );
}
