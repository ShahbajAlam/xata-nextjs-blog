export default function Loading() {
    return (
        <div className="w-screen h-screen fixed inset-0 flex justify-center items-center">
            <span className="loading loading-spinner text-info w-12" />
        </div>
    );
}
