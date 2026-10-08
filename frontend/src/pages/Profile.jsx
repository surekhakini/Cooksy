import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Mail, LogOut } from "lucide-react";
import { getUserProfile } from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("cooksyToken");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getUserProfile(token);

        setUser(data.user);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("cooksyToken");
    localStorage.removeItem("cooksyUser");

    navigate("/");
  };

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          textAlign: "center",
        }}
      >
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          textAlign: "center",
        }}
      >
        <h1>Profile</h1>

        <p style={{ color: "red" }}>
          {error}
        </p>

        <button onClick={() => navigate("/login")}>
          Login Again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "16px",
          padding: "30px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <UserRound size={50} />

          <h1>My Profile</h1>

          <p>
            Manage your Cooksy account.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <strong>Name</strong>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
              padding: "12px",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <UserRound size={18} />

            <span>{user?.name}</span>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <strong>Email</strong>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
              padding: "12px",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <Mail size={18} />

            <span>{user?.email}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/my-recipes")}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          View My Recipes
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px",
          }}
        >
          <LogOut
            size={17}
            style={{
              verticalAlign: "middle",
              marginRight: "8px",
            }}
          />

          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;