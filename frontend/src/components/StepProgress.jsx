import { Link, useLocation } from "react-router-dom";

const steps = [
  {
    number: 1,
    label: "Home",
    path: "/",
  },
  {
    number: 2,
    label: "Upload",
    path: "/upload",
  },
  {
    number: 3,
    label: "Edit",
    path: "/ingredients",
  },
  {
    number: 4,
    label: "Preferences",
    path: "/preferences",
  },
  {
    number: 5,
    label: "Recipes",
    path: "/suggestions",
  },
];

function StepProgress() {
  const location = useLocation();

  const currentStep =
    steps.findIndex((step) => step.path === location.pathname) + 1;

  return (
    <div className="step-progress">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        return (
          <div className="step-wrapper" key={step.path}>
            <Link
              to={step.path}
              className={`step ${
                isActive ? "active" : ""
              } ${isCompleted ? "completed" : ""}`}
            >
              <span>{step.number}.</span>
              <span>{step.label}</span>
            </Link>

            {index < steps.length - 1 && (
              <span className="step-arrow">›</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepProgress;