/**
 * Agent Store - Zustand State Management
 * 
 * Manages AI assistant state:
 * - Chat messages
 * - AI suggestions
 * - Loading states
 * - Conversation history
 */

import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AISuggestion {
  id: string;
  type: 'architecture' | 'optimization' | 'quality' | 'flexibility';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: () => void;
  applied?: boolean;
}

export interface AgentState {
  // Chat state
  messages: ChatMessage[];
  isTyping: boolean;
  
  // Suggestions state
  suggestions: AISuggestion[];
  
  // UI state
  isPanelOpen: boolean;
  activeTab: 'suggestions' | 'chat' | 'config';
  
  // Actions - Messages
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setTyping: (isTyping: boolean) => void;
  
  // Actions - Suggestions
  addSuggestion: (suggestion: Omit<AISuggestion, 'id'>) => void;
  applySuggestion: (id: string) => void;
  dismissSuggestion: (id: string) => void;
  clearSuggestions: () => void;
  
  // Actions - UI
  togglePanel: () => void;
  setActiveTab: (tab: 'suggestions' | 'chat' | 'config') => void;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  // Initial state
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hi! I\'m your AI Pipeline Architect. I can help you design your pipeline, suggest optimizations, and answer questions about your architecture. How can I help?',
      timestamp: new Date(),
    },
  ],
  isTyping: false,
  suggestions: [],
  isPanelOpen: true,
  activeTab: 'suggestions',
  
  // Message actions
  addMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  
  clearMessages: () => {
    set({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: '👋 Hi! I\'m your AI Pipeline Architect. How can I help?',
          timestamp: new Date(),
        },
      ],
    });
  },
  
  setTyping: (isTyping) => {
    set({ isTyping });
  },
  
  // Suggestion actions
  addSuggestion: (suggestion) => {
    const newSuggestion: AISuggestion = {
      ...suggestion,
      id: `suggestion-${Date.now()}-${Math.random()}`,
      applied: false,
    };
    
    set((state) => ({
      suggestions: [...state.suggestions, newSuggestion],
    }));
  },
  
  applySuggestion: (id) => {
    const { suggestions } = get();
    const suggestion = suggestions.find((s) => s.id === id);
    
    if (suggestion?.action) {
      suggestion.action();
    }
    
    set((state) => ({
      suggestions: state.suggestions.map((s) =>
        s.id === id ? { ...s, applied: true } : s
      ),
    }));
  },
  
  dismissSuggestion: (id) => {
    set((state) => ({
      suggestions: state.suggestions.filter((s) => s.id !== id),
    }));
  },
  
  clearSuggestions: () => {
    set({ suggestions: [] });
  },
  
  // UI actions
  togglePanel: () => {
    set((state) => ({
      isPanelOpen: !state.isPanelOpen,
    }));
  },
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));

// Helper function to generate initial suggestions
export function generateInitialSuggestions(): Omit<AISuggestion, 'id'>[] {
  return [
    {
      type: 'architecture',
      title: 'Add Quarantine Layer in Bronze',
      description: 'For Financial Services compliance, add a quarantine layer to isolate failed records. This is required for DORA compliance.',
      impact: 'high',
    },
    {
      type: 'flexibility',
      title: 'Customer Can Add More Layers',
      description: 'Your current architecture has 5 layers. You can add as many as you need! Many FS customers use 11+ layers for regulatory compliance.',
      impact: 'medium',
    },
    {
      type: 'optimization',
      title: 'Enable Advanced Runtime',
      description: 'BigQuery\'s advanced runtime can improve query performance by 15-20% for Data Vault workloads. Estimated savings: $80/month.',
      impact: 'medium',
    },
  ];
}
