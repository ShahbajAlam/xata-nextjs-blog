import BlogList from "@/components/blogs/BlogList";

export default async function Home() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex justify-center">
            <BlogList />
        </div>
    );
}
