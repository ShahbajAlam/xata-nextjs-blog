"use client";

import Link from "next/link";
import { getAuthorName } from "@/utils/getAuthorName";
import { BlogProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { deleteBlog } from "@/actions/deleteBlog";
import Toast from "../toast/Toast";
import { useRouter } from "next/navigation";

function formatDate(dateInput: Date): string {
    const date = new Date(dateInput);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

export default function BlogComponent({
    blog,
    author_id,
}: {
    blog: BlogProps;
    author_id?: string;
}) {
    const router = useRouter();
    const formattedDate = formatDate(blog.xata_createdat);
    const [message, setMessage] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(
        function () {
            const id = setTimeout(function () {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(id);
        },
        [showToast]
    );

    async function handleDeleteBlog(id: string) {
        setLoading(true);
        const success = await deleteBlog(id);
        if (success) {
            setShowToast(true);
            setMessage("Blog deleted successfully");
        } else {
            setShowToast(true);
            setMessage("Blog is not deleted");
        }
        setLoading(false);
    }

    return (
        <>
            <li className="card gap-4 w-96 shadow-sm bg-base-100 p-2 border-2 rounded-md h-full">
                <Link href={blog.xata_id}>
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
                                Author - {getAuthorName(blog.author_name)}
                            </div>
                            <div className="badge badge-secondary rounded-sm">
                                Posted - {formattedDate}
                            </div>
                        </div>
                    </div>
                </Link>

                {author_id === blog.author_id && (
                    <div className="flex gap-6 justify-end">
                        <FontAwesomeIcon
                            icon={faEdit}
                            color="#50C878"
                            className="w-4 h-4 cursor-pointer self-end"
                            role="button"
                            onClick={() => router.push(`/edit/${blog.xata_id}`)}
                        />
                        {loading ? (
                            <span className="loading loading-spinner text-[#FF6347] w-4 h-4"></span>
                        ) : (
                            <FontAwesomeIcon
                                icon={faTrash}
                                color="#FF6347"
                                className="w-4 h-4 cursor-pointer self-end"
                                role="button"
                                onClick={() => handleDeleteBlog(blog.xata_id)}
                            />
                        )}
                    </div>
                )}
            </li>

            {showToast && <Toast message={message} />}
        </>
    );
}
