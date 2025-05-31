"use client";

import { useFormStatus } from "react-dom";

export default function BookmarkButton({
    isBookmarked,
    isLoggedIn,
}: {
    isBookmarked: boolean;
    isLoggedIn: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`btn ${isBookmarked ? "btn-outline btn-primary" : "btn-primary"} min-w-[120px]`}
            disabled={!isLoggedIn || pending}
            title={isLoggedIn ? "Toggle bookmark" : "Login to bookmark"}
        >
            {pending ? (
                <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Loading</span>
                </>
            ) : isBookmarked ? (
                "Bookmarked"
            ) : (
                "Bookmark"
            )}
        </button>
    );
}
