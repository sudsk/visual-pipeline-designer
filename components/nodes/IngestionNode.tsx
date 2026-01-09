/**
 * Ingestion Node Component
 * 
 * Represents ingestion processing with engine selection
 */

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { IngestionNodeData } from '@/types/pipeline';

const IngestionNode: React.FC<NodeProps<IngestionNodeData>> = ({ data, selected }) => {
  const getEngineConfig = () => {
    const configs = {
      dataflow: {
        icon: '⚙️',
        color: '#3b82f6',
        label: 'Dataflow',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-400',
      },
      spark: {
        icon: '⚡',
        color: '#f59e0b',
        label: 'Serverless Spark',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500',
        textColor: 'text-orange-400',
      },
      bigquery: {
        icon: '📊',
        color: '#8b5cf6',
        label: 'BigQuery SQL',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500',
        textColor: 'text-purple-400',
      },
      custom: {
        icon: '🔧',
        color: '#6366f1',
        label: 'Custom',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500',
        textColor: 'text-indigo-400',
      },
    };
    return configs[data.engine] || configs.custom;
  };
  
  const engineConfig = getEngineConfig();
  
  return (
    <div
      className={`
        min-w-[300px] bg-slate-800 rounded-xl border-2 
        transition-all duration-300 shadow-lg
        ${selected ? `${engineConfig.borderColor} shadow-${engineConfig.textColor}/50` : 'border-slate-700'}
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-slate-800"
        style={{ backgroundColor: engineConfig.color }}
      />
      
      {/* Header */}
      <div className={`px-4 py-3 ${engineConfig.bgColor} border-b border-slate-700 rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{engineConfig.icon}</div>
          <div className="flex-1">
            <div className="font-semibold text-slate-100">{data.label}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              {engineConfig.label} ({data.layer})
            </div>
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Engine Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Processing Engine:</span>
          <div className={`px-2 py-1 ${engineConfig.bgColor} border ${engineConfig.borderColor} rounded text-xs ${engineConfig.textColor} font-semibold`}>
            {engineConfig.icon} {engineConfig.label}
          </div>
        </div>
        
        {/* Transformations */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Transformations:</span>
            <span className="text-sm font-bold text-slate-300">
              {data.transformations.length}
            </span>
          </div>
          
          {data.transformations.length > 0 && (
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {data.transformations.slice(0, 3).map((transform, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-slate-900/60 rounded text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 ${engineConfig.bgColor} ${engineConfig.borderColor} border rounded text-[10px] ${engineConfig.textColor} font-medium`}>
                      {transform.type}
                    </span>
                    <span className="text-slate-300">{transform.name}</span>
                  </div>
                </div>
              ))}
              {data.transformations.length > 3 && (
                <div className="text-center text-xs text-slate-500 py-1">
                  +{data.transformations.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Resources */}
        {data.resources && (
          <div className="pt-2 border-t border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Resources:</div>
            <div className="grid grid-cols-2 gap-2">
              {data.resources.workers && (
                <div className="text-xs">
                  <span className="text-slate-500">Workers:</span>
                  <span className="ml-1 text-slate-300 font-medium">
                    {data.resources.workers}
                  </span>
                </div>
              )}
              {data.resources.memory && (
                <div className="text-xs">
                  <span className="text-slate-500">Memory:</span>
                  <span className="ml-1 text-slate-300 font-medium">
                    {data.resources.memory}
                  </span>
                </div>
              )}
              {data.resources.cpu && (
                <div className="text-xs">
                  <span className="text-slate-500">CPU:</span>
                  <span className="ml-1 text-slate-300 font-medium">
                    {data.resources.cpu} cores
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {data.parallelism && (
          <div className="text-xs">
            <span className="text-slate-400">Parallelism:</span>
            <span className="ml-2 text-slate-300 font-medium">
              {data.parallelism}x
            </span>
          </div>
        )}
      </div>
      
      {/* Layer Badge */}
      <div className="px-4 pb-3">
        <div className="inline-block px-2 py-1 bg-orange-500/20 border border-orange-500/40 rounded text-xs text-orange-400 font-semibold">
          BRONZE
        </div>
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-slate-800"
        style={{ backgroundColor: engineConfig.color }}
      />
    </div>
  );
};

export default IngestionNode;
