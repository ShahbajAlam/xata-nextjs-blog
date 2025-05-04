export default function LoginButton({ loading }: { loading: boolean }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="btn btn-success btn-lg rounded-lg"
        >
            {loading ? (
                <span className="loading loading-spinner text-primary"></span>
            ) : (
                "Login"
            )}
        </button>
    );
}
