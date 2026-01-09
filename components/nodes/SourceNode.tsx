/**
 * Source Node Component
 * 
 * Represents data sources like Pub/Sub, GCS, Databases
 */

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { SourceNodeData } from '@/types/pipeline';

const SourceNode: React.FC<NodeProps<SourceNodeData>> = ({ data, selected }) => {
  const getSourceIcon = () => {
    switch (data.sourceType) {
      case 'pubsub':
        return '📨';
      case 'gcs':
        return '📁';
      case 'database':
        return '🗄️';
      case 'api':
        return '🔗';
      default:
        return '📊';
    }
  };
  
  const getSourceLabel = () => {
    switch (data.sourceType) {
      case 'pubsub':
        return 'Pub/Sub';
      case 'gcs':
        return 'Cloud Storage';
      case 'database':
        return 'Database CDC';
      case 'api':
        return 'API Connector';
      default:
        return 'Source';
    }
  };
  
  return (
    <div
      className={`
        min-w-[280px] bg-slate-800 rounded-xl border-2 
        transition-all duration-300 shadow-lg
        ${selected ? 'border-blue-500 shadow-blue-500/50' : 'border-slate-700'}
      `}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-blue-500/10 border-b border-slate-700 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getSourceIcon()}</div>
          <div className="flex-1">
            <div className="font-semibold text-slate-100">{data.label}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              {getSourceLabel()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 space-y-2">
        {data.sourceType === 'pubsub' && data.connection.pubsub && (
          <>
            <div className="text-xs">
              <span className="text-slate-400">Topic:</span>
              <code className="ml-2 text-blue-400 bg-slate-900 px-2 py-1 rounded">
                {data.connection.pubsub.topic || 'Not configured'}
              </code>
            </div>
            {data.connection.pubsub.subscription && (
              <div className="text-xs">
                <span className="text-slate-400">Subscription:</span>
                <code className="ml-2 text-blue-400 bg-slate-900 px-2 py-1 rounded">
                  {data.connection.pubsub.subscription}
                </code>
              </div>
            )}
          </>
        )}
        
        {data.sourceType === 'gcs' && data.connection.gcs && (
          <>
            <div className="text-xs">
              <span className="text-slate-400">Bucket:</span>
              <code className="ml-2 text-blue-400 bg-slate-900 px-2 py-1 rounded">
                {data.connection.gcs.bucket || 'Not configured'}
              </code>
            </div>
            <div className="text-xs">
              <span className="text-slate-400">Format:</span>
              <span className="ml-2 text-slate-300">
                {data.connection.gcs.format}
              </span>
            </div>
          </>
        )}
        
        {data.sourceType === 'database' && data.connection.database && (
          <>
            <div className="text-xs">
              <span className="text-slate-400">Database:</span>
              <span className="ml-2 text-slate-300">
                {data.connection.database.database}
              </span>
            </div>
            <div className="text-xs">
              <span className="text-slate-400">Tables:</span>
              <span className="ml-2 text-slate-300">
                {data.connection.database.tables.length} tables
              </span>
            </div>
          </>
        )}
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500 border-2 border-slate-800"
      />
    </div>
  );
};

export default SourceNode;
