import {
  ArrowLeft,
  Clock3,
  Users,
  ChefHat,
  Check,
  Bookmark,
} from "lucide-react";

import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useCooksy } from "../context/CooksyContext";
import { createRecipe } from "../services/api";

const recipes = {
  1: {
    title: "Creamy Indian Masala Pasta",

    description:
      "A comforting fusion pasta combining creamy sauce, fresh vegetables and warm Indian spices.",

    time: 25,

    servings: 2,

    difficulty: "Easy",

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
    title: "Spiced Vegetable Stir-Fry",

    description:
      "A quick and flavorful vegetable stir-fry made with fresh ingredients and aromatic spices.",

    time: 20,

    servings: 2,

    difficulty: "Easy",

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
    title: "Loaded Veggie Masala Bowl",

    description:
      "A wholesome bowl packed with colorful vegetables, aromatic spices and fresh herbs.",

    time: 35,

    servings: 2,

    difficulty: "Medium",

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

function RecipeDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { preferences } = useCooksy();

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const recipe = recipes[id] || recipes[1];

  const handleSaveRecipe = async () => {
    const token = localStorage.getItem(
      "cooksyToken"
    );

    if (!token) {
      alert("Please login to save recipes.");

      navigate("/login");

      return;
    }

    try {
      setSaving(true);

      const recipeData = {
        title: recipe.title,

        description: recipe.description,

        ingredients: recipe.ingredients.map(
          (ingredient) => ({
            name: ingredient,
            quantity: "",
          })
        ),

        instructions: recipe.steps.map(
          (step, index) => ({
            step: index + 1,
            description: step,
          })
        ),

        servings: recipe.servings,

        prepTime: recipe.time,

        cookTime: 0,

        difficulty: recipe.difficulty,

        dietaryTags: preferences?.diet
          ? [preferences.diet]
          : [],
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
      alert(
        error.response?.data?.message ||
          "Failed to save recipe."
      );
    } finally {
      setSaving(false);
    }
  };

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

            <h1>{recipe.title}</h1>

            <p>{recipe.description}</p>

            <div className="recipe-detail-meta">

              <span>
                <Clock3 size={17} />

                {recipe.time} minutes
              </span>

              <span>
                <Users size={17} />

                {recipe.servings} servings
              </span>

              <span>
                <ChefHat size={17} />

                {recipe.difficulty}
              </span>

            </div>

            <button
              className="primary-button save-recipe-button"
              onClick={handleSaveRecipe}
              disabled={
                saving || saved
              }
            >
              <Bookmark size={17} />

              {saving
                ? "Saving..."
                : saved
                ? "Recipe Saved"
                : "Save Recipe"}
            </button>

          </div>
        </div>

        <div className="recipe-content-grid">

          <div className="recipe-ingredients">

            <div className="recipe-section-heading">
              <span>01</span>

              <h2>Ingredients</h2>
            </div>

            <div className="recipe-ingredient-list">

              {recipe.ingredients.map(
                (ingredient) => (
                  <div
                    className="recipe-ingredient"
                    key={ingredient}
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

          <div className="recipe-steps">

            <div className="recipe-section-heading">
              <span>02</span>

              <h2>How to make it</h2>
            </div>

            <div className="cooking-steps">

              {recipe.steps.map(
                (step, index) => (
                  <div
                    className="cooking-step"
                    key={step}
                  >
                    <div className="step-number">
                      {index + 1}
                    </div>

                    <p>{step}</p>
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