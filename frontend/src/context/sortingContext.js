import { createContext, useState } from "react";

export const SortingContext = createContext(null);

export const SortingProvider = ({ children }) => {
  const [sorting, setSorting] = useState(null);
  const value = [sorting, setSorting];
  return (
    <SortingContext.Provider value={value}>{children}</SortingContext.Provider>
  );
};
