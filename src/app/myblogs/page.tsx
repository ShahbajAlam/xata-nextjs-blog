import { fetchBlogCount } from "@/actions/fetchBlogCount";
import { fetchBlogs } from "@/actions/fetchBlogs";
import getServerSession from "@/actions/getServerSession";
import BlogList, { BlogProps } from "@/components/blogs/BlogList";
import Pagination from "@/components/blogs/Pagination";
import { SIZE } from "@/utils/var";
import { redirect } from "next/navigation";

export default async function Page(props: {
    searchParams?: Promise<{
        page?: string;
    }>;
}) {
    const sessionData = await getServerSession();
    if (!sessionData?.id) redirect("/login");

    const params = await props.searchParams;
    const page = parseInt(params?.page || "1", 10);

    const { data: blogs, success: successAllBlogs } = JSON.parse(
        await fetchBlogs(page, "", sessionData.id)
    ) as {
        success: boolean;
        data: Array<BlogProps> | string;
    };
    const { success: successBlogCount, data: blogCount } =
        (await fetchBlogCount("", sessionData.id)) as {
            success: boolean;
            data: number | string;
        };

    if (!successAllBlogs || !successBlogCount) return null;

    if (blogs.length === 0)
        return (
            <div className="min-h-screen px-4 py-8 flex justify-center  bg-base-100">
                <p className="text-center text-3xl text-red-500">
                    No blogs found!
                </p>
            </div>
        );

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center gap-8">
            <BlogList
                blogs={blogs as Array<BlogProps>}
                author_id={sessionData.id}
            />
            {(blogCount as number) > SIZE && (
                <Pagination
                    page={page}
                    totalPages={Math.ceil((blogCount as number) / SIZE)}
                />
            )}
        </div>
    );
}
