interface Toast {
    message: string;
}

export default function Toast(props: Toast) {
    const { message } = props;

    return (
        <div className="toast">
            <div className="alert alert-info">
                <span>{message}</span>
            </div>
        </div>
    );
}
