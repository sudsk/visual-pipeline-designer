/**
 * Node Palette Component
 * 
 * Left sidebar with draggable nodes organized by category
 */

'use client';

import React, { useState } from 'react';

interface PaletteNode {
  type: string;
  label: string;
  icon: string;
  description: string;
}

const nodeCategories = {
  sources: [
    { type: 'source', label: 'Pub/Sub', icon: '📨', description: 'Streaming data' },
    { type: 'source', label: 'Cloud Storage', icon: '📁', description: 'File-based' },
    { type: 'source', label: 'Database CDC', icon: '🗄️', description: 'Change capture' },
  ],
  bronze: [
    { type: 'landing', label: 'Landing', icon: '📥', description: 'Raw ingestion' },
    { type: 'validation', label: 'Validation', icon: '✓', description: 'DQ checks' },
    { type: 'ingestion', label: 'Ingestion', icon: '⚙️', description: 'Processing' },
  ],
  silver: [
    { type: 'dataVault', label: 'Data Vault', icon: '🏗️', description: 'H/L/S structure' },
    { type: 'businessVault', label: 'Business Vault', icon: '💼', description: 'PIT/Bridge' },
  ],
  gold: [
    { type: 'dataMart', label: 'Data Mart', icon: '🏪', description: 'Domain models' },
  ],
  custom: [
    { type: 'customLayer', label: 'Custom Layer', icon: '📦', description: 'Your design' },
  ],
};

const NodePalette: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  const filteredCategories = Object.entries(nodeCategories).reduce((acc, [category, nodes]) => {
    const filtered = nodes.filter(node =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, PaletteNode[]>);
  
  return (
    <div className="w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-700 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
          Node Palette
        </h3>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-4"
        />
        
        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(filteredCategories).map(([category, nodes]) => (
            <div key={category}>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {category === 'sources' && '🔌 Sources'}
                {category === 'bronze' && '🥉 Bronze Layers'}
                {category === 'silver' && '🥈 Silver Layers'}
                {category === 'gold' && '🥇 Gold Layers'}
                {category === 'custom' && '🎨 Custom'}
              </div>
              
              <div className="space-y-2">
                {nodes.map((node, idx) => (
                  <div
                    key={`${node.type}-${idx}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type)}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500 rounded-lg cursor-grab active:cursor-grabbing transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{node.icon}</span>
                      <span className="text-sm font-medium text-slate-200">
                        {node.label}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {node.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Templates Section */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            📚 Templates
          </div>
          <div className="space-y-2">
            <button className="w-full p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors">
              <div className="text-sm font-medium text-slate-200">🎯 Simple 3-Layer</div>
              <div className="text-xs text-slate-400">Quick start</div>
            </button>
            <button className="w-full p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left transition-colors">
              <div className="text-sm font-medium text-slate-200">🏢 Enterprise</div>
              <div className="text-xs text-slate-400">11-layer</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePalette;
