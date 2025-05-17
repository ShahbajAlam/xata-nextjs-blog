"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import ImageUpload from "./ImageUpload";
import BlogTitle from "./BlogTitle";
import Toast from "../toast/Toast";
import { addBlog } from "@/actions/addBlog";
import { createSlug } from "@/utils/createSlug";

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

export default function TextEditor({ author_id }: { author_id: string }) {
    let imageUrl =
        "https://res.cloudinary.com/dqid08knh/image/upload/v1746691387/rhqkadzugblg17wmuj68.jpg";
    const [toastMessage, setToastMessage] = useState<string>("");
    const inputRef = useRef<ReactQuill | null>(null);
    const [text, setText] = useState<string>("");
    const [fileInput, setFileInput] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const id = setInterval(() => {
            const editor = inputRef.current?.getEditor();
            if (editor) {
                setText(editor.root.innerHTML);
            }
        }, 2000);

        return () => clearInterval(id);
    }, []);

    useEffect(
        function () {
            const id = setTimeout(function () {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(id);
        },
        [showToast]
    );

    function reset() {
        setTitle("");
        setFileInput(null);
        setText("");
        inputRef.current?.getEditor().setText("");
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (text.length < 25) {
            setShowToast(true);
            setToastMessage("Blog is too short to post");
            return;
        }

        try {
            setLoading(true);
            if (fileInput) {
                const { data, success } =
                    await uploadImageToCloudinary(fileInput);
                if (success) {
                    imageUrl = data;
                } else {
                    setToastMessage(data);
                    setShowToast(true);
                }
            }
            const { success, data } = (await addBlog({
                blog: {
                    title,
                    content: text,
                    url: imageUrl,
                    slug: createSlug(title),
                    author_id,
                },
            })) as { success: boolean; data: any };
            if (success) {
                setToastMessage(data);
                setShowToast(true);
                reset();
            } else {
                setToastMessage(data);
                setShowToast(true);
            }
        } catch (error: any) {
            setToastMessage(error.data);
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 items-center"
            >
                <div className="self-start flex justify-between items-center w-full gap-8">
                    <BlogTitle title={title} setTitle={setTitle} />
                    <ImageUpload setFileInput={setFileInput} />
                </div>
                <ReactQuill ref={inputRef} theme="snow" modules={modules} />

                <button
                    type="submit"
                    className="btn btn-success btn-lg rounded-lg self-end"
                    disabled={!title.trim() || loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner text-primary"></span>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>

            {showToast && <Toast message={toastMessage} />}
        </>
    );
}
