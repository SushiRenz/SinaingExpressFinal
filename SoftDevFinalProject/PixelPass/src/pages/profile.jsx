import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import "./game.css"; // For card styling

const PASS_PRODUCT = {
  title: "PixelPass Subscription",
  price: "$5.00",
  banner: "/assets/pixelpass-banner.jpg",
  description:
    "Unlock unlimited access to all games on PixelPass! Enjoy exclusive discounts, early access, and more.",
};

const Profile = () => {
  const { currentUser } = useCart();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const pass = localStorage.getItem(`pixelpass_sub_${currentUser.username}`);
      setIsSubscribed(pass === "true");
    }
  }, [currentUser]);

  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordSave = async () => {
    if (!newPassword) {
      alert("Password cannot be empty.");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password updated successfully!");
        setEditingPassword(false);
        setNewPassword("");
      } else {
        alert(data.message || "Failed to update password.");
      }
    } catch (err) {
      alert("Server error.");
    }
    setPasswordLoading(false);
  };

  const handleSubscribe = () => {
    navigate("/checkout", { state: { buyPass: true } });
  };

  if (!currentUser) {
    return (
      <div style={{ padding: 40, color: "#fff", textAlign: "center" }}>
        <Navbar />
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Profile</h2>
          <div className="profile-info-row">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{currentUser.username}</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Password:</span>
            {editingPassword ? (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="profile-password-input"
                  placeholder="New password"
                  style={{ marginRight: 8 }}
                />
                <span
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'relative',
                    marginRight: 8,
                    cursor: 'pointer',
                    color: '#bfa6e0',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    userSelect: 'none',
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                  role="button"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bfa6e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.13"/>
                      <path d="M1 1l22 22"/>
                      <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/>
                      <path d="M14.47 14.47A3.5 3.5 0 0 0 12 8.5c-.63 0-1.22.18-1.72.49"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bfa6e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="12" rx="9" ry="7"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </span>
                <button className="profile-btn" onClick={handlePasswordSave} disabled={passwordLoading}>
                  {passwordLoading ? "Saving..." : "Save"}
                </button>
                <button className="profile-btn" onClick={() => setEditingPassword(false)} disabled={passwordLoading}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="profile-value" style={{ letterSpacing: 2 }}>
                  ••••••••
                </span>
                <button
                  className="profile-btn"
                  style={{ marginLeft: 12 }}
                  onClick={() => setEditingPassword(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Subscription:</span>
            {isSubscribed ? (
              <span className="pass-status subscribed" style={{ fontSize: "1.1rem" }}>
                Subscribed 🎉
              </span>
            ) : (
              <span className="pass-status notsub" style={{ fontSize: "1.1rem" }}>
                Not Subscribed
              </span>
            )}
          </div>
        </div>

        <div className="profile-pass-section">
          <h2 className="profile-title">PixelPass Subscription</h2>
          <div
            className="pass-card big-pass-card"
            style={{
              backgroundImage: `url(${PASS_PRODUCT.banner})`,
              minHeight: 340,
              padding: "60px 40px",
              marginTop: 24,
            }}
          >
            <div className="overlay" />
            <div className="pass-details">
              <h1 style={{ color: "#e0c3fc", fontSize: "2.5rem", marginBottom: 18 }}>
                {PASS_PRODUCT.title}
              </h1>
              <p style={{ color: "#e0d2ff", margin: "18px 0", fontSize: "1.25rem", maxWidth: 600 }}>
                {PASS_PRODUCT.description}
              </p>
              {!isSubscribed && (
                <button className="profile-btn subscribe-btn" style={{ fontSize: "1.3rem", padding: "14px 38px" }} onClick={handleSubscribe}>
                  Subscribe for {PASS_PRODUCT.price}
                </button>
              )}
              {isSubscribed && (
                <button
                  className="profile-btn"
                  style={{ background: "#444", cursor: "not-allowed", marginTop: 12, fontSize: "1.15rem", padding: "12px 32px" }}
                  disabled
                >
                  Already Subscribed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;