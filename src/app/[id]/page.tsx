import { fetchBlogById } from "@/actions/fetchBlogById";
import { BlogProps } from "@/components/blogs/BlogList";
import { getAuthorName } from "@/utils/getAuthorName";
import Image from "next/image";
import React from "react";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

function formatDate(dateInput: Date): string {
    const date = new Date(dateInput);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

export default async function page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const blog = await fetchBlogById(params.id);

    if (!blog?.xata_id)
        return (
            <div className="min-h-screen px-4 py-8 flex justify-center  bg-base-100">
                <p className="text-center text-3xl text-red-500">
                    Blog not found!
                </p>
            </div>
        );

    const formattedDate = formatDate(blog.xata_createdat);

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
                <div className="card-body px-0">
                    <h1 className="card-title text-3xl font-bold">
                        {blog.title}
                    </h1>

                    <div className="flex gap-10 justify-end">
                        <p className="text-sm text-gray-500 grow-0">
                            Posted by {getAuthorName(blog.author)}
                        </p>
                        <p className="text-sm text-gray-500 grow-0">
                            Posted on {formattedDate}
                        </p>
                    </div>

                    <article
                        className="prose content mt-16"
                        dangerouslySetInnerHTML={{
                            __html: purify.sanitize(blog.content),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
