import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Ingredients from "./pages/Ingredients";
import Preferences from "./pages/Preferences";
import Suggestions from "./pages/Suggestions";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyRecipes from "./pages/MyRecipes";
import EditRecipe from "./pages/EditRecipe";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Recipe Management */}
            <Route
              path="/my-recipes"
              element={<MyRecipes />}
            />

            <Route
              path="/edit-recipe/:id"
              element={<EditRecipe />}
            />

            {/* Existing Cooksy Pages */}
            <Route
              path="/upload"
              element={<Upload />}
            />

            <Route
              path="/ingredients"
              element={<Ingredients />}
            />

            <Route
              path="/preferences"
              element={<Preferences />}
            />

            <Route
              path="/suggestions"
              element={<Suggestions />}
            />

            <Route
              path="/recipe/:id"
              element={<RecipeDetails />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;