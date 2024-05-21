// src/components/Sidebar.js
import React from "react";
import SettingsPanel from "./SettingPanel";
import DraggableItem from "./DragableItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ showSettings, selectedNode, onTextChange }) => (
  <div className="sidebar">
    <div className="nodes-panel">
      <DraggableItem label="Message" />
    </div>
    <hr />
    {showSettings && (
      <SettingsPanel
        selectedNode={selectedNode}
        onTextChange={onTextChange}
        // onSave={onSave}
      />
    )}
  </div>
);

export default Sidebar;
