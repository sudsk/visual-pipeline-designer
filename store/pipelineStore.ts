/**
 * Pipeline Store - Zustand State Management
 * 
 * Manages the state of the pipeline including:
 * - Nodes (pipeline components)
 * - Edges (connections between nodes)
 * - Selected node
 * - CRUD operations
 */

import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

export interface PipelineState {
  // State
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  
  // Node operations
  addNode: (node: Node) => void;
  updateNode: (id: string, data: any) => void;
  deleteNode: (id: string) => void;
  setNodes: (nodes: Node[]) => void;
  
  // Edge operations
  addEdge: (edge: Edge) => void;
  updateEdge: (id: string, data: any) => void;
  deleteEdge: (id: string) => void;
  setEdges: (edges: Edge[]) => void;
  
  // Selection
  selectNode: (node: Node | null) => void;
  
  // Bulk operations
  clear: () => void;
  loadPipeline: (nodes: Node[], edges: Edge[]) => void;
  
  // Export
  exportPipeline: () => { nodes: Node[]; edges: Edge[] };
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  // Initial state
  nodes: [],
  edges: [],
  selectedNode: null,
  
  // Node operations
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },
  
  updateNode: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
      selectedNode:
        state.selectedNode?.id === id
          ? { ...state.selectedNode, data: { ...state.selectedNode.data, ...data } }
          : state.selectedNode,
    }));
  },
  
  deleteNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNode: state.selectedNode?.id === id ? null : state.selectedNode,
    }));
  },
  
  setNodes: (nodes) => {
    set({ nodes });
  },
  
  // Edge operations
  addEdge: (edge) => {
    set((state) => ({
      edges: [...state.edges, edge],
    }));
  },
  
  updateEdge: (id, data) => {
    set((state) => ({
      edges: state.edges.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    }));
  },
  
  deleteEdge: (id) => {
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
    }));
  },
  
  setEdges: (edges) => {
    set({ edges });
  },
  
  // Selection
  selectNode: (node) => {
    set({ selectedNode: node });
  },
  
  // Bulk operations
  clear: () => {
    set({
      nodes: [],
      edges: [],
      selectedNode: null,
    });
  },
  
  loadPipeline: (nodes, edges) => {
    set({
      nodes,
      edges,
      selectedNode: null,
    });
  },
  
  // Export
  exportPipeline: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },
}));
