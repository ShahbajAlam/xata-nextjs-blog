"use client";

import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/editor/TextEditor"), {
    ssr: false,
});

export default function Page() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
            <TextEditor />
        </div>
    );
}
