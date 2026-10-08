import {
  ArrowLeft,
  Clock3,
  Users,
  ChefHat,
  Check,
  Bookmark,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useCooksy } from "../context/CooksyContext";

import {
  createRecipe,
  getRecipe,
} from "../services/api";

const recipeDetails = {
  1: {
    ingredients: [
      "200g pasta",
      "2 tomatoes",
      "1 onion",
      "3 garlic cloves",
      "1 capsicum",
      "1 tbsp oil",
      "1 tsp garam masala",
      "1/2 tsp chilli powder",
      "Salt to taste",
    ],

    steps: [
      "Boil the pasta until al dente and keep it aside.",
      "Heat oil in a pan and sauté onion and garlic.",
      "Add tomatoes and capsicum and cook until softened.",
      "Add the spices and mix well.",
      "Add the cooked pasta and combine everything.",
      "Cook for 2–3 minutes and serve hot.",
    ],
  },

  2: {
    ingredients: [
      "2 tomatoes",
      "1 onion",
      "1 capsicum",
      "2 garlic cloves",
      "1 tbsp oil",
      "1 tsp chilli powder",
      "1/2 tsp cumin",
      "Salt to taste",
    ],

    steps: [
      "Wash and chop all vegetables.",
      "Heat oil in a large pan.",
      "Add cumin, garlic and onion.",
      "Add the remaining vegetables.",
      "Season with spices and salt.",
      "Stir-fry on high heat for 5–7 minutes and serve.",
    ],
  },

  3: {
    ingredients: [
      "2 potatoes",
      "2 tomatoes",
      "1 onion",
      "1 capsicum",
      "Fresh coriander",
      "1 tbsp oil",
      "1 tsp garam masala",
      "1/2 tsp turmeric",
      "Salt to taste",
    ],

    steps: [
      "Chop the vegetables into bite-sized pieces.",
      "Season the potatoes and roast until golden.",
      "Sauté onion, tomatoes and capsicum.",
      "Add the spices and cook until fragrant.",
      "Add the roasted potatoes.",
      "Top with fresh coriander and serve.",
    ],
  },
};

const defaultTitles = {
  1: "Creamy Indian Masala Pasta",
  2: "Spiced Vegetable Stir-Fry",
  3: "Loaded Veggie Masala Bowl",
};

