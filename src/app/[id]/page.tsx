import { fetchBlogById } from "@/actions/fetchBlogById";
import { getAuthorName } from "@/utils/getAuthorName";
import React from "react";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

function formatDate(dateInput: Date): string {
    const date = new Date(dateInput);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

export default async function page(props: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await props.params;
    const blog = await fetchBlogById(id);

    if (!blog?.xata_id)
        return (
            <div className="min-h-screen px-4 py-8 flex justify-center  bg-base-100">
                <p className="text-center text-3xl text-red-400">
                    Blog not found!
                </p>
            </div>
        );

    const formattedDate = formatDate(blog.xata_createdat);

    return (
        <div className="min-h-screen px-4 py-8 flex justify-center bg-base-100">
            <div className="card w-full max-w-4xl shadow-xl">
                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        width={800}
                        className="aspect-video block mx-auto bg-contain rounded-xl"
                    />
                )}
                <div className="card-body px-0">
                    <h1 className="card-title text-3xl font-bold">
                        {blog.title}
                    </h1>

                    <div className="flex gap-10 justify-end">
                        <p className="text-sm text-gray-500 grow-0">
                            Posted by {getAuthorName(blog.author_name)}
                        </p>
                        <p className="text-sm text-gray-500 grow-0">
                            Posted on {formattedDate}
                        </p>
                    </div>

                    <div className="divider"></div>

                    <article
                        className="prose content mt-2"
                        dangerouslySetInnerHTML={{
                            __html: purify.sanitize(blog.content),
                        }}
                    />

                    <div className="divider"></div>
                    <div className="flex justify-between items-center">
                        <Link href={`${blog.xata_id}/comments`}>Comments</Link>
                        <FontAwesomeIcon
                            icon={faBookBookmark}
                            className="w-4 h-4"
                            role="button"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
