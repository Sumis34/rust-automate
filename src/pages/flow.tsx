import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";

import "reactflow/dist/base.css";

import CustomNode from "~/Components/CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: { name: "Tyler Weary", job: "Designer", emoji: "🤓" },

    position: { x: -200, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: { name: "Kristi Price", job: "Developer", emoji: "🤩" },
    position: { x: 200, y: 200 },
  },
];

const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="flex h-screen bg-neutral-950 px-12 py-10">
      <div className="basis-1/5  text-neutral-100">
        <h1 className="text-2xl font-bold">RustFlow</h1>
        <label htmlFor="cred">Credentials</label>
        <textarea
          name="cred"
          id="cred"
          cols={30}
          rows={10}
          className="rounded-lg border-2 border-neutral-700 bg-neutral-950"
        ></textarea>
      </div>
      <div className="h-full w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="rounded-lg border-2 border-neutral-700"
        >
          <MiniMap />
          <Background color="#333" variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
