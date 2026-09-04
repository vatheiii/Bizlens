import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EyeOffIcon() {
  return (
    <span className="eye-off" aria-hidden="true">
      ◉̸
    </span>
  );
}

function AuthScreen({ mode, onSwitch }) {
  const navigate = useNavigate();
  const isLogin = mode === "login";

  return (
    <div className="auth-content">
      <button
        className="back-button"
        type="button"
        onClick={onSwitch}
        aria-label="Back to previous screen"
      >
        ←
      </button>
      <div className="auth-heading">
        <h1>{isLogin ? "Welcome Back!" : "Create Account"}</h1>
        <p>{isLogin ? "Sign in to continue" : "Let's get you started"}</p>
      </div>
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!isLogin) navigate("/setup");
        }}
      >
        {!isLogin && (
          <label>
            Full Name
            <input type="text" placeholder="Example Jame" />
          </label>
        )}
        <label>
          Email
          <input type="email" placeholder="example@gmail.com" />
        </label>
        <label>
          Password
          <div className="password-wrap">
            <input type="password" placeholder="Enter your Password" />
            <EyeOffIcon />
          </div>
        </label>
        {isLogin && (
          <button type="button" className="forgot-link">
            Forgot Password?
          </button>
        )}
        <button
          type="submit"
          className={isLogin ? "auth-primary login-submit" : "auth-primary"}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {!isLogin && (
        <>
          <p className="or-divider">Or created with</p>
          <div className="social-options">
            <button type="button">
              <b className="google-mark">G</b>Google
            </button>
            <button type="button">
              <b className="facebook-mark">f</b>Facebook
            </button>
          </div>
        </>
      )}
      <p className="switch-copy">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={onSwitch}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

function AnalyticsIllustration() {
  return (
    <svg
      className="analytics-art"
      viewBox="0 0 520 265"
      role="img"
      aria-label="Business analytics illustration"
    >
      <rect x="165" y="78" width="214" height="135" rx="6" fill="#ffffff" stroke="#087a9b" strokeWidth="7" />
      <path d="M176 105h193M176 132h193M176 159h193M176 186h193" stroke="#d9edf1" strokeWidth="2" />
      <path d="M198 190v-42h25v42M237 190v-63h25v63M276 190v-82h25v82M315 190v-56h25v56M354 190v-75h25v75" fill="#62b4db" />
      <path d="M220 213h105v12H220z" fill="#087a9b" />
      <path d="M244 225h57v10h-57z" fill="#244c68" />
      <rect x="122" y="58" width="112" height="60" rx="3" fill="#fff" stroke="#55a5c2" strokeWidth="5" />
      <path d="M122 58h112" stroke="#3f8fab" strokeWidth="7" />
      <circle cx="160" cy="88" r="20" fill="#f6c65c" />
      <path d="M160 68a20 20 0 0 1 16 32l-16-12z" fill="#4aa7ca" />
      <path d="M160 88 144 100a20 20 0 0 1 0-24z" fill="#8bd0d6" />
      <path d="M194 76h28M194 85h22M194 94h28M194 103h18" stroke="#8dc5d3" strokeWidth="4" />
      <rect x="286" y="15" width="82" height="48" rx="3" fill="#fff" stroke="#d7e9ed" strokeWidth="3" />
      <path d="M289 52h75M292 47l17-5 10 4 13-13 9 4 12-20" fill="none" stroke="#f0ab4d" strokeWidth="4" />
      <path d="M292 47l17-5 10 4 13-13 9 4 12-20v35h-61z" fill="#f7c66c" opacity=".7" />
      <circle cx="415" cy="100" r="30" fill="#e8f6f8" stroke="#244c68" strokeWidth="7" />
      <circle cx="415" cy="100" r="21" fill="#b9e0e8" opacity=".8" />
      <path d="m437 122 25 25" stroke="#244c68" strokeWidth="9" strokeLinecap="round" />
      <path d="M432 121c9-8 13-20 10-31" fill="none" stroke="#fff" strokeWidth="4" opacity=".7" />
      <path d="M96 222h72M84 222l-12 38M156 222l14 38M92 260h74" stroke="#244c68" strokeWidth="4" />
      <path d="M103 183c-6 15 1 35 11 43h30c8-15 6-31-2-43z" fill="#f4b840" />
      <circle cx="125" cy="170" r="10" fill="#244c68" />
      <path d="M124 180v39M109 197h31M126 219v35" stroke="#244c68" strokeWidth="5" strokeLinecap="round" />
      <path d="M69 205h50l-8 17H75z" fill="#66bdd4" stroke="#244c68" strokeWidth="3" />
      <path d="M70 205l-17 40M116 205l14 40" stroke="#244c68" strokeWidth="4" />
      <path d="M442 155c-5 15-2 31 5 42l-12 60h22l7-54 15 54h21l-21-69c-3-10-7-22-14-33z" fill="#2e9cba" />
      <circle cx="451" cy="144" r="9" fill="#244c68" />
      <path d="M445 168h30l20 26" stroke="#88bf40" strokeWidth="16" strokeLinecap="round" />
      <path d="M463 168l-5 36" stroke="#88bf40" strokeWidth="13" />
    </svg>
  );
}

function SearchIllustration() {
  return (
    <svg
      className="search-art"
      viewBox="0 0 150 150"
      role="img"
      aria-label="Search insights illustration"
    >
      <circle cx="64" cy="63" r="45" fill="#f4f8f8" stroke="#07869c" strokeWidth="7" />
      <circle cx="64" cy="63" r="32" fill="none" stroke="#244c68" strokeWidth="5" />
      <path d="M45 43h38M40 54h48M39 66h50M43 78h42M52 36v54M64 33v59M76 37v52" stroke="#1594a8" strokeWidth="3" />
      <path d="m94 94 27 27" stroke="#244c68" strokeWidth="15" strokeLinecap="round" />
      <path d="M31 107v18M42 111v14M53 105v20M78 107v17M88 101v23" stroke="#244c68" strokeWidth="5" strokeLinecap="round" />
      <path d="M108 53h16M105 63h12M103 73h14" stroke="#244c68" strokeWidth="5" strokeLinecap="round" />
      <circle cx="125" cy="24" r="5" fill="#07869c" />
    </svg>
  );
}

export default function Index({ initialSlide = 0 }) {
  const [activeSlide, setActiveSlide] = useState(initialSlide);

  return (
    <main className="onboarding-shell">
      <section
        className="phone-screen"
        aria-label={
          activeSlide === 0
            ? "BizLens introduction"
            : activeSlide === 1
              ? "BizLens login"
              : "BizLens account creation"
        }
      >
        <div className="status-bar">
          <span>9:41</span>
          <span className="status-icons">
            <span>◢</span>
            <span>◠</span>
            <span>▱</span>
          </span>
        </div>
        {activeSlide === 0 ? (
          <div className="welcome-content">
            <AnalyticsIllustration />
            <h1 className="brand">BizLens</h1>
            <p className="tagline">
              AI-Powered Business
              <br />
              Insights for MSMEs
            </p>
            <SearchIllustration />
          </div>
        ) : (
          <AuthScreen
            mode={activeSlide === 1 ? "login" : "signup"}
            onSwitch={() => setActiveSlide(activeSlide === 1 ? 2 : 1)}
          />
        )}
        <div className="pagination" aria-label="Onboarding slides">
          {[0, 1, 2].map((slide) => (
            <button
              key={slide}
              aria-label={`Go to slide ${slide + 1}`}
              aria-pressed={activeSlide === slide}
              className={activeSlide === slide ? "dot active" : "dot"}
              onClick={() => setActiveSlide(slide)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
