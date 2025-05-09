"use client";

import Link from "next/link";
import { getAuthorName } from "@/utils/getAuthorName";
import { BlogProps } from "./BlogList";

export default function BlogComponent({ blog }: { blog: BlogProps }) {
    return (
        <Link href={blog.xata_id}>
            <li className="card gap-4 w-96 shadow-sm bg-base-100 p-2 border-2 rounded-md h-full">
                <figure>
                    <img
                        src={blog.image}
                        alt={`blog-${blog.xata_id}`}
                        className="w-full aspect-video"
                    />
                </figure>
                <div className="card-body p-2 flex flex-col gap-4 justify-between">
                    <h2 className="card-title wrap-break-word line-clamp-2">
                        {blog.title}
                    </h2>

                    <div className="card-actions justify-end flex-wrap">
                        <div className="badge badge-secondary rounded-sm">
                            Author - {getAuthorName(blog.author)}
                        </div>
                        <div className="badge badge-secondary rounded-sm">
                            Posted -{" "}
                            {new Date(blog.xata_createdat).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
}
