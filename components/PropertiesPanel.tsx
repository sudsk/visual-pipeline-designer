/**
 * Properties Panel Component
 * 
 * Right sidebar showing selected node properties
 */

'use client';

import React from 'react';
import { usePipelineStore } from '@/store/pipelineStore';

const PropertiesPanel: React.FC = () => {
  const { selectedNode, updateNode } = usePipelineStore();
  
  if (!selectedNode) return null;
  
  const { data, type } = selectedNode;
  
  return (
    <div className="w-80 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            Properties
          </h3>
          <button
            onClick={() => usePipelineStore.getState().selectNode(null)}
            className="text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>
        
        {/* Node Type Badge */}
        <div className="mb-4 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Node Type</div>
          <div className="text-sm font-medium text-slate-200 capitalize">
            {type?.replace(/([A-Z])/g, ' $1').trim()}
          </div>
        </div>
        
        {/* Label */}
        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-1">Label</label>
          <input
            type="text"
            value={data.label || ''}
            onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
        
        {/* Layer */}
        {data.layer && (
          <div className="mb-4">
            <label className="block text-xs text-slate-400 mb-1">Layer</label>
            <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 uppercase font-medium">
              {data.layer}
            </div>
          </div>
        )}
        
        {/* Type-specific properties */}
        {type === 'source' && data.sourceType && (
          <div className="mb-4">
            <label className="block text-xs text-slate-400 mb-1">Source Type</label>
            <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200">
              {data.sourceType}
            </div>
          </div>
        )}
        
        {type === 'landing' && (
          <>
            <div className="mb-4">
              <label className="block text-xs text-slate-400 mb-1">Storage Type</label>
              <select
                value={data.storageType || 'bigquery'}
                onChange={(e) => updateNode(selectedNode.id, { storageType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="bigquery">BigQuery</option>
                <option value="biglake">BigLake</option>
                <option value="gcs">Cloud Storage</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-xs text-slate-400 mb-1">Format</label>
              <select
                value={data.format || 'parquet'}
                onChange={(e) => updateNode(selectedNode.id, { format: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="parquet">Parquet</option>
                <option value="avro">Avro</option>
                <option value="iceberg">Iceberg</option>
                <option value="delta">Delta Lake</option>
              </select>
            </div>
          </>
        )}
        
        {type === 'validation' && (
          <div className="mb-4">
            <label className="block text-xs text-slate-400 mb-2">DQ Rules</label>
            <div className="space-y-2">
              {(data.dqRules || []).map((rule: any, idx: number) => (
                <div key={idx} className="p-2 bg-slate-800 border border-slate-700 rounded text-xs">
                  <div className="font-medium text-slate-200">{rule.name}</div>
                  <code className="text-slate-400 text-[10px]">{rule.rule}</code>
                </div>
              ))}
              {(!data.dqRules || data.dqRules.length === 0) && (
                <div className="text-xs text-slate-500 italic">No DQ rules defined</div>
              )}
            </div>
          </div>
        )}
        
        {type === 'ingestion' && (
          <div className="mb-4">
            <label className="block text-xs text-slate-400 mb-1">Processing Engine</label>
            <select
              value={data.engine || 'bigquery'}
              onChange={(e) => updateNode(selectedNode.id, { engine: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="bigquery">BigQuery SQL</option>
              <option value="dataflow">Dataflow</option>
              <option value="spark">Serverless Spark</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        )}
        
        {type === 'dataVault' && data.structure && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-400">
                    {data.structure.hubs?.length || 0}
                  </div>
                  <div className="text-xs text-slate-400">Hubs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-400">
                    {data.structure.links?.length || 0}
                  </div>
                  <div className="text-xs text-slate-400">Links</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">
                    {data.structure.satellites?.length || 0}
                  </div>
                  <div className="text-xs text-slate-400">Satellites</div>
                </div>
              </div>
            </div>
            
            {data.autoGenerated && (
              <div className="px-3 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-xs text-indigo-400">
                ✨ AI-generated structure
              </div>
            )}
          </div>
        )}
        
        {/* AI Generated Badge */}
        {data.aiGenerated && (
          <div className="mt-4 px-3 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg">
            <div className="text-xs text-indigo-400 font-medium">
              ✨ AI-Generated Component
            </div>
          </div>
        )}
        
        {/* Description */}
        {data.description && (
          <div className="mt-4">
            <label className="block text-xs text-slate-400 mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => updateNode(selectedNode.id, { description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        )}
        
        {/* Node ID */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="text-xs text-slate-500">
            Node ID: <code className="text-slate-400">{selectedNode.id}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
