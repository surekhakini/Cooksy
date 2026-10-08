import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRecipe,
  updateRecipe,
} from "../services/api";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("cooksyToken");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecipe = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getRecipe(id, token);
        const recipe = data.recipe;

        setTitle(recipe.title || "");
        setDescription(recipe.description || "");
        setDifficulty(recipe.difficulty || "Easy");
        setServings(recipe.servings || "");
        setPrepTime(recipe.prepTime || "");
        setCookTime(recipe.cookTime || "");

        setDietaryTags(
          recipe.dietaryTags?.join(", ") || ""
        );
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load recipe."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const updatedRecipe = {
        title,
        description,
        difficulty,
        servings: Number(servings),
        prepTime: Number(prepTime),
        cookTime: Number(cookTime),

        dietaryTags: dietaryTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      await updateRecipe(
        id,
        updatedRecipe,
        token
      );

      alert("Recipe updated successfully!");

      navigate("/my-recipes");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update recipe."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <p>Loading recipe...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <h1>Edit Recipe</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Recipe Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="4"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Difficulty</label>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Servings</label>

          <input
            type="number"
            value={servings}
            onChange={(e) =>
              setServings(e.target.value)
            }
            min="1"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Preparation Time (minutes)
          </label>

          <input
            type="number"
            value={prepTime}
            onChange={(e) =>
              setPrepTime(e.target.value)
            }
            min="0"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Cooking Time (minutes)
          </label>

          <input
            type="number"
            value={cookTime}
            onChange={(e) =>
              setCookTime(e.target.value)
            }
            min="0"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Dietary Tags</label>

          <input
            type="text"
            value={dietaryTags}
            onChange={(e) =>
              setDietaryTags(e.target.value)
            }
            placeholder="Vegetarian, High Protein"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />

          <small>
            Separate multiple tags with commas.
          </small>
        </div>

        <button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/my-recipes")
          }
          style={{
            marginLeft: "10px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;