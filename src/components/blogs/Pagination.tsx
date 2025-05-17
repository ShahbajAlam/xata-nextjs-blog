import Link from "next/link";

export default function Pagination({
    page,
    totalPages,
    search,
    author,
}: {
    author?: string;
    search?: string;
    page: number;
    totalPages: number;
}) {
    return (
        <div className="join gap-6 items-center">
            <button className="join-item btn p-0 w-12" disabled={page === 1}>
                <Link
                    className="w-full h-full flex justify-center items-center"
                    href={{
                        pathname: "/",
                        query: {
                            page: page - 1,
                            ...(search && { search }),
                            ...(author && { author }),
                        },
                    }}
                >
                    «
                </Link>
            </button>
            <p>Page {page}</p>
            <button
                className="join-item btn p-0 w-12"
                disabled={page === totalPages}
            >
                <Link
                    className="w-full h-full flex justify-center items-center"
                    href={{
                        pathname: "/",
                        query: {
                            page: page + 1,
                            ...(search && { search }),
                            ...(author && { author }),
                        },
                    }}
                >
                    »
                </Link>
            </button>
        </div>
    );
}
