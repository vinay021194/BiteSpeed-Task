import { useState, useCallback } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";

// Custom hook to manage the logic for a React Flow diagram
const useFlowLogic = (initialNodes, initialEdges, setSaveStatus) => {
  // State for nodes, edges, selected node, and the React Flow instance
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handler for node changes
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Handler for edge changes
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Handler for connecting nodes
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Handler when the React Flow instance is loaded
  const onLoad = useCallback((rfi) => {
    setReactFlowInstance(rfi);
    rfi.fitView(); // Fit the view to the nodes
  }, []);

  // Handler for node click event
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Function to add a new node to the diagram
  const addNode = () => {
    const id = `node_${nodes.length + 1}`;
    const newNode = {
      id,
      type: "textNode",
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Function to update a node's data
  const updateNode = (id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
    // Keep the selected node updated after the update
    setSelectedNode((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
    );
  };

  // Function to save the current flow
  const onSave = () => {
    const emptyTargetHandleNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    if (nodes.length > 1 && emptyTargetHandleNodes.length > 1) {
      setSaveStatus({
        message: "Error: More than one node with empty target handles!",
        type: "error",
      });
    } else {
      setSaveStatus({ message: "Flow saved successfully!", type: "success" });
      console.log("Flow Nodes:", nodes);
      console.log("Flow Edges:", edges);
    }
  };

  // Return the state and handlers for use in the component
  return {
    nodes,
    edges,
    selectedNode,
    reactFlowInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onLoad,
    onNodeClick,
    addNode,
    updateNode,
    onSave,
  };
};

export default useFlowLogic;
