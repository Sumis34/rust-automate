import React, { useCallback, useEffect, useState } from "react";
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
import RustPlus from "@liamcottle/rustplus.js";

import CustomNode from "~/Components/CustomNode";
import { api } from "~/utils/api";

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
  const rustPlusMutation = api.rustPlus.hello.useMutation();
  const [credentials, setCredentials] = useState<Record<string, any>>({
    ip: "",
    port: "",
    playerId: "",
    playerToken: "",
  });

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const save = () => {
    if (
      !(
        credentials.ip &&
        credentials.port &&
        credentials.playerId &&
        credentials.playerToken
      )
    )
      return;

    rustPlusMutation.mutate({
      ip: credentials.ip,
      port: credentials.port,
      playerId: credentials.playerId,
      playerToken: credentials.playerToken,
    });

    console.log(credentials);

    localStorage.setItem("credentials", JSON.stringify(credentials));
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("credentials") || "");
    if (saved) setCredentials(saved);
  }, []);

  return (
    <div className="flex h-screen gap-5 bg-neutral-950 px-12 py-10">
      <div className="basis-1/5  text-neutral-100">
        <h1 className="text-2xl font-bold">RustFlow</h1>
        {Object.keys(credentials).map((k) => (
          <div className="mb-2 flex flex-col" key={k}>
            <label htmlFor={k}>{k}</label>
            <input
              name={k}
              id={k}
              type="text"
              value={credentials[k]}
              onChange={(e) =>
                setCredentials((current) => {
                  const newCred = { ...current };
                  newCred[k] = e.target.value;
                  return newCred;
                })
              }
              className="rounded-lg border-2 border-neutral-700 bg-neutral-950"
            />
          </div>
        ))}
        <button className="" type="button" onClick={() => save()}>
          Set Credentials
        </button>
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
