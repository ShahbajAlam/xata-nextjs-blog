"use client";

import { CommentProps } from "@/types";
import { getAuthorName } from "@/utils/getAuthorName";
import { useEffect, useState } from "react";
import { deleteComment } from "@/actions/deleteComment";
import { updateComment } from "@/actions/updateComment";
import Toast from "@/components/toast/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faCheck,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface CommentListProps {
    comments: CommentProps[];
    currentUserId?: string;
    postId: string;
}

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function CommentList({
    comments,
    currentUserId,
    postId,
}: CommentListProps) {
    const [editingId, setEditingId] = useState<string>("");
    const [editContent, setEditContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(
        function () {
            const id = setTimeout(function () {
                setMessage("");
            }, 3000);
            return () => clearTimeout(id);
        },
        [message]
    );

    async function handleDelete(commentId: string) {
        setLoading(true);
        const { data } = await deleteComment(commentId, postId);
        setLoading(false);
        setMessage(data);
    }

    async function handleUpdate(commentId: string) {
        if (!editContent.trim()) {
            setMessage("Comment cannot be empty");
            return;
        }

        setLoading(true);
        const { success, data } = await updateComment(
            commentId,
            editContent.trim(),
            postId
        );
        setLoading(false);

        if (success) {
            setEditingId("");
            setEditContent("");
        }
        setMessage(data);
    }

    function startEdit(comment: CommentProps) {
        setEditingId(comment.xata_id);
        setEditContent(comment.comment);
    }

    if (comments.length === 0) {
        return <p className="text-center text-gray-500">No comments yet</p>;
    }

    return (
        <>
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div
                        key={comment.xata_id}
                        className="bg-base-200 p-4 rounded-lg"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold">
                                    {getAuthorName(comment.author_name)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {comment.xata_createdat &&
                                        formatDate(comment.xata_createdat)}
                                </p>
                            </div>

                            {currentUserId === comment.author_id && (
                                <div className="flex gap-2">
                                    {editingId === comment.xata_id ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdate(
                                                        comment.xata_id!
                                                    )
                                                }
                                                disabled={loading}
                                                className="text-green-500 hover:text-green-600 cursor-pointer"
                                                title="Save"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="w-4 h-4"
                                                />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingId("");
                                                    setEditContent("");
                                                }}
                                                className="text-gray-500 hover:text-gray-600 cursor-pointer"
                                                title="Cancel"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="w-4 h-4"
                                                />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    startEdit(comment)
                                                }
                                                className="text-blue-500 hover:text-blue-600 cursor-pointer"
                                                title="Edit"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    className="w-4 h-4"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        comment.xata_id!
                                                    )
                                                }
                                                disabled={loading}
                                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                                title="Delete"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="w-4 h-4"
                                                />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {editingId === comment.xata_id ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="textarea textarea-bordered w-full mt-2"
                                placeholder="Edit your comment..."
                            />
                        ) : (
                            <p className="whitespace-pre-wrap">
                                {comment.comment}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {message && <Toast message={message} />}
        </>
    );
}
