import getServerSession from "@/actions/getServerSession";
import { redirect } from "next/navigation";
import BlogList from "@/components/blogs/BlogList";
import { fetchBookmarkedBlogs } from "@/actions/fetchBookmarkedBlogs";
import { BlogProps } from "@/types";

export default async function Page() {
    const session = await getServerSession();
    if (!session?.id) redirect("/login");

    const { success, data: posts } = JSON.parse(
        await fetchBookmarkedBlogs(session.id)
    ) as { success: boolean; data: Array<BlogProps> };

    if (!success)
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center p-8">
                <p className="text-red-500 text-xl">
                    Failed to load bookmarked blogs
                </p>
            </div>
        );

    if (posts.length === 0) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center p-8">
                <p className="text-center text-xl text-gray-500">
                    No bookmarked blogs yet
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center gap-8 p-8">
            <h1 className="text-3xl font-bold">Bookmarked Blogs</h1>
            <BlogList blogs={posts as Array<BlogProps>} />
        </div>
    );
}
