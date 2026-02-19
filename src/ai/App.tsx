"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ClassicHome from "./components/ClassicHome";
import type { LiveHomeData } from "@/ai/live-types";
import type { FooterColumn, NavItem } from "@/ai/types";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

type AppProps = {
  liveData?: LiveHomeData;
  navItems?: NavItem[];
  footerLinks?: FooterColumn[];
};

const App: React.FC<AppProps> = ({ liveData, navItems, footerLinks }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="font-body antialiased text-stone-900 bg-white dark:bg-black dark:text-white">
        <ClassicHome liveData={liveData} navItems={navItems} footerLinks={footerLinks} />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
