import express from "express";
import { getProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected profile route
router.get("/profile", authMiddleware, getProfile);

export default router;