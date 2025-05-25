import { fetchBlogById } from "@/actions/fetchBlogById";
import getServerSession from "@/actions/getServerSession";
import TextEditor from "@/components/editor/TextEditor";
import { BlogProps } from "@/types";
import { redirect } from "next/navigation";

export default async function Page(props: {
    params: Promise<{
        id: string;
    }>;
}) {
    const data = await getServerSession();
    if (!data?.id) redirect("/login");

    const { id } = await props.params;
    const blog = (await fetchBlogById(id)) as BlogProps;

    return (
        <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
            <TextEditor author_id={data.id} blog={JSON.stringify(blog)} />
        </div>
    );
}
