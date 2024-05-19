import React from "react";
import "../styles/Navbar.css"; // Ensure you create this CSS file

const Navbar = ({ onSave, saveStatus }) => {
  return (
    <nav className="navbar">
      <button className="save-button" onClick={onSave}>
        Save Changes
      </button>
      <div className="save-status-container">
        {saveStatus.message && (
          <div
            className={`save-status ${
              saveStatus.type === "error" ? "error" : "success"
            }`}
          >
            {saveStatus.message}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
