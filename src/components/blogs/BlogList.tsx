import BlogComponent from "./BlogComponent";
import { BlogProps } from "@/types";

export default function BlogList({
    blogs,
    author_id,
}: {
    blogs: Array<BlogProps>;
    author_id?: string;
}) {
    return (
        <ul className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
                <BlogComponent
                    key={blog.xata_id}
                    blog={blog}
                    author_id={author_id || ""}
                />
            ))}
        </ul>
    );
}
