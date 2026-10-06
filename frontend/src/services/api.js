import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const analyzeIngredients = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/ingredients/analyze", formData);

  return response.data;
};

export default api;