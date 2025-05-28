import { fetchComments } from "@/actions/fetchComments";
import { CommentProps } from "@/types";
import getServerSession from "@/actions/getServerSession";
import { getAuthorName } from "@/utils/getAuthorName";
import { redirect } from "next/navigation";
import CommentForm from "./CommentForm";

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default async function CommentsPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const session = await getServerSession();
    const post_id = (await params).id;
    const { success, data: comments } = await fetchComments(post_id);

    if (!success) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500 text-xl">Failed to load comments</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Comments</h1>

            {session?.id ? (
                <CommentForm post_id={post_id} author_id={session.id} />
            ) : (
                <div className="bg-base-200 p-4 rounded-lg mb-8">
                    <p>
                        Please{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            login
                        </a>{" "}
                        to comment
                    </p>
                </div>
            )}

            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-center text-gray-500">No comments yet</p>
                ) : (
                    comments.map((comment) => (
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

                                {session?.id === comment.author_id && (
                                    <div className="flex gap-2">
                                        <button className="text-blue-500 hover:text-blue-600 text-sm">
                                            Edit
                                        </button>
                                        <button className="text-red-500 hover:text-red-600 text-sm">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="whitespace-pre-wrap">
                                {comment.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
