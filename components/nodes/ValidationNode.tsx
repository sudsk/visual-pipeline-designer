/**
 * Validation Node Component
 * 
 * Represents data quality validation layer with DQ rules
 */

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ValidationNodeData } from '@/types/pipeline';

const ValidationNode: React.FC<NodeProps<ValidationNodeData>> = ({ data, selected }) => {
  return (
    <div
      className={`
        min-w-[300px] bg-slate-800 rounded-xl border-2 
        transition-all duration-300 shadow-lg
        ${selected ? 'border-green-500 shadow-green-500/50' : 'border-slate-700'}
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-500 border-2 border-slate-800"
      />
      
      {/* Header */}
      <div className="px-4 py-3 bg-green-500/10 border-b border-slate-700 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="text-2xl">✓</div>
          <div className="flex-1">
            <div className="font-semibold text-slate-100">{data.label}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              Validation Layer ({data.layer})
            </div>
          </div>
          {data.aiGenerated && (
            <div className="px-2 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 rounded text-xs text-indigo-400 font-semibold animate-pulse">
              ✨ AI
            </div>
          )}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">DQ Rules:</span>
          <span className="text-sm font-bold text-green-400">
            {data.dqRules.length}
          </span>
        </div>
        
        {/* DQ Rules List */}
        {data.dqRules.length > 0 && (
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {data.dqRules.slice(0, 5).map((rule, idx) => (
              <div
                key={idx}
                className="px-2 py-1 bg-slate-900/60 border-l-2 rounded text-xs"
                style={{
                  borderLeftColor: rule.severity === 'error' ? '#ef4444' : '#f59e0b'
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    {rule.severity === 'error' ? '❌' : '⚠️'}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-slate-200">{rule.name}</div>
                    <code className="text-[10px] text-slate-400">{rule.rule}</code>
                  </div>
                </div>
              </div>
            ))}
            {data.dqRules.length > 5 && (
              <div className="text-center text-xs text-slate-500 py-1">
                +{data.dqRules.length - 5} more rules
              </div>
            )}
          </div>
        )}
        
        {/* Configuration */}
        <div className="pt-2 border-t border-slate-700 space-y-2">
          <div className="text-xs">
            <span className="text-slate-400">On Failure:</span>
            <span className="ml-2 px-2 py-0.5 bg-red-500/20 border border-red-500/40 rounded text-red-400 font-medium">
              {data.failureAction}
            </span>
          </div>
          
          {data.quarantineTable && (
            <div className="text-xs">
              <span className="text-slate-400">Quarantine:</span>
              <code className="ml-2 text-slate-300 bg-slate-900 px-2 py-1 rounded text-[10px]">
                {data.quarantineTable}
              </code>
            </div>
          )}
        </div>
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
        className="w-3 h-3 bg-green-500 border-2 border-slate-800"
      />
    </div>
  );
};

export default ValidationNode;
