import { Dispatch, SetStateAction } from "react";

interface BlogTitleProps {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}

export default function BlogTitle(props: BlogTitleProps) {
    const { title, setTitle } = props;

    return (
        <div className="flex flex-col gap-2 basis-1/2">
            <label htmlFor="title">Blog Title</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Blog Title"
                className="input input-md w-full border-[#ccc] border-[1px] blog-title"
            />
        </div>
    );
}
