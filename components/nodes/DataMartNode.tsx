/**
 * Data Mart Node Component
 * 
 * Represents Gold layer data marts with facts and dimensions
 */

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { DataMartNodeData } from '@/types/pipeline';

const DataMartNode: React.FC<NodeProps<DataMartNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`
        min-w-[300px] bg-slate-800 rounded-xl border-2 
        transition-all duration-300 shadow-lg
        ${selected ? 'border-red-500 shadow-red-500/50' : 'border-slate-700'}
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-red-500 border-2 border-slate-800"
      />
      
      <div className="px-4 py-3 bg-red-500/10 border-b border-slate-700 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🏪</div>
          <div className="flex-1">
            <div className="font-semibold text-slate-100">{data.label}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              Data Mart ({data.layer})
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-900/50 p-2 rounded">
            <div className="text-lg font-bold text-red-400">{data.facts.length}</div>
            <div className="text-xs text-slate-400">Fact Tables</div>
          </div>
          <div className="bg-slate-900/50 p-2 rounded">
            <div className="text-lg font-bold text-blue-400">{data.dimensions.length}</div>
            <div className="text-xs text-slate-400">Dimensions</div>
          </div>
        </div>
        
        {data.aggregates.length > 0 && (
          <div className="text-xs">
            <span className="text-slate-400">Aggregates:</span>
            <span className="ml-2 text-slate-300 font-medium">
              {data.aggregates.length} tables
            </span>
          </div>
        )}
        
        {data.continuousQuery && (
          <div className="px-2 py-1.5 bg-green-500/20 border border-green-500/40 rounded text-xs text-green-400 font-medium">
            ⚡ Real-Time (Continuous Query)
          </div>
        )}
      </div>
      
      <div className="px-4 pb-3">
        <div className="inline-block px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-400 font-semibold">
          GOLD
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-red-500 border-2 border-slate-800"
      />
    </div>
  );
};

export default DataMartNode;
