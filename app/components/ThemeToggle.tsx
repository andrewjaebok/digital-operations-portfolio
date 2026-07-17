"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "system" | "dark";

const themes: { value: Theme; icon: string; label: string }[] = [
  { value: "light", icon: "☀", label: "Light theme" },
  { value: "system", icon: "◐", label: "Use system theme" },
  { value: "dark", icon: "☾", label: "Dark theme" },
];

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && prefersDark));
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    const initial = saved && themes.some((option) => option.value === saved) ? saved : "system";
    applyTheme(initial);
    const frame = window.requestAnimationFrame(() => setTheme(initial));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if ((localStorage.getItem("portfolio-theme") || "system") === "system") applyTheme("system");
    };
    media.addEventListener("change", syncSystemTheme);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", syncSystemTheme);
    };
  }, []);

  const chooseTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {themes.map((option) => (
        <button
          type="button"
          key={option.value}
          className={theme === option.value ? "active" : ""}
          aria-label={option.label}
          aria-pressed={theme === option.value}
          onClick={() => chooseTheme(option.value)}
        >
          <span aria-hidden="true">{option.icon}</span>
        </button>
      ))}
    </div>
  );
}
