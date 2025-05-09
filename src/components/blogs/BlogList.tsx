"use client";

import DOMPurify from "dompurify";
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

function safeHTML(dirtyHTML: string) {
    return DOMPurify.sanitize(dirtyHTML);
}

export default function BlogList({ blogs }: { blogs: Array<BlogProps> }) {
    return (
        <div className="flex flex-col gap-8 items-center">
            <ul className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                    <BlogComponent
                        key={blog.xata_id}
                        blog={{
                            ...blog,
                            content: safeHTML(blog.content),
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}
