/**
 * PipelineDesigner - Main Visual Canvas Component
 * 
 * This is the core component that renders the visual pipeline designer.
 * It includes:
 * - ReactFlow canvas for drag-and-drop
 * - Node palette
 * - Toolbar
 * - Integration with Zustand store
 */

'use client';

import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { usePipelineStore } from '@/store/pipelineStore';
import { useEnvironmentStore } from '@/store/environmentStore';
import NodePalette from './NodePalette';
import Toolbar from './Toolbar';
import PropertiesPanel from './PropertiesPanel';
import AIAssistantPanel from './panels/AIAssistantPanel';

// Import custom node types
import SourceNode from './nodes/SourceNode';
import LandingNode from './nodes/LandingNode';
import ValidationNode from './nodes/ValidationNode';
import IngestionNode from './nodes/IngestionNode';
import DataVaultNode from './nodes/DataVaultNode';
import BusinessVaultNode from './nodes/BusinessVaultNode';
import DataMartNode from './nodes/DataMartNode';
import CustomLayerNode from './nodes/CustomLayerNode';

// Register custom node types
const nodeTypes = {
  source: SourceNode,
  landing: LandingNode,
  validation: ValidationNode,
  ingestion: IngestionNode,
  dataVault: DataVaultNode,
  businessVault: BusinessVaultNode,
  dataMart: DataMartNode,
  customLayer: CustomLayerNode,
};

const PipelineDesignerInner: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  // Zustand stores
  const {
    nodes: storeNodes,
    edges: storeEdges,
    selectedNode,
    addNode,
    addEdge: storeAddEdge,
    selectNode,
  } = usePipelineStore();
  
  const { environment, isReadOnly } = useEnvironmentStore();
  
  // ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);
  
  // Sync ReactFlow state with Zustand store
  React.useEffect(() => {
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);
  
  React.useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);
  
  // Handle connection
  const onConnect = useCallback(
    (params: Connection) => {
      if (isReadOnly) return;
      
      const edge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: true,
      } as Edge;
      
      setEdges((eds) => addEdge(edge, eds));
      storeAddEdge(edge);
    },
    [isReadOnly, setEdges, storeAddEdge]
  );
  
  // Handle node drag
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  // Handle node drop
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      if (isReadOnly) return;
      
      const type = event.dataTransfer.getData('application/reactflow');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      if (reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        
        const newNode: Node = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: {
            label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
            ...getDefaultNodeData(type),
          },
        };
        
        addNode(newNode);
      }
    },
    [reactFlowInstance, isReadOnly, addNode]
  );
  
  // Handle node click
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      selectNode(node);
    },
    [selectNode]
  );
  
  // Handle pane click (deselect)
  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);
  
  return (
    <div className="h-screen w-full flex flex-col bg-slate-950">
      {/* Toolbar */}
      <Toolbar />
      
      <div className="flex-1 flex relative">
        {/* Node Palette */}
        {!isReadOnly && <NodePalette />}
        
        {/* Main Canvas */}
        <div 
          ref={reactFlowWrapper} 
          className="flex-1 relative"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            nodesDraggable={!isReadOnly}
            nodesConnectable={!isReadOnly}
            elementsSelectable={true}
            className="bg-slate-950"
          >
            <Background 
              color="#4f46e5" 
              gap={16} 
              size={1}
              className="opacity-20"
            />
            <Controls className="bg-slate-800 border-slate-700" />
            <MiniMap 
              className="bg-slate-800 border-slate-700"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'source':
                    return '#3b82f6';
                  case 'landing':
                  case 'validation':
                  case 'ingestion':
                    return '#f59e0b';
                  case 'dataVault':
                  case 'businessVault':
                    return '#8b5cf6';
                  case 'dataMart':
                    return '#ef4444';
                  default:
                    return '#6366f1';
                }
              }}
            />
            
            {/* Environment Badge */}
            <Panel position="top-right" className="bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
              <div className="flex items-center gap-2">
                <div className={`
                  px-3 py-1 rounded text-xs font-semibold uppercase
                  ${environment === 'dev' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : ''}
                  ${environment === 'uat' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' : ''}
                  ${environment === 'prod' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : ''}
                `}>
                  {environment}
                </div>
                {isReadOnly && (
                  <div className="text-xs text-slate-400">
                    🔒 Read-only
                  </div>
                )}
              </div>
            </Panel>
          </ReactFlow>
        </div>
        
        {/* Properties Panel */}
        {selectedNode && <PropertiesPanel />}
        
        {/* AI Assistant Panel */}
        {!isReadOnly && <AIAssistantPanel />}
      </div>
    </div>
  );
};

// Wrapper with ReactFlowProvider
const PipelineDesigner: React.FC = () => {
  return (
    <ReactFlowProvider>
      <PipelineDesignerInner />
    </ReactFlowProvider>
  );
};

// Helper function to get default node data
function getDefaultNodeData(type: string) {
  const defaults: Record<string, any> = {
    source: {
      sourceType: 'pubsub',
      topic: '',
      subscriptionId: '',
    },
    landing: {
      storageType: 'biglake',
      location: '',
      format: 'parquet',
      retentionDays: 90,
      layer: 'bronze',
    },
    validation: {
      dqRules: [],
      quarantineTable: '',
      failureAction: 'quarantine',
      layer: 'bronze',
    },
    ingestion: {
      engine: 'bigquery',
      transformations: [],
      layer: 'bronze',
    },
    dataVault: {
      hubs: [],
      links: [],
      satellites: [],
      autoGenerated: false,
      layer: 'silver',
    },
    businessVault: {
      pitTables: [],
      bridgeTables: [],
      businessRules: [],
      autoGenerated: false,
      layer: 'silver',
    },
    dataMart: {
      facts: [],
      dimensions: [],
      aggregates: [],
      layer: 'gold',
    },
    customLayer: {
      layerName: 'Custom Layer',
      parentLayer: 'bronze',
      description: '',
      customProperties: {},
    },
  };
  
  return defaults[type] || {};
}

export default PipelineDesigner;
