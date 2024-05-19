import React from "react";
import "../styles/SettingPanel.css"; // Import the CSS file

const SettingsPanel = ({ node, updateNode }) => {
  const handleChange = (e) => {
    updateNode(node.id, { label: e.target.value });
  };

  if (!node || !node.data) {
    return <div className="no-node-selected">No node selected</div>;
  }

  return (
    <>
      <h4>Text</h4>
      <textarea
        label="text"
        type="text"
        value={node.data.label}
        onChange={handleChange}
        className="message-box-input"
        placeholder="Text Area"
      ></textarea>
      <hr />
    </>
  );
};

export default SettingsPanel;
