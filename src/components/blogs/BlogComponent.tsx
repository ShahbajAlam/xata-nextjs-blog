import { Blog } from "./BlogList";

export default function BlogComponent({ blog }: { blog: Blog }) {
    return (
        <li className="card bg-base-100 w-96 shadow-sm bg-[rgba(255,255,255,0.4)]">
            <figure>
                <img
                    src={blog.image}
                    alt={`blog-${blog.xata_id}`}
                    className="w-full aspect-video"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <article
                    className="prose text-ellipsis"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </li>
    );
}
