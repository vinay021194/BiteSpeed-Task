import React, { useState, useEffect } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import useFlowLogic from "./hooks/useFlowLogic";
import Sidebar from "./components/Sidebar";
import FlowCanvas from "./components/FlowCanvas";
import Navbar from "./components/Navbar";
import TextNode from "./components/TextNode";
import "./App.css";

// Initial nodes and edges arrays
const initialNodes = [];
const initialEdges = [];

// Custom node types
const nodeTypes = {
  textNode: TextNode,
};

const App = () => {
  // State to handle save status messages
  const [saveStatus, setSaveStatus] = useState({ message: "", type: "" });

  // Use custom hook for flow logic
  const {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onLoad,
    onNodeClick,
    addNode,
    updateNode,
    onSave,
  } = useFlowLogic(initialNodes, initialEdges, setSaveStatus);

  // Effect to clear save status messages after 5 seconds
  useEffect(() => {
    if (saveStatus.message) {
      const timer = setTimeout(() => {
        setSaveStatus({ message: "", type: "" });
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  return (
    <>
      {/* Navbar component with save functionality and status */}
      <Navbar onSave={onSave} saveStatus={saveStatus} />
      <div className="dndflow">
        <ReactFlowProvider>
          {/* FlowCanvas component for rendering the flow diagram */}
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onLoad={onLoad}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
          />
          <div className="side-panel">
            {/* Sidebar component for node addition and settings */}
            <Sidebar
              addNode={addNode}
              selectedNode={selectedNode}
              updateNode={updateNode}
            />
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default App;
