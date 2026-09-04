import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  { title: "Create Your Business", subtitle: "Tell us about your business" },
  { title: "Business Information", subtitle: "More details about your business" },
  { title: "Business Goals", subtitle: "What do you want to achieve?" },
  { title: "Digital Readiness", subtitle: "Let's assess your digital readiness" },
];

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <span className="status-icons">
        <span>◢</span>
        <span>◠</span>
        <span>▱</span>
      </span>
    </div>
  );
}

function Stepper({ active }) {
  return (
    <div
      className={`setup-stepper progress-${active}`}
      aria-label={`Setup step ${active + 1} of 4`}
    >
      {steps.map((_, index) => (
        <span
          key={index}
          className={index <= active ? "step-node active" : "step-node"}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
}

function Field({ label, placeholder }) {
  return (
    <label className="setup-field">
      {label}
      <input placeholder={placeholder} />
    </label>
  );
}

export default function Setup() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [goals, setGoals] = useState([]);
  const [readiness, setReadiness] = useState({});
  const current = steps[activeStep];
  const toggleGoal = (goal) =>
    setGoals((selected) =>
      selected.includes(goal)
        ? selected.filter((item) => item !== goal)
        : [...selected, goal],
    );

  return (
    <main className="onboarding-shell">
      <section className="phone-screen setup-screen" aria-label={current.title}>
        <StatusBar />
        <div className="setup-content">
          <button
            className="back-button"
            type="button"
            onClick={() =>
              activeStep === 0 ? navigate("/signup") : setActiveStep(activeStep - 1)
            }
            aria-label="Go back"
          >
            ←
          </button>
          <Stepper active={activeStep} />
          <h1 className="setup-title">{current.title}</h1>
          <p className="setup-subtitle">{current.subtitle}</p>
          {activeStep === 0 && (
            <div className="setup-fields">
              <Field label="Business Name" placeholder="e.g. Sokha Coffee" />
              <Field label="Business Type" placeholder="Select Type" />
              <Field label="Business Category" placeholder="Select Category" />
              <Field label="Business Location" placeholder="Select Location" />
            </div>
          )}
          {activeStep === 1 && (
            <div className="setup-fields">
              <Field label="Business Employees" placeholder="Select number" />
              <Field label="Year in operation" placeholder="Select years" />
              <Field label="Business Category" placeholder="Select Category" />
              <Field label="Business Location" placeholder="Select Location" />
            </div>
          )}
          {activeStep === 2 && (
            <div className="goal-list">
              {[
                "Increase Sales",
                "Increase Profit",
                "Reduce Costs",
                "Understand My Product",
                "Improve Marketing",
                "Other Goal",
              ].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  className={goals.includes(goal) ? "choice selected" : "choice"}
                  onClick={() => toggleGoal(goal)}
                >
                  <span className="checkbox">{goals.includes(goal) ? "✓" : ""}</span>
                  {goal}
                </button>
              ))}
            </div>
          )}
          {activeStep === 3 && (
            <div className="readiness-list">
              {[
                ["Digital Sales", "Medium"],
                ["Data Management", "Low"],
                ["Digital Marketing", "Medium"],
                ["Security", "High"],
                ["Digital Tools", "Medium"],
              ].map(([label, level]) => (
                <button
                  type="button"
                  key={label}
                  className="readiness-row"
                  onClick={() =>
                    setReadiness({
                      ...readiness,
                      [label]:
                        readiness[label] === "High"
                          ? "Low"
                          : readiness[label] === "Low"
                            ? "Medium"
                            : "High",
                    })
                  }
                >
                  <span className="readiness-icon">✦</span>
                  <b>{label}</b>
                  <em
                    className={
                      (readiness[label] || level) === "High"
                        ? "high"
                        : (readiness[label] || level) === "Low"
                          ? "low"
                          : "medium"
                    }
                  >
                    {readiness[label] || level}
                  </em>
                </button>
              ))}
            </div>
          )}
          <button
            className="setup-next"
            type="button"
            onClick={() =>
              activeStep === steps.length - 1
                ? navigate("/complete")
                : setActiveStep(activeStep + 1)
            }
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
        <div className="home-indicator" />
      </section>
    </main>
  );
}
