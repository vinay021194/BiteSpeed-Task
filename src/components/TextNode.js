import React from "react";
import { Handle } from "react-flow-renderer";
import "../styles/textNode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
const TextNode = ({ id, data }) => {
  return (
    <div className="text-node">
      <div className="node-header">
        <h5>
          Send Message <FontAwesomeIcon icon={faWhatsapp} size="sm" />
        </h5>
        <hr className="node-divider" />
      </div>
      <div className="node-content">{data.label}</div>
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ top: "50%", borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: "50%", borderRadius: 0 }}
      />
    </div>
  );
};

export default TextNode;
