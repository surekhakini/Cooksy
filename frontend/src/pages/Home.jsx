import { Link } from "react-router-dom";
import {
  Camera,
  ChefHat,
  Clock3,
  Leaf,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Home() {
  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Sparkles size={14} />
            AI-powered culinary intelligence
          </div>

          <h1 className="hero-title">
            Snap your ingredients.
            <span>Cook something amazing.</span>
          </h1>

          <p className="hero-description">
            Turn the ingredients you already have into personalized
            recipes with AI-powered vision and intelligent recipe
            generation.
          </p>

          <div className="hero-actions">

            <Link
              to="/upload"
              className="primary-button"
            >
              <Camera size={18} />
              Analyze My Ingredients
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/suggestions"
              className="secondary-button"
            >
              <ChefHat size={18} />
              Explore Recipes
            </Link>

          </div>

          <div className="hero-features">

            <div className="hero-feature">
              <Leaf size={15} />
              Reduce food waste
            </div>

            <div className="hero-feature">
              <Clock3 size={15} />
              Personalized cooking
            </div>

            <div className="hero-feature">
              <Sparkles size={15} />
              AI-powered recipes
            </div>

          </div>

        </div>


        {/* Visual */}
        <div className="hero-visual">

          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85"
            alt="Fresh vegetables and ingredients"
          />

          <div className="ai-status-card">

            <div className="ai-status-icon">
              <Sparkles size={19} />
            </div>

            <div>
              <div className="ai-status-title">
                Cooksy Vision AI
              </div>

              <div className="ai-status-subtitle">
                Ready to analyze your ingredients
              </div>
            </div>

            <span className="ai-status-ready">
              Ready
            </span>

          </div>

        </div>

      </section>


      {/* Introduction */}
      <section className="home-intro">

        <h2>
          From ingredients to inspiration
        </h2>

        <p>
          Upload a photo, review what Cooksy detects, set your
          preferences, and let AI create recipes tailored to you.
        </p>

      </section>

    </div>
  );
}

export default Home;