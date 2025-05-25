import { ToastProps } from "@/types";

export default function Toast(props: ToastProps) {
    const { message } = props;

    return (
        <div className="toast">
            <div className="alert alert-info">
                <span>{message}</span>
            </div>
        </div>
    );
}
