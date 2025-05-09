import Link from "next/link";

export default function Pagination({
    page,
    totalPages,
}: {
    page: number;
    totalPages: number;
}) {
    return (
        <div className="join gap-6 items-center">
            <button className="join-item btn" disabled={page === 1}>
                <Link href={`/?page=${page - 1}`}>«</Link>
            </button>
            <p>Page {page}</p>
            <button className="join-item btn" disabled={page === totalPages}>
                <Link href={`/?page=${page + 1}`}>»</Link>
            </button>
        </div>
    );
}
