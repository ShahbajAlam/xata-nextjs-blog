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
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface CommentListProps {
    comments: CommentProps[];
    currentUserId?: string;
    postId: string;
}

const COMMENTS_PER_PAGE = 10;

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
    const [currentPage, setCurrentPage] = useState(1);
    const [editingId, setEditingId] = useState<string>("");
    const [editContent, setEditContent] = useState("");
    const [message, setMessage] = useState("");
    const [deletingId, setDeletingId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    const currentComments = comments.slice(startIndex, endIndex);

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
        setDeletingId(commentId);
        const { data } = await deleteComment(commentId, postId);
        setDeletingId("");
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
                {currentComments.map((comment) => (
                    <div
                        key={comment.xata_id}
                        className="bg-base-200 px-4 py-2 rounded-lg"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-3 items-center">
                                <p className="font-semibold">
                                    {getAuthorName(comment.author_name)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {comment.xata_createdat &&
                                        formatDate(comment.xata_createdat)}
                                </p>
                            </div>

                            {currentUserId === comment.author_id && (
                                <div className="flex gap-4">
                                    {editingId === comment.xata_id ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdate(
                                                        comment.xata_id
                                                    )
                                                }
                                                disabled={loading}
                                                className="text-green-500 hover:text-green-600 cursor-pointer"
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
                                                disabled={
                                                    deletingId ===
                                                    comment.xata_id
                                                }
                                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                            >
                                                {deletingId ===
                                                comment.xata_id ? (
                                                    <span className="loading loading-spinner text-error w-4 h-4" />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="w-4 h-4"
                                                    />
                                                )}
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
                                className="textarea textarea-bordered w-full mt-2 focus:outline-none"
                                placeholder="Edit your comment..."
                            />
                        ) : (
                            <p className="whitespace-pre-wrap">
                                {comment.comment}
                            </p>
                        )}
                    </div>
                ))}

                {totalPages > 1 && (
                    <div className="join gap-4 w-full items-center justify-center mt-6">
                        <button
                            className="btn btn-sm join-item"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="w-4 h-4"
                            />
                        </button>

                        <span className="text-sm">Page {currentPage}</span>

                        <button
                            className="btn btn-sm join-item"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="w-4 h-4"
                            />
                        </button>
                    </div>
                )}
            </div>

            {message && <Toast message={message} />}
        </>
    );
}
