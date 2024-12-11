import { createContext, useContext, useState, ReactNode } from "react";

interface TrailContextType {
  trailTitle: string | null;
  setTrailTitle: (title: string) => void;
  currentTrailId: number | null;
  setCurrentTrailId: (trailId: number) => void;
}


const TrailContext = createContext<TrailContextType | undefined>(undefined);

export const TrailProvider = ({ children }: { children: ReactNode }) => {
  const [trailTitle, setTrailTitle] = useState<string | null>(null);
  const [currentTrailId, setCurrentTrailId] = useState<number | null>(null);

  return (
    <TrailContext.Provider value={{ trailTitle, setTrailTitle, currentTrailId, setCurrentTrailId }}>
      {children}
    </TrailContext.Provider>
  );
};

export const useTrail = () => {
  const context = useContext(TrailContext);
  if (!context) {
    throw new Error("useTrail must be used within a TrailProvider");
  }
  return context;
};