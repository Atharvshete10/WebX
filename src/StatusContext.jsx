import { createContext, useContext, useState } from 'react';

const StatusContext = createContext();

export function StatusProvider({ children }) {
  const [spiderSenseOn, setSpiderSenseOn] = useState(true);
  const [thwipOn,       setThwipOn]       = useState(true);

  return (
    <StatusContext.Provider value={{ spiderSenseOn, setSpiderSenseOn, thwipOn, setThwipOn }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    return {
      spiderSenseOn: true,
      setSpiderSenseOn: () => {},
      thwipOn: true,
      setThwipOn: () => {},
    };
  }
  return context;
}
