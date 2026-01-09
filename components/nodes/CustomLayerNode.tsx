/**
 * Custom Layer Node Component
 * 
 * Represents a flexible, customer-defined layer node
 */

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CustomLayerNodeData } from '@/types/pipeline';

const CustomLayerNode: React.FC<NodeProps<CustomLayerNodeData>> = ({ data, selected }) => {
  const getCategoryColor = () => {
    const colors = {
      bronze: {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500',
        text: 'text-orange-400',
        badge: 'bg-orange-500/20 border-orange-500/40',
      },
      silver: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500',
        text: 'text-purple-400',
        badge: 'bg-purple-500/20 border-purple-500/40',
      },
      gold: {
        bg: 'bg-red-500/10',
        border: 'border-red-500',
        text: 'text-red-400',
        badge: 'bg-red-500/20 border-red-500/40',
      },
      custom: {
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500',
        text: 'text-indigo-400',
        badge: 'bg-indigo-500/20 border-indigo-500/40',
      },
    };
    return colors[data.parentLayer] || colors.custom;
  };
  
  const colors = getCategoryColor();
  
  return (
    <div
      className={`
        min-w-[280px] bg-slate-800 rounded-xl border-2 
        transition-all duration-300 shadow-lg
        ${selected ? `${colors.border} shadow-lg` : 'border-slate-700'}
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={`w-3 h-3 border-2 border-slate-800`}
        style={{ backgroundColor: colors.text.replace('text-', '') }}
      />
      
      <div className={`px-4 py-3 ${colors.bg} border-b border-slate-700 rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{data.icon || '📦'}</div>
          <div className="flex-1">
            <div className="font-semibold text-slate-100">{data.label}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              {data.layerName} ({data.parentLayer})
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        {data.description && (
          <div className="text-xs text-slate-300 italic">
            {data.description}
          </div>
        )}
        
        {data.storageType && (
          <div className="text-xs">
            <span className="text-slate-400">Storage:</span>
            <span className={`ml-2 ${colors.text} font-medium`}>
              {data.storageType}
            </span>
          </div>
        )}
        
        {data.format && (
          <div className="text-xs">
            <span className="text-slate-400">Format:</span>
            <code className={`ml-2 ${colors.text} bg-slate-900 px-2 py-1 rounded`}>
              {data.format}
            </code>
          </div>
        )}
        
        {data.processing && (
          <div className="text-xs">
            <span className="text-slate-400">Processing:</span>
            <span className="ml-2 text-slate-300">
              {data.processing}
            </span>
          </div>
        )}
        
        {Object.keys(data.customProperties || {}).length > 0 && (
          <div className="pt-2 border-t border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Custom Properties:</div>
            <div className="space-y-1">
              {Object.entries(data.customProperties).slice(0, 3).map(([key, value]) => (
                <div key={key} className="text-xs text-slate-300">
                  <span className="text-slate-500">{key}:</span> {String(value)}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className={`mt-2 px-2 py-1 ${colors.badge} border rounded text-xs ${colors.text}`}>
          💡 Customer-configured layer
        </div>
      </div>
      
      <div className="px-4 pb-3">
        <div className={`inline-block px-2 py-1 ${colors.badge} border rounded text-xs ${colors.text} font-semibold uppercase`}>
          {data.parentLayer}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className={`w-3 h-3 border-2 border-slate-800`}
        style={{ backgroundColor: colors.text.replace('text-', '') }}
      />
    </div>
  );
};

export default CustomLayerNode;
