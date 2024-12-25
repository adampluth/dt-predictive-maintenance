"use client";

import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorageState<"light" | "dark">("theme", {
    defaultValue: "dark",
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
