import { fetchBlogById } from "@/actions/fetchBlogById";
import { getAuthorName } from "@/utils/getAuthorName";
import React from "react";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import BookmarkButton from "@/components/blogs/BookmarkButton";
import Link from "next/link";
import { toggleBookmark } from "@/actions/toggleBookmark";
import { isBookmarked } from "@/actions/isBookmarked";
import getServerSession from "@/actions/getServerSession";

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
    const session = await getServerSession();
    const isBookmarkedByUser = session?.id
        ? await isBookmarked(id, session?.id)
        : false;

    if (!blog?.xata_id)
        return (
            <div className="min-h-screen px-4 py-8 flex justify-center  bg-base-100">
                <p className="text-center text-3xl text-red-400">
                    Blog not found!
                </p>
            </div>
        );

    const formattedDate = formatDate(blog.xata_createdat);

    async function handleBookmarkToggle() {
        "use server";
        if (!session?.id) return;
        await toggleBookmark(id, session?.id);
    }

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

                    <div className="flex justify-between items-center gap-4">
                        {session?.id !== blog.author_id ? (
                            <Link
                                href={`/?author=${blog.author_id}`}
                                className="btn btn-outline"
                            >
                                Check other posts by{" "}
                                {getAuthorName(blog.author_name)}
                            </Link>
                        ) : (
                            <div></div>
                        )}
                        <div className="flex items-center gap-4">
                            <Link
                                href={`${blog.xata_id}/comments`}
                                className="btn btn-secondary"
                            >
                                Comments
                            </Link>
                            <form action={handleBookmarkToggle}>
                                <BookmarkButton
                                    isBookmarked={isBookmarkedByUser}
                                    isLoggedIn={!!session?.id}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
