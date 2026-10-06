import { ArrowRight, Clock3, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCooksy } from "../context/CooksyContext";

const mockSuggestions = [
  {
    id: "1",
    title: "Creamy Indian Masala Pasta",
    description:
      "A comforting fusion pasta packed with your vegetables and warm Indian spices.",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    tags: ["Vegetarian", "Indian Fusion"],
  },
  {
    id: "2",
    title: "Spiced Vegetable Stir-Fry",
    description:
      "A quick and flavorful stir-fry using fresh vegetables with a delicious spice blend.",
    time: 20,
    servings: 2,
    difficulty: "Easy",
    tags: ["Vegetarian", "Quick"],
  },
  {
    id: "3",
    title: "Loaded Veggie Masala Bowl",
    description:
      "A wholesome bowl combining roasted vegetables, aromatic spices and fresh herbs.",
    time: 35,
    servings: 2,
    difficulty: "Medium",
    tags: ["Healthy", "Indian"],
  },
];

function Suggestions() {
  const navigate = useNavigate();

  const { ingredients, preferences, setPreferences } = useCooksy();

  const selectRecipe = (recipe) => {
    setPreferences((current) => ({
      ...current,
      selectedRecipe: recipe,
    }));

    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <section className="suggestions-page">
      <div className="suggestions-container">

        <div className="suggestions-heading">
          <span className="upload-eyebrow">
            STEP 5 · RECIPE IDEAS
          </span>

          <h1>
            What are you
            <span>in the mood for?</span>
          </h1>

          <p>
            Based on your ingredients and preferences, here are
            some ideas you might love.
          </p>
        </div>

        <div className="suggestions-summary">
          <div>
            <span>INGREDIENTS</span>
            <strong>{ingredients.length}</strong>
          </div>

          <div>
            <span>CUISINE</span>
            <strong>{preferences.cuisine}</strong>
          </div>

          <div>
            <span>MAX TIME</span>
            <strong>{preferences.maxTime} min</strong>
          </div>
        </div>

        <div className="recipe-suggestion-grid">
          {mockSuggestions.map((recipe) => (
            <article
              className="recipe-suggestion-card"
              key={recipe.id}
            >
              <div className="recipe-card-icon">
                <Sparkles size={22} />
              </div>

              <div className="recipe-card-content">
                <div className="recipe-tags">
                  {recipe.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <h2>{recipe.title}</h2>

                <p>{recipe.description}</p>

                <div className="recipe-meta">
                  <span>
                    <Clock3 size={15} />
                    {recipe.time} min
                  </span>

                  <span>
                    <Users size={15} />
                    {recipe.servings}
                  </span>

                  <span>{recipe.difficulty}</span>
                </div>
              </div>

              <button
                className="recipe-select-button"
                onClick={() => selectRecipe(recipe)}
              >
                View Recipe
                <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Suggestions;