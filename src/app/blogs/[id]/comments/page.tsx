import { fetchComments } from "@/actions/fetchComments";
import { CommentProps } from "@/types";
import getServerSession from "@/actions/getServerSession";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Link from "next/link";

export default async function CommentsPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const session = await getServerSession();
    const post_id = (await params).id;
    const { success, data: comments } = JSON.parse(
        await fetchComments(post_id)
    ) as {
        success: boolean;
        data: CommentProps[];
    };

    if (!success) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500 text-xl">Failed to load comments</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-4xl mx-auto py-8 px-4">
            {session?.id ? (
                <CommentForm post_id={post_id} author_id={session.id} />
            ) : (
                <p className="my-2 text-right">
                    Please{" "}
                    <Link
                        href="/login"
                        className="text-blue-500"
                    >
                        login
                    </Link>{" "}
                    to comment
                </p>
            )}

            <div className="space-y-6">
                <CommentList
                    comments={comments}
                    currentUserId={session?.id}
                    postId={post_id}
                />
            </div>
        </div>
    );
}
