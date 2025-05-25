"use client";

import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from "react";

import { ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType>({
    theme: "emerald",
    toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<"emerald" | "black">(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            return storedTheme === "emerald" || storedTheme === "black"
                ? storedTheme
                : "emerald";
        }
        return "emerald";
    });

    function toggleTheme() {
        setTheme((prev) => (prev === "emerald" ? "black" : "emerald"));
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error(
            "Probably you are trying to use context outside of its provider..."
        );
    return context;
}

export { ThemeProvider, useTheme };
