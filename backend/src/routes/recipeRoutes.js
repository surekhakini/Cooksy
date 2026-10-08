import express from "express";

import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All recipe routes require login
router.use(authMiddleware);

// Create recipe
router.post("/", createRecipe);

// Get all my recipes
router.get("/", getRecipes);

// Get one recipe
router.get("/:id", getRecipe);

// Update recipe
router.put("/:id", updateRecipe);

// Delete recipe
router.delete("/:id", deleteRecipe);

export default router;