function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { preferences } = useCooksy();

  const token = localStorage.getItem("cooksyToken");

  const [recipe, setRecipe] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecipe = async () => {
      /*
       * CASE 1:
       * Recipe came from the friend's Suggestions page.
       *
       * These recipes use IDs 1, 2 and 3.
       */

      if (recipeDetails[id]) {
        const selectedRecipe =
          preferences?.selectedRecipe;

        setRecipe({
          ...(selectedRecipe || {}),

          ...recipeDetails[id],

          title:
            selectedRecipe?.title ||
            defaultTitles[id],

          description:
            selectedRecipe?.description ||
            "",

          time:
            selectedRecipe?.time ||
            0,

          servings:
            selectedRecipe?.servings ||
            1,

          difficulty:
            selectedRecipe?.difficulty ||
            "Easy",

          tags:
            selectedRecipe?.tags ||
            [],
        });

        setLoading(false);

        return;
      }

      /*
       * CASE 2:
       * Recipe came from My Recipes.
       *
       * MongoDB recipes have an ObjectId,
       * so we fetch the actual recipe from
       * our backend.
       */

      if (!token) {
        setError(
          "Please login to view this recipe."
        );

        setLoading(false);

        return;
      }

      try {
        const data = await getRecipe(
          id,
          token
        );

        const savedRecipe = data.recipe;

        setRecipe({
          ...savedRecipe,

          ingredients:
            savedRecipe.ingredients?.map(
              (ingredient) => {
                if (ingredient.quantity) {
                  return `${ingredient.quantity} ${ingredient.name}`;
                }

                return ingredient.name;
              }
            ) || [],

          steps:
            savedRecipe.instructions?.map(
              (instruction) =>
                instruction.description
            ) || [],

          time:
            savedRecipe.prepTime || 0,

          tags:
            savedRecipe.dietaryTags || [],
        });

        /*
         * This recipe is already in MongoDB,
         * so don't show the Save button.
         */

        setSaved(true);
      } catch (error) {
        console.error(
          "Load recipe error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load recipe."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, token, preferences]);

  const handleSaveRecipe = async () => {
    if (!token) {
      alert(
        "Please login to save recipes."
      );

      navigate("/login");

      return;
    }

    try {
      setSaving(true);

      const recipeData = {
        title: recipe.title,

        description:
          recipe.description || "",

        ingredients:
          recipe.ingredients.map(
            (ingredient) => ({
              name: ingredient,

              quantity: "",
            })
          ),

        instructions:
          recipe.steps.map(
            (step, index) => ({
              step: index + 1,

              description: step,
            })
          ),

        servings:
          recipe.servings || 1,

        prepTime:
          recipe.time ||
          recipe.prepTime ||
          0,

        cookTime:
          recipe.cookTime || 0,

        difficulty:
          recipe.difficulty ||
          "Easy",

        dietaryTags:
          recipe.tags ||
          recipe.dietaryTags ||
          [],
      };

      await createRecipe(
        recipeData,
        token
      );

      setSaved(true);

      alert(
        "Recipe saved successfully!"
      );
    } catch (error) {
      console.error(
        "Save recipe error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save recipe."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="recipe-details-page">
        <div className="recipe-details-container">
          <p>Loading recipe...</p>
        </div>
      </section>
    );
  }

  if (error || !recipe) {
    return (
      <section className="recipe-details-page">
        <div className="recipe-details-container">

          <button
            className="back-button"
            onClick={() =>
              navigate("/my-recipes")
            }
          >
            <ArrowLeft size={17} />

            Back to My Recipes
          </button>

          <p
            style={{
              color: "red",
              marginTop: "20px",
            }}
          >
            {error ||
              "Recipe not found."}
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="recipe-details-page">
      <div className="recipe-details-container">

        <button
          className="back-button"
          onClick={() =>
            navigate("/suggestions")
          }
        >
          <ArrowLeft size={17} />

          Back to ideas
        </button>

        <div className="recipe-hero">

          <div className="recipe-hero-content">

            <span className="upload-eyebrow">
              YOUR COOKSY RECIPE
            </span>

            <h1>
              {recipe.title}
            </h1>

            <p>
              {recipe.description}
            </p>

            <div className="recipe-detail-meta">

              <span>
                <Clock3 size={17} />

                {recipe.time ||
                  recipe.prepTime ||
                  0}{" "}
                minutes
              </span>

              <span>
                <Users size={17} />

                {recipe.servings || 1}{" "}
                servings
              </span>

              <span>
                <ChefHat size={17} />

                {recipe.difficulty ||
                  "Easy"}
              </span>

            </div>

            {/* Save button only appears for
                recipes that are not already saved */}

            {!saved && (
              <button
                className="primary-button save-recipe-button"
                onClick={
                  handleSaveRecipe
                }
                disabled={saving}
              >
                <Bookmark size={17} />

                {saving
                  ? "Saving..."
                  : "Save Recipe"}
              </button>
            )}

            {saved && (
              <button
                className="secondary-button"
                onClick={() =>
                  navigate(
                    "/my-recipes"
                  )
                }
                style={{
                  marginTop: "12px",
                }}
              >
                {recipe._id
                  ? "Back to My Recipes"
                  : "View My Recipes"}
              </button>
            )}

          </div>
        </div>

        <div className="recipe-content-grid">

          {/* Ingredients */}

          <div className="recipe-ingredients">

            <div className="recipe-section-heading">

              <span>01</span>

              <h2>
                Ingredients
              </h2>

            </div>

            <div className="recipe-ingredient-list">

              {recipe.ingredients?.map(
                (ingredient, index) => (
                  <div
                    className="recipe-ingredient"
                    key={`${ingredient}-${index}`}
                  >
                    <Check size={16} />

                    <span>
                      {ingredient}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

          {/* Cooking steps */}

          <div className="recipe-steps">

            <div className="recipe-section-heading">

              <span>02</span>

              <h2>
                How to make it
              </h2>

            </div>

            <div className="cooking-steps">

              {recipe.steps?.map(
                (step, index) => (
                  <div
                    className="cooking-step"
                    key={`${step}-${index}`}
                  >
                    <div className="step-number">
                      {index + 1}
                    </div>

                    <p>
                      {step}
                    </p>
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RecipeDetails;