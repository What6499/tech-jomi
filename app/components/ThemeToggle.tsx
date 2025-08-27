"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme) {
      root.setAttribute("data-theme", storedTheme);
      setTheme(storedTheme);
    } else {
      const currentTheme = root.getAttribute("data-theme") as
        | "light"
        | "dark"
        | null;
      if (currentTheme) setTheme(currentTheme);
      else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.setAttribute("data-theme", prefersDark ? "dark" : "light");
        setTheme(prefersDark ? "dark" : "light");
      }
    }
  }, []);

  const handleToggle = () => {
    const root = document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input
        type="checkbox"
        className="theme-controller"
        onChange={handleToggle}
        checked={theme === "dark"}
      />
      {/* Sun icon (shown in dark mode to switch to light) */}
      <Sun className="swap-on h-6 w-6 text-[var(--color-primary)]" />
      {/* Moon icon (shown in light mode to switch to dark) */}
      <Moon className="swap-off h-6 w-6 text-[var(--color-primary)]" />
    </label>
  );
}
