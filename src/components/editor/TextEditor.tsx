"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "clean"],
    ],
};

export default function TextEditor() {
    const inputRef = useRef<ReactQuill | null>(null);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const id = setInterval(() => {
            const editor = inputRef.current?.getEditor();
            if (editor) {
                setText(editor.root.innerHTML);
            }
        }, 2000);

        return () => clearInterval(id);
    }, []);

    console.log(text);

    return (
        <form className="flex flex-col gap-6 items-center">
            <h1>Write your blog</h1>
            <ReactQuill ref={inputRef} theme="snow" modules={modules} />
            <button
                type="submit"
                className="btn btn-success btn-lg rounded-lg self-end"
            >
                Submit
            </button>
        </form>
    );
}
