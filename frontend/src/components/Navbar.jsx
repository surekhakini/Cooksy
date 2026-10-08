import { Link, useNavigate } from "react-router-dom";
import {
  ChefHat,
  Bookmark,
  UserRound,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";

import StepProgress from "./StepProgress";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("cooksyToken");
  const user = JSON.parse(
    localStorage.getItem("cooksyUser") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("cooksyToken");
    localStorage.removeItem("cooksyUser");

    navigate("/");
  };

  return (
    <header className="navbar">
      {/* Cooksy Logo */}
      <Link to="/" className="brand">
        <div className="brand-icon">
          <ChefHat size={21} />
        </div>

        <span className="brand-name">Cooksy</span>

        <span className="brand-badge">
          AI RECIPE
        </span>
      </Link>

      {/* Existing Progress */}
      <StepProgress />

      {/* Navigation Actions */}
      <div className="nav-actions">
        {/* Saved / My Recipes */}
        {token && (
          <Link
            to="/my-recipes"
            className="saved-button"
          >
            <Bookmark size={17} />
            <span>Saved</span>
          </Link>
        )}

        {/* Logged-in user */}
        {token ? (
          <>
            <Link
              to="/profile"
              className="profile-button"
              title={user?.name || "Profile"}
            >
              <UserRound size={18} />
            </Link>

            <button
              className="profile-button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link
              to="/login"
              className="saved-button"
            >
              <LogIn size={17} />
              <span>Login</span>
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="saved-button"
            >
              <UserPlus size={17} />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;