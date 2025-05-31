"use client";

import logout from "@/actions/logout";
import { useClickOutside } from "@react-hookz/web";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";

export default function Avatar({ email }: { email: string }) {
    const menuRef = useRef(null);
    const [hidden, setHidden] = useState<boolean>(true);

    useClickOutside(menuRef, () => {
        setHidden(true);
    });

    return (
        <div className="relative">
            <button
                className="btn btn-info btn-lg rounded-full font-bold w-12 h-12 p-0"
                onClick={() => setHidden((prevState) => !prevState)}
            >
                {email.charAt(0).toUpperCase()}
            </button>

            <ul
                ref={menuRef}
                className={`menu bg-base-200 rounded-lg w-56 absolute top-[120%] right-0 ${hidden ? "hidden" : ""} font-bold flex flex-col gap-2 p-2`}
            >
                <li>
                    <Link
                        href="/addblog"
                        onClick={() => setHidden((prevState) => !prevState)}
                    >
                        Add Blog
                    </Link>
                </li>
                <li>
                    <Link
                        href="/myblogs"
                        onClick={() => setHidden((prevState) => !prevState)}
                    >
                        My Blogs
                    </Link>
                </li>
                <li>
                    <Link
                        href="/bookmarked"
                        onClick={() => setHidden((prevState) => !prevState)}
                    >
                        Bookmarked Blogs
                    </Link>
                </li>
                <li
                    className="text-red-400"
                    onClick={async () => {
                        await logout();
                        redirect("/");
                    }}
                >
                    <p>Logout</p>
                </li>
            </ul>
        </div>
    );
}
