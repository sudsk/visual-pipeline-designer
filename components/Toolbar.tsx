/**
 * Toolbar Component
 * 
 * Top toolbar with actions, environment switcher, and feature toggles
 */

'use client';

import React from 'react';
import { useEnvironmentStore } from '@/store/environmentStore';
import { usePipelineStore } from '@/store/pipelineStore';

const Toolbar: React.FC = () => {
  const { environment, setEnvironment, isReadOnly } = useEnvironmentStore();
  const { exportPipeline, clear } = usePipelineStore();
  
  const handleExport = () => {
    const data = exportPipeline();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-${Date.now()}.json`;
    a.click();
  };
  
  const cycleEnvironment = () => {
    const envs: Array<'dev' | 'uat' | 'prod'> = ['dev', 'uat', 'prod'];
    const currentIndex = envs.indexOf(environment);
    const nextEnv = envs[(currentIndex + 1) % envs.length];
    setEnvironment(nextEnv);
  };
  
  return (
    <div className="h-16 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 flex items-center px-6 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-auto">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Pipeline Designer
        </span>
      </div>
      
      {/* Environment Switcher */}
      <button
        onClick={cycleEnvironment}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
      >
        <span className="text-sm text-slate-300">🌍</span>
        <span className="text-sm font-medium text-slate-200">
          Switch Environment
        </span>
      </button>
      
      {/* Import */}
      {!isReadOnly && (
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
          <span className="text-sm font-medium text-slate-200">📁 Import Mapping</span>
        </button>
      )}
      
      {/* Export */}
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
      >
        <span className="text-sm font-medium text-slate-200">💾 Export</span>
      </button>
      
      {/* Code Preview */}
      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
        <span className="text-sm font-medium text-slate-200">👁️ Preview Code</span>
      </button>
      
      {/* Deploy */}
      {!isReadOnly && (
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-colors">
          <span className="text-sm font-medium text-white">🚀 Deploy</span>
        </button>
      )}
      
      {/* Clear */}
      {!isReadOnly && (
        <button
          onClick={clear}
          className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 border border-red-500/50 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium text-red-400">🗑️ Clear</span>
        </button>
      )}
    </div>
  );
};

export default Toolbar;
