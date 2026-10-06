import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCooksy } from "../context/CooksyContext";

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "High Protein",
  "Low Carb",
  "Gluten Free",
  "Dairy Free",
];

const cuisineOptions = [
  "Indian",
  "Italian",
  "Asian",
  "Mexican",
  "Mediterranean",
];

function Preferences() {
  const navigate = useNavigate();

  const { preferences, setPreferences } = useCooksy();

  const { dietary, cuisine, servings, maxTime } = preferences;

  const toggleDietary = (option) => {
    setPreferences((current) => ({
      ...current,
      dietary: current.dietary.includes(option)
        ? current.dietary.filter((item) => item !== option)
        : [...current.dietary, option],
    }));
  };

  const handleContinue = () => {
    navigate("/suggestions");
  };

  return (
    <section className="preferences-page">
      <div className="preferences-container">

        <div className="preferences-heading">
          <span className="upload-eyebrow">
            STEP 4 · YOUR PREFERENCES
          </span>

          <h1>
            Tell us how
            <span>you like it.</span>
          </h1>

          <p>
            We'll use these preferences to create recipes around
            your ingredients.
          </p>
        </div>

        <div className="preferences-card">

          {/* Dietary Preferences */}
          <div className="preference-section">
            <label>Dietary preferences</label>

            <div className="preference-options">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`preference-chip ${
                    dietary.includes(option) ? "selected" : ""
                  }`}
                  onClick={() => toggleDietary(option)}
                >
                  {dietary.includes(option) && <Check size={15} />}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine */}
          <div className="preference-section">
            <label>Preferred cuisine</label>

            <div className="preference-options">
              {cuisineOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`preference-chip ${
                    cuisine === option ? "selected" : ""
                  }`}
                  onClick={() =>
                    setPreferences((current) => ({
                      ...current,
                      cuisine: option,
                    }))
                  }
                >
                  {cuisine === option && <Check size={15} />}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Servings + Cooking Time */}
          <div className="preference-row">

            <div className="preference-section">
              <label>Servings</label>

              <select
                value={servings}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    servings: Number(event.target.value),
                  }))
                }
              >
                <option value={1}>1 person</option>
                <option value={2}>2 people</option>
                <option value={3}>3 people</option>
                <option value={4}>4 people</option>
                <option value={5}>5 people</option>
                <option value={6}>6 people</option>
              </select>
            </div>

            <div className="preference-section">
              <label>Maximum cooking time</label>

              <select
                value={maxTime}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    maxTime: Number(event.target.value),
                  }))
                }
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>90+ minutes</option>
              </select>
            </div>

          </div>

          {/* Continue */}
          <button
            type="button"
            className="primary-button preference-continue"
            onClick={handleContinue}
          >
            Generate Recipe Ideas
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default Preferences;