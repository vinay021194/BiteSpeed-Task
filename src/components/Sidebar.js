// components/Sidebar.js
import React from "react";
import SettingsPanel from "./SettingPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = ({ addNode, selectedNode, updateNode }) => {
  return (
    <aside>
      <button className="sidebar-button" onClick={addNode}>
        <FontAwesomeIcon icon={faComment} /> Message
      </button>
      <hr className="divider" />
      {selectedNode && (
        <div>
          <SettingsPanel node={selectedNode} updateNode={updateNode} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
