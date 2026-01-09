/**
 * Environment Store - Zustand State Management
 * 
 * Manages environment-specific state:
 * - Current environment (dev/uat/prod)
 * - Read-only mode
 * - Environment-specific features
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Environment = 'dev' | 'uat' | 'prod';

export interface EnvironmentState {
  // State
  environment: Environment;
  isReadOnly: boolean;
  
  // Actions
  setEnvironment: (env: Environment) => void;
  toggleReadOnly: () => void;
  
  // Feature flags
  features: {
    aiAssistant: boolean;
    codeGeneration: boolean;
    deployment: boolean;
    mappingImporter: boolean;
  };
  
  // Update features
  updateFeatures: (features: Partial<EnvironmentState['features']>) => void;
}

export const useEnvironmentStore = create<EnvironmentState>()(
  persist(
    (set, get) => ({
      // Initial state - defaults to dev
      environment: 'dev',
      isReadOnly: false,
      
      features: {
        aiAssistant: true,
        codeGeneration: true,
        deployment: true,
        mappingImporter: true,
      },
      
      // Set environment and auto-configure read-only mode
      setEnvironment: (env) => {
        const isReadOnly = env !== 'dev';
        
        // Auto-configure features based on environment
        const features = {
          aiAssistant: env === 'dev',
          codeGeneration: env === 'dev',
          deployment: env === 'dev',
          mappingImporter: env === 'dev',
        };
        
        set({
          environment: env,
          isReadOnly,
          features,
        });
      },
      
      // Toggle read-only (only in dev)
      toggleReadOnly: () => {
        const { environment } = get();
        if (environment === 'dev') {
          set((state) => ({
            isReadOnly: !state.isReadOnly,
          }));
        }
      },
      
      // Update features
      updateFeatures: (newFeatures) => {
        set((state) => ({
          features: {
            ...state.features,
            ...newFeatures,
          },
        }));
      },
    }),
    {
      name: 'environment-storage',
    }
  )
);

// Helper function to get environment config
export function getEnvironmentConfig(env: Environment) {
  const configs = {
    dev: {
      label: 'Development',
      color: 'green',
      description: 'Full access - Design and build pipelines',
      icon: '🔓',
      allowedOperations: {
        create: true,
        read: true,
        update: true,
        delete: true,
        deploy: true,
      },
    },
    uat: {
      label: 'UAT',
      color: 'yellow',
      description: 'Read-only - Validate and document',
      icon: '🔒',
      allowedOperations: {
        create: false,
        read: true,
        update: false,
        delete: false,
        deploy: false,
      },
    },
    prod: {
      label: 'Production',
      color: 'red',
      description: 'Read-only - Monitor and audit',
      icon: '🔒',
      allowedOperations: {
        create: false,
        read: true,
        update: false,
        delete: false,
        deploy: false,
      },
    },
  };
  
  return configs[env];
}
