import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    // User who owns this recipe
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Basic recipe information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    // Recipe ingredients
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        quantity: {
          type: String,
          trim: true,
        },
      },
    ],

    // Cooking instructions
    instructions: [
      {
        step: {
          type: Number,
          required: true,
        },

        description: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    // Nutrition information
    nutrition: {
      calories: {
        type: Number,
      },

      protein: {
        type: Number,
      },

      carbs: {
        type: Number,
      },

      fat: {
        type: Number,
      },

      fiber: {
        type: Number,
      },
    },

    servings: {
      type: Number,
    },

    prepTime: {
      type: Number,
    },

    cookTime: {
      type: Number,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },

    dietaryTags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;