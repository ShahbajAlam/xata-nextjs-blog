"use client";

import DOMPurify from "dompurify";
import { fetchBlogs } from "@/actions/fetchBlogs";
import { useEffect, useState } from "react";
import Toast from "../toast/Toast";
import Pagination from "./Pagination";
import BlogComponent from "./BlogComponent";

export interface Blog {
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

export default function BlogList() {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [blogs, setBlogs] = useState<Array<Blog>>([]);

    useEffect(
        function () {
            const id = setTimeout(function () {
                setError("");
            }, 3000);
            return () => clearTimeout(id);
        },
        [error]
    );

    useEffect(() => {
        (async function () {
            setLoading(true);
            const { success, data } = JSON.parse(await fetchBlogs(page));
            if (success) {
                setBlogs(data);
            } else {
                setError(data);
            }
            setLoading(false);
        })();
    }, [page]);

    return (
        <>
            {loading && (
                <span className="loading loading-spinner text-info fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
            )}
            {error && <Toast message={error} />}
            {blogs && (
                <>
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
                        <Pagination
                            page={page}
                            setPage={setPage}
                            blogs={blogs}
                        />
                    </div>
                </>
            )}
        </>
    );
}
