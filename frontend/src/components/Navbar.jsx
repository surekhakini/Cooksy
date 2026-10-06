import { Link } from "react-router-dom";
import { ChefHat, Bookmark, UserRound } from "lucide-react";

import StepProgress from "./StepProgress";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-icon">
          <ChefHat size={21} />
        </div>

        <span className="brand-name">Cooksy</span>

        <span className="brand-badge">AI RECIPE</span>
      </Link>

      <StepProgress />

      <div className="nav-actions">
        <button className="saved-button">
          <Bookmark size={17} />
          <span>Saved</span>
        </button>

        <button className="profile-button">
          <UserRound size={18} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;