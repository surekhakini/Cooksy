import express from "express";
import cors from "cors";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Cooksy backend is running",
  });
});

// Existing ingredient routes
app.use("/api/ingredients", ingredientRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

export default app;