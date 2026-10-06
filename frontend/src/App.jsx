import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Ingredients from "./pages/Ingredients";
import Preferences from "./pages/Preferences";
import Suggestions from "./pages/Suggestions";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;