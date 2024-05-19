// components/FlowCanvas.js
import React from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";

const FlowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onLoad,
  onNodeClick,
  nodeTypes,
}) => {
  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onLoad={onLoad}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        deleteKeyCode={46} /* 'delete'-key */
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
