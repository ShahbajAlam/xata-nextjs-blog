export default function Loading() {
    return (
        <div className="px-12 min-h-[calc(100vh-80px)] flex justify-center">
            <ul className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 6 }, (_, i) => {
                    return (
                        <li
                            className="card gap-4 w-96 shadow-sm bg-base-100 p-2 rounded-md h-full"
                            key={i}
                        >
                            <div className="skeleton w-full aspect-video rounded-md" />
                            <div className="skeleton h-8 w-full rounded-md"></div>
                            <div className="flex gap-4 self-end">
                                <div className="skeleton h-4 w-16 self-end rounded-md" />
                                <div className="skeleton h-4 w-16 self-end rounded-md" />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
