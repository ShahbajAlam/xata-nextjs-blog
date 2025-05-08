import Link from "next/link";
import getServerSession from "@/actions/getServerSession";
import Avatar from "./Avatar";

export default async function Navbar() {
    const email = (await getServerSession()) as string;

    return (
        <nav className="px-12 py-4 flex justify-between items-center fixed w-full left-0 top-0 z-10 backdrop-blur-[2px]">
            <Link href="/">
                <h1>Blog</h1>
            </Link>

            {email ? (
                <Avatar email={email} />
            ) : (
                <Link href="/login">
                    <button className="btn btn-info btn-lg rounded-lg">
                        Login
                    </button>
                </Link>
            )}
        </nav>
    );
}
