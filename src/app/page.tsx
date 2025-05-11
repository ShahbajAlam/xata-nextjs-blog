import { fetchBlogCount } from "@/actions/fetchBlogCount";
import { fetchBlogs } from "@/actions/fetchBlogs";
import BlogList from "@/components/blogs/BlogList";
import { type BlogProps } from "@/components/blogs/BlogList";
import Pagination from "@/components/blogs/Pagination";
import { SIZE } from "@/utils/var";

export default async function Home(props: {
    searchParams?: Promise<{
        search?: string;
        page?: string;
    }>;
}) {
    const params = await props.searchParams;
    const page = parseInt(params?.page || "1", 10);
    const search = params?.search || "";

    const { success: successBlogCount, data: blogCount } = await fetchBlogCount(
        search,
        ""
    );
    const { success: successAllBlogs, data: blogs } = JSON.parse(
        await fetchBlogs(page, search, "")
    ) as { success: boolean; data: string | Array<BlogProps> };

    if (!successAllBlogs || !successBlogCount) return null;

    if (blogs.length === 0)
        return (
            <div className="min-h-screen px-4 py-8 flex justify-center  bg-base-100">
                <p className="text-center text-3xl text-red-400">
                    No Blogs Found!!!
                </p>
            </div>
        );

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center gap-8">
            <BlogList blogs={blogs as Array<BlogProps>} />
            {(blogCount as number) > SIZE && (
                <Pagination
                    page={page}
                    search={search}
                    totalPages={Math.ceil((blogCount as number) / SIZE)}
                />
            )}
        </div>
    );
}
