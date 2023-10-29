import React, { createContext, useContext, useState } from "react";

// Create a context to hold the tdee and a function to set it
const TdeeContext = createContext();

export function ProvideTdee({ children }) {
  const [tdee, setTdee] = useState("");

  return (
    <TdeeContext.Provider value={{ tdee, setTdee }}>
      {children}
    </TdeeContext.Provider>
  );
}

// Custom hook to access tdee and setTdee
export function useTdee() {
  return useContext(TdeeContext);
}
