import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecipes,
  deleteRecipe,
} from "../services/api";

function MyRecipes() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [diet, setDiet] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("cooksyToken");

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError("");

      const filters = {};

      if (search.trim()) {
        filters.search = search.trim();
      }

      if (difficulty) {
        filters.difficulty = difficulty;
      }

      if (diet.trim()) {
        filters.diet = diet.trim();
      }

      const data = await getRecipes(token, filters);

      setRecipes(data.recipes || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load recipes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const handleClearFilters = () => {
    setSearch("");
    setDifficulty("");
    setDiet("");

    setTimeout(() => {
      fetchRecipes();
    }, 0);
  };

  const handleDelete = async (recipeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRecipe(recipeId, token);

      setRecipes((currentRecipes) =>
        currentRecipes.filter(
          (recipe) => recipe._id !== recipeId
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete recipe."
      );
    }
  };

  if (!token) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          textAlign: "center",
        }}
      >
        <h1>My Recipes</h1>

        <p>
          Please login to view your saved recipes.
        </p>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <h1>My Recipes</h1>

      <p>
        View and manage all your saved recipes.
      </p>

      {/* Search and Filters */}

      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "25px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            minWidth: "250px",
          }}
        />

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          style={{
            padding: "10px",
          }}
        >
          <option value="">
            All Difficulties
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>

        <input
          type="text"
          placeholder="Diet e.g. Vegetarian"
          value={diet}
          onChange={(e) =>
            setDiet(e.target.value)
          }
          style={{
            padding: "10px",
            width: "190px",
          }}
        />

        <button type="submit">
          Search
        </button>

        <button
          type="button"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </form>

      {/* Loading */}

      {loading && (
        <p>Loading your recipes...</p>
      )}

      {/* Error */}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* No recipes */}

      {!loading &&
        !error &&
        recipes.length === 0 && (
          <div>
            <h2>No recipes found</h2>

            <p>
              You haven't saved any recipes yet.
            </p>
          </div>
        )}

      {/* Recipe Cards */}

      {!loading && recipes.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h2>{recipe.title}</h2>

              {recipe.description && (
                <p>
                  {recipe.description}
                </p>
              )}

              {recipe.difficulty && (
                <p>
                  <strong>
                    Difficulty:
                  </strong>{" "}
                  {recipe.difficulty}
                </p>
              )}

              {recipe.servings && (
                <p>
                  <strong>
                    Servings:
                  </strong>{" "}
                  {recipe.servings}
                </p>
              )}

              {recipe.prepTime !== undefined && (
                <p>
                  <strong>
                    Prep time:
                  </strong>{" "}
                  {recipe.prepTime} min
                </p>
              )}

              {recipe.cookTime !== undefined && (
                <p>
                  <strong>
                    Cook time:
                  </strong>{" "}
                  {recipe.cookTime} min
                </p>
              )}

              {recipe.dietaryTags?.length > 0 && (
                <p>
                  <strong>
                    Dietary tags:
                  </strong>{" "}
                  {recipe.dietaryTags.join(", ")}
                </p>
              )}

              {/* View Recipe Button */}

              <button
                onClick={() =>
                  navigate(
                    `/recipe/${recipe._id}`
                  )
                }
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                View
              </button>

              {/* Edit Button */}

              <button
                onClick={() =>
                  navigate(
                    `/edit-recipe/${recipe._id}`
                  )
                }
                style={{
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              {/* Delete Button */}

              <button
                onClick={() =>
                  handleDelete(recipe._id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;