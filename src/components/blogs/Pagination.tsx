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
            <button className="join-item btn" disabled={page === 1}>
                <Link
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
            <button className="join-item btn" disabled={page === totalPages}>
                <Link
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
