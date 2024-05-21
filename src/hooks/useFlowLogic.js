import { useCallback, useState } from "react";
import { addEdge } from "react-flow-renderer";

// Custom hook to manage flow logic
const useFlowLogics = (setSaveStatus) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Callback to handle connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Callback to handle changes to the text of the selected node
  const handleTextChange = useCallback(
    (newText) => {
      // Update the label of the selected node in the nodes state
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: newText } }
            : node
        )
      );

      // Update the selectedNode state with the new label
      setSelectedNode((prev) => ({
        ...prev,
        data: { ...prev.data, label: newText },
      }));
    },
    [selectedNode, setNodes, setSelectedNode]
  );

  // Callback to handle saving the flow
  const onSave = useCallback(() => {
    // Find nodes that do not have any incoming edges
    const emptyTargetHandleNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    // Check if there are more than one node without incoming edges
    if (nodes.length > 1 && emptyTargetHandleNodes.length > 1) {
      // If so, set an error status
      setSaveStatus({
        message: "Error: More than one node with empty target handles!",
        type: "error",
      });
    } else {
      // Otherwise, set a success status and log the nodes and edges
      setSaveStatus({ message: "Flow saved successfully!", type: "success" });
      console.log("Flow Nodes:", nodes);
      console.log("Flow Edges:", edges);
    }
  }, [nodes, edges, setSaveStatus]);

  // Return the state and callbacks to be used by components
  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNode,
    setSelectedNode,
    onConnect,
    handleTextChange,
    onSave,
  };
};

export default useFlowLogics;
