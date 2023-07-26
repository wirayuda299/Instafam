import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<string | null>("");
  
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const selectedTheme =
      theme || localStorage.theme || (prefersDarkMode ? "dark" : "light");

    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
    localStorage.theme = selectedTheme;
  }, [theme]);
  return {theme, setTheme}
};