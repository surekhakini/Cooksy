import { analyzeIngredients } from "../services/ai/visionService.js";

export const analyzeIngredientImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const ingredients = await analyzeIngredients(
      req.file.buffer,
      req.file.mimetype
    );

    return res.status(200).json({
      success: true,
      data: ingredients,
    });
  } catch (error) {
    console.error("Ingredient analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze ingredients.",
    });
  }
};