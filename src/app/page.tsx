"use client";

import { useTheme } from "@/contexts/ThemeProvider";

export default function Home() {
    const { toggleTheme } = useTheme();

    return (
        <div>
            <h1 className="">Hello</h1>
            <button onClick={toggleTheme}>change</button>
        </div>
    );
}
