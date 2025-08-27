"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    let initialTheme: "light" | "dark";
    if (storedTheme) {
      initialTheme = storedTheme;
    } else {
      initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    root.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme);
  }, []);

  const handleToggle = () => {
    if (!theme) return;
    const root = document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  if (!theme) return null;

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input
        type="checkbox"
        className="theme-controller"
        onChange={handleToggle}
        checked={theme === "dark"}
      />
      <Sun className="swap-on h-6 w-6" />
      <Moon className="swap-off h-6 w-6" />
    </label>
  );
}
