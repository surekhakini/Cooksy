import { useState } from "react";
import { Check, Plus, X, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCooksy } from "../context/CooksyContext";

function Ingredients() {
  const navigate = useNavigate();
  const { ingredients, setIngredients } = useCooksy();
  const [newIngredient, setNewIngredient] = useState("");

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(
      ingredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      )
    );
  };

  const addIngredient = () => {
    const trimmedIngredient = newIngredient.trim();

    if (!trimmedIngredient) return;

    if (
      !ingredients.some(
        (ingredient) =>
          ingredient.toLowerCase() === trimmedIngredient.toLowerCase()
      )
    ) {
      setIngredients([...ingredients, trimmedIngredient]);
    }

    setNewIngredient("");
  };

  return (
    <section className="ingredients-page">
      <div className="ingredients-container">

        <div className="ingredients-heading">
          <span className="upload-eyebrow">
            STEP 3 · REVIEW INGREDIENTS
          </span>

          <h1>
            Here's what
            <span>we found.</span>
          </h1>

          <p>
            Cooksy detected these ingredients from your photo.
            Remove anything incorrect or add anything we missed.
          </p>
        </div>

        <div className="ai-detection-card">

          <div className="ai-card-header">
            <div className="ai-title">
              <div className="ai-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <h2>AI detected ingredients</h2>
                <p>{ingredients.length} ingredients found</p>
              </div>
            </div>

            <div className="ai-badge">
              <Check size={14} />
              AI Detected
            </div>
          </div>

          <div className="ingredient-list">
            {ingredients.map((ingredient) => (
              <div
                className="ingredient-item"
                key={ingredient}
              >
                <span>{ingredient}</span>

                <button
                  onClick={() => removeIngredient(ingredient)}
                  aria-label={`Remove ${ingredient}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="add-ingredient">
            <input
              type="text"
              placeholder="Add an ingredient..."
              value={newIngredient}
              onChange={(event) =>
                setNewIngredient(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addIngredient();
                }
              }}
            />

            <button onClick={addIngredient}>
              <Plus size={18} />
              Add
            </button>
          </div>

        </div>

        <div className="ingredients-footer">
          <p>
            You can always adjust your ingredients later.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/preferences")}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Ingredients;