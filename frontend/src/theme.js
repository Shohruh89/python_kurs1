// Light/dark color theme.
// The chosen theme is stored in the browser, and applied as <html data-theme="dark">.
// public/index.html applies the saved theme before React loads to avoid a flash of the wrong colors.
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import terms from "./terms.json";

const STORAGE_KEY = "theme";
const listeners = new Set();

function savedTheme() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch (e) {
    return null;
  }
}

export function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    // Theme just won't be remembered.
  }
  listeners.forEach((listener) => listener(theme));
}

export function initTheme() {
  document.documentElement.setAttribute("data-theme", savedTheme() || "light");
}

export function useTheme() {
  const [theme, setState] = React.useState(getTheme);
  React.useEffect(() => {
    listeners.add(setState);
    return () => listeners.delete(setState);
  }, []);
  return theme;
}

export const ThemeToggleButton = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-secondary theme-toggle-button"
      title={terms.toggle_theme}
      aria-label={terms.toggle_theme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon}/>
    </button>
  );
};
