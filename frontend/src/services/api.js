import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Analyze ingredients using AI
export const analyzeIngredients = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/ingredients/analyze", formData);

  return response.data;
};

// =========================
// AUTHENTICATION
// =========================

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// =========================
// USER
// =========================

// Get logged-in user's profile
export const getUserProfile = async (token) => {
  const response = await api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// RECIPES
// =========================

// Create a recipe
export const createRecipe = async (recipeData, token) => {
  const response = await api.post("/recipes", recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get user's recipes
export const getRecipes = async (token, filters = {}) => {
  const response = await api.get("/recipes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  });

  return response.data;
};

// Get one recipe
export const getRecipe = async (recipeId, token) => {
  const response = await api.get(`/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update a recipe
export const updateRecipe = async (recipeId, recipeData, token) => {
  const response = await api.put(`/recipes/${recipeId}`, recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete a recipe
export const deleteRecipe = async (recipeId, token) => {
  const response = await api.delete(`/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default api;