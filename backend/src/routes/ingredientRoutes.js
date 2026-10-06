import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { analyzeIngredientImage } from "../controllers/ingredientController.js";

const router = express.Router();

router.post("/analyze", upload.single("image"), analyzeIngredientImage);

export default router;