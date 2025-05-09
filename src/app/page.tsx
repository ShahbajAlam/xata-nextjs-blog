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
        author?: string;
    }>;
}) {
    const params = await props.searchParams;
    const page = parseInt(params?.page || "1", 10);
    const search = params?.search || "";
    const author = params?.author || "";

    const { success: successBlogCount, data: blogCount } = await fetchBlogCount(
        search,
        author
    );
    const { success: successAllBlogs, data: blogs } = JSON.parse(
        await fetchBlogs(page, search, author)
    ) as { success: boolean; data: string | Array<BlogProps> };

    if (!successAllBlogs || !successBlogCount) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center gap-8">
            <BlogList blogs={blogs as Array<BlogProps>} />
            <Pagination
                page={page}
                totalPages={Math.ceil((blogCount as number) / SIZE)}
            />
        </div>
    );
}
