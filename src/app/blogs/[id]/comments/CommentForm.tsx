"use client";

import { addComment } from "@/actions/addComment";
import { useEffect, useState } from "react";
import Toast from "@/components/toast/Toast";

interface CommentFormProps {
    post_id: string;
    author_id: string;
}

export default function CommentForm({ post_id, author_id }: CommentFormProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(
        function () {
            const id = setTimeout(function () {
                setMessage("");
            }, 3000);
            return () => clearTimeout(id);
        },
        [message]
    );

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!content.trim()) {
            setMessage("Comment cannot be empty");
            return;
        }

        setLoading(true);
        const { success, data } = await addComment({
            comment: content.trim(),
            post_id,
            author_id,
        });
        setLoading(false);

        if (success) {
            setContent("");
            setMessage("Comment added successfully");
        } else {
            setMessage(data);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col gap-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your comment..."
                        className="textarea textarea-bordered min-h-[100px] w-full"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary self-end"
                    >
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            "Post Comment"
                        )}
                    </button>
                </div>
            </form>

            {message && <Toast message={message} />}
        </>
    );
}
