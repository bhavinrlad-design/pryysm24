'use client';

import React, { createContext, useContext, useState } from "react";

// Create a simplified context for the workspace
const WorkspaceContext = createContext<any | undefined>(undefined);

// Create a simple provider that just passes children through
export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaceState, setWorkspaceState] = useState<any | null>({});
  
  return (
    <WorkspaceContext.Provider value={{ 
      workspaceState,
      setWorkspaceState,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// Export a hook to use this context
export function useWorkspaceSimple() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceSimple must be used within a WorkspaceProvider');
  }
  return context;
}