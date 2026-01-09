/**
 * Landing Node Component
 * 
 * Represents landing layer in Bronze zone where raw data arrives
 */

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LandingNodeData } from '@/types/pipeline';

const LandingNode: React.FC<NodeProps<LandingNodeData>> = ({ data, selected }) => {
  const getStorageIcon = () => {
    switch (data.storageType) {
      case 'bigquery':
        return '📊';
      case 'biglake':
        return '🏔️';
      case 'gcs':
        return '📁';
      default:
        return '💾';
    }
  };
  
  return (
    <div
      className={`
        min-w-[280px] bg-slate-800 rounded-xl border-2 
        transition-all duration-300 shadow-lg
        ${selected ? 'border-orange-500 shadow-orange-500/50' : 'border-slate-700'}
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-orange-500 border-2 border-slate-800"
      />
      
      {/* Header */}
      <div className="px-4 py-3 bg-orange-500/10 border-b border-slate-700 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📥</div>
          <div className="flex-1">
            <div className="font-semibold text-slate-100">{data.label}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              Landing Layer ({data.layer})
            </div>
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 space-y-2">
        <div className="text-xs">
          <span className="text-slate-400">Storage:</span>
          <span className="ml-2 text-orange-400 font-medium">
            {getStorageIcon()} {data.storageType.toUpperCase()}
          </span>
        </div>
        
        <div className="text-xs">
          <span className="text-slate-400">Format:</span>
          <code className="ml-2 text-orange-400 bg-slate-900 px-2 py-1 rounded">
            {data.format}
          </code>
        </div>
        
        {data.location && (
          <div className="text-xs">
            <span className="text-slate-400">Location:</span>
            <code className="ml-2 text-slate-300 bg-slate-900 px-2 py-1 rounded text-[10px]">
              {data.location.length > 30 ? data.location.substring(0, 30) + '...' : data.location}
            </code>
          </div>
        )}
        
        <div className="text-xs">
          <span className="text-slate-400">Retention:</span>
          <span className="ml-2 text-slate-300">
            {data.retentionDays} days
          </span>
        </div>
        
        {data.immutable && (
          <div className="mt-2 px-2 py-1 bg-orange-500/20 border border-orange-500/40 rounded text-xs text-orange-400">
            🔒 Immutable (Audit Trail)
          </div>
        )}
        
        {data.partitioning?.enabled && (
          <div className="mt-2 px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
            📊 Partitioned by {data.partitioning.column}
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
        className="w-3 h-3 bg-orange-500 border-2 border-slate-800"
      />
    </div>
  );
};

export default LandingNode;
