// src/App.js
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd"; // React DnD provider for drag-and-drop functionality
import { HTML5Backend } from "react-dnd-html5-backend"; // Backend for HTML5 drag-and-drop
import { ReactFlowProvider } from "react-flow-renderer"; // Provider for React Flow
import Sidebar from "./components/Sidebar"; // Sidebar component
import FlowCanvas from "./components/FlowCanvas"; // FlowCanvas component
import useFlowLogics from "./hooks/useFlowLogic"; // Custom hook for managing flow logic
import "./App.css"; // Application styles
import Navbar from "./components/Navbar"; // Navbar component

const App = () => {
  // State to manage the save status message and type
  const [saveStatus, setSaveStatus] = useState({ message: "", type: "" });

  // Destructure the values returned from the useFlowLogics hook
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNode,
    setSelectedNode,
    onConnect,
    handleTextChange,
    onSave,
  } = useFlowLogics(setSaveStatus);

  // Effect to handle the save status message display timeout
  useEffect(() => {
    if (saveStatus.message) {
      const timer = setTimeout(() => {
        setSaveStatus({ message: "", type: "" });
      }, 5000); // Clear the message after 5 seconds

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [saveStatus]);

  return (
    <>
      {/* Navbar component with onSave and saveStatus props */}
      <Navbar onSave={onSave} saveStatus={saveStatus} />

      {/* DndProvider for drag-and-drop context */}
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          {/* ReactFlowProvider for React Flow context */}
          <ReactFlowProvider>
            {/* FlowCanvas component with necessary props */}
            <FlowCanvas
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              onConnect={onConnect}
            />
          </ReactFlowProvider>

          {/* Sidebar component with necessary props */}
          <Sidebar
            showSettings={!!selectedNode} // Show settings if a node is selected
            selectedNode={selectedNode}
            onTextChange={handleTextChange}
            saveStatus={saveStatus}
          />
        </div>
      </DndProvider>
    </>
  );
};

export default App;
