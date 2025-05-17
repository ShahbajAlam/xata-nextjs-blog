"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    return (
        <div className="flex justify-center items-center gap-4 my-4 w-[500px]">
            <div className="relative w-full">
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input outline-none border-none w-full"
                    placeholder="Search for a blog"
                />
                {search && (
                    <FontAwesomeIcon
                        role="button"
                        onClick={() => {
                            setSearch("");
                            router.push("/");
                        }}
                        icon={faTrash}
                        width={15}
                        height={15}
                        className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer text-red-500"
                    />
                )}
            </div>
            <button
                className="btn btn-accent"
                onClick={() => router.push(`/?search=${search}`)}
            >
                Search
            </button>
        </div>
    );
}
