// src/components/DraggableItem.js
import React from "react";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const DraggableItem = ({ type, label }) => {
  const [, drag] = useDrag({
    type: "node",
    item: { type, label },
  });

  return (
    <div ref={drag} className="draggable-item">
      <FontAwesomeIcon icon={faComment} />
      {label}
    </div>
  );
};

export default DraggableItem;
