import { fetchBlogById } from "@/actions/fetchBlogById";
import { BlogProps } from "@/components/blogs/BlogList";
import Image from "next/image";
import React from "react";

export default async function page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const blog = (await fetchBlogById(params.id)) as BlogProps;

    return (
        <div className="min-h-screen px-4 py-8 flex justify-center bg-base-100">
            <div className="card w-full max-w-4xl shadow-xl">
                {blog.image && (
                    <figure>
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            width={1200}
                            height={600}
                            className="w-full h-auto object-cover rounded-t-xl"
                        />
                    </figure>
                )}
                <div className="card-body">
                    <h1 className="card-title text-3xl font-bold">
                        {blog.title}
                    </h1>

                    <p className="text-sm text-gray-500 grow-0">
                        Posted by {blog.author}
                    </p>
                    <p className="grow-0">
                        Posted on{" "}
                        {new Date(blog.xata_createdat).toLocaleDateString()}
                    </p>

                    <article
                        className="prose max-w-none mt-12"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </div>
    );
}
