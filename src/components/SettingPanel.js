// src/components/SettingsPanel.js
import React from "react";
import "../styles/SettingPanel.css"; // Import the CSS file

const SettingsPanel = ({ selectedNode, onTextChange }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onTextChange(newValue);
  };

  return (
    <>
      {/* <hr /> */}
      <h4>Text</h4>
      <textarea
        label="text"
        type="text"
        value={selectedNode ? selectedNode.data.label : ""}
        onChange={handleChange}
        className="message-box-input"
        placeholder="Text Area"
      ></textarea>
      <hr />
    </>
  );
};

export default SettingsPanel;
