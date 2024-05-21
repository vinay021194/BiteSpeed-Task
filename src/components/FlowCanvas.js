import React, { useCallback, useMemo } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { useDrop } from "react-dnd";
import TextNode from "./TextNode";

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

const FlowCanvas = ({
  nodes, // Array of nodes
  setNodes, // Function to update nodes
  edges, // Array of edges
  setEdges, // Function to update edges
  selectedNode, // Currently selected node
  setSelectedNode, // Function to update the selected node
  onConnect, // Function to handle connecting nodes
}) => {
  // Handle node drag stop event
  const onNodeDragStop = useCallback(
    (event, node) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, position: node.position } : n
        )
      );
    },
    [setNodes]
  );

  // Handle node click event
  const onNodeClick = useCallback(
    (_, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // Setup React DnD drop area
  const [, drop] = useDrop({
    accept: "node",
    drop: (item, monitor) => {
      // Get the drop position relative to the canvas
      const offset = monitor.getSourceClientOffset();
      const canvasBounds = document
        .querySelector(".flow-canvas")
        .getBoundingClientRect();

      const position = {
        x: offset.x - canvasBounds.x,
        y: offset.y - canvasBounds.y,
      };

      // Add the new node to the nodes array
      setNodes((nds) =>
        nds.concat({
          id: `node_${nds.length + 1}`,
          type: "textNode",
          position,
          data: { label: `Text message ${nds.length + 1}` },
        })
      );
    },
  });

  // Memoize nodes and edges to avoid unnecessary re-renders
  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  return (
    <div ref={drop} className="flow-canvas">
      <ReactFlow
        nodes={memoizedNodes}
        edges={memoizedEdges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        fitView
        style={{ width: "100%", height: "100%" }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
