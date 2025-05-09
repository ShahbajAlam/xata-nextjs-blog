"use client";

import Link from "next/link";
import { getAuthorName } from "@/utils/getAuthorName";
import { BlogProps } from "./BlogList";

function formatDate(dateInput: Date): string {
    const date = new Date(dateInput);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

export default function BlogComponent({ blog }: { blog: BlogProps }) {
    const formattedDate = formatDate(blog.xata_createdat);

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
                            Posted - {formattedDate}
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
}
