/**
 * AI Assistant Panel Component
 * 
 * AI chat interface with suggestions and streaming support
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAgentStore } from '@/store/agentStore';
import { sendChatMessage } from '@/lib/anthropic';

const AIAssistantPanel: React.FC = () => {
  const {
    messages,
    suggestions,
    isTyping,
    activeTab,
    setActiveTab,
    addMessage,
    setTyping,
    applySuggestion,
  } = useAgentStore();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    // Add user message
    addMessage({ role: 'user', content: userMessage });
    setTyping(true);
    
    try {
      // Send to Claude
      const response = await sendChatMessage(userMessage);
      
      // Add assistant response
      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      });
    } finally {
      setTyping(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="w-96 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl animate-pulse">✨</span>
          <h3 className="text-sm font-semibold text-slate-200">
            AI Pipeline Architect
          </h3>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'suggestions'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Suggestions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'chat'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Chat
          </button>
        </div>
      </div>
      
      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-sm font-medium text-slate-300 mb-2">
            💡 AI Suggestions
          </div>
          
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-slate-500 uppercase font-medium">
                  {suggestion.type}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  suggestion.impact === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  suggestion.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {suggestion.impact.toUpperCase()}
                </span>
              </div>
              
              <div className="text-sm font-medium text-slate-200 mb-1">
                {suggestion.title}
              </div>
              
              <div className="text-xs text-slate-400 mb-3">
                {suggestion.description}
              </div>
              
              <button
                onClick={() => applySuggestion(suggestion.id)}
                disabled={suggestion.applied}
                className={`w-full px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  suggestion.applied
                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
                }`}
              >
                {suggestion.applied ? '✓ Applied' : 'Apply Suggestion'}
              </button>
            </div>
          ))}
          
          {suggestions.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-8">
              No suggestions yet. Start building your pipeline!
            </div>
          )}
        </div>
      )}
      
      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your pipeline..."
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistantPanel;
