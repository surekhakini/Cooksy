import express from "express";
import cors from "cors";
import ingredientRoutes from "./routes/ingredientRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Cooksy backend is running",
  });
});

app.use("/api/ingredients", ingredientRoutes);

export default app;