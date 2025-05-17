"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    return (
        <div className="flex justify-center items-center gap-4 w-[50%] my-4">
            <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input outline-none border-none"
                placeholder="Search for a blog"
            />
            <button
                className="btn btn-accent"
                onClick={() => router.push(`/?search=${search}`)}
            >
                Search
            </button>
        </div>
    );
}
