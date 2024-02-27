"use client";
import { createContext } from "react";

export const EssentialsContext = createContext();

const colors = {
  bad: ["rgb(240, 0, 0)", "rgb(255, 163, 163)"],
  weak: ["rgb(208, 121, 22)", "rgb(255, 174, 61)"],
  passed: ["rgb(255, 235, 10)", "rgb(255, 243, 168)"],
  good: ["rgb(0, 200, 250)", "rgb(148, 228, 255)"],
  excellent: ["rgb(0, 214, 43)", "rgb(150, 255, 148)"],
};
const EssentialsProvider = ({ children }) => {
  return (
    <EssentialsContext.Provider value={{ colors }}>
      {children}
    </EssentialsContext.Provider>
  );
};
export default EssentialsProvider;
