"use client";

import { fetchBlogCount } from "@/actions/fetchBlogCount";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Toast from "../toast/Toast";
import { SIZE } from "@/utils/var";
import { type Blog } from "./BlogList";

export default function Pagination({
    blogs,
    page,
    setPage,
}: {
    blogs: Blog[];
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}) {
    const [totalPage, setTotalPage] = useState<number>(0);
    const [error, setError] = useState<string>("");

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
            const { success, data } = await fetchBlogCount();
            if (success) {
                setTotalPage(Math.ceil((data as number) / SIZE));
            } else {
                setError(data as string);
            }
        })();
    }, []);

    function handlePrev() {
        if (page === 1) return;
        setPage((prev) => prev - 1);
    }
    function handleNext() {
        if (page === totalPage) return;
        setPage((prev) => prev + 1);
    }

    return (
        <>
            {blogs.length > 0 && (
                <div className="join">
                    <button
                        className="join-item btn"
                        disabled={page === 1}
                        onClick={handlePrev}
                    >
                        «
                    </button>
                    <button className="join-item btn">{page}</button>
                    <button
                        className="join-item btn"
                        disabled={page === totalPage}
                        onClick={handleNext}
                    >
                        »
                    </button>
                </div>
            )}
            {error && <Toast message={error} />}
        </>
    );
}
