
import { createContext, useContext } from 'react';
import { RoadmapContextType } from './types';

// Create the context
export const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

// Export the hook
export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) throw new Error("useRoadmap must be used within a RoadmapProvider");
  return context;
};