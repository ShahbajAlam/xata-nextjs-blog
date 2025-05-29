import { fetchComments } from "@/actions/fetchComments";
import getServerSession from "@/actions/getServerSession";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { CommentProps } from "@/types";

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
    ) as { success: boolean; data: Array<CommentProps> };

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
                <CommentList
                    comments={comments}
                    currentUserId={session?.id}
                    postId={post_id}
                />
            </div>
        </div>
    );
}
