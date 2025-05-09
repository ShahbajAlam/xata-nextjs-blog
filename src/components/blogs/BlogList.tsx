import BlogComponent from "./BlogComponent";

export interface BlogProps {
    author: string;
    xata_id: string;
    xata_version: number;
    xata_createdat: Date;
    xata_updatedat: Date;
    title: string;
    slug: string;
    content: string;
    image?: string;
}

export default function BlogList({ blogs }: { blogs: Array<BlogProps> }) {
    return (
        <ul className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
                <BlogComponent key={blog.xata_id} blog={blog} />
            ))}
        </ul>
    );
}
