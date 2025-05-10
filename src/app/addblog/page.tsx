import getServerSession from "@/actions/getServerSession";
import TextEditor from "@/components/editor/TextEditor";
import { redirect } from "next/navigation";

export default async function Page() {
    const data = await getServerSession();
    if (!data?.id) redirect("/login");

    return (
        <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
            <TextEditor author_id={data.id} />
        </div>
    );
}
