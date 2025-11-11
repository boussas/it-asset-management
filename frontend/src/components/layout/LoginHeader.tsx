  
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const LoginHeader: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onToggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const enabled = html.classList.contains("dark");
    setIsDarkMode(enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setIsDarkMode(prefersDark);
    }
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        IT Asset Management
      </div>

      <button
        onClick={onToggleDarkMode}
        aria-label="Toggle dark mode"
        className="p-2 rounded-full cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 outline-none transition"
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
    </header>
  );
};

export default LoginHeader;
