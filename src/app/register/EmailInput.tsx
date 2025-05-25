import { Dispatch, SetStateAction } from "react";
import { AuthFormInput } from "@/types";

export default function EmailInput({
    input,
    setInput,
}: {
    input: AuthFormInput;
    setInput: Dispatch<SetStateAction<AuthFormInput>>;
}) {
    return (
        <label className="floating-label">
            <input
                type="email"
                value={input.email}
                onChange={(e) =>
                    setInput((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                    }))
                }
                placeholder="Enter Email ID"
                className="input input-lg rounded-lg w-full border-none"
            />
            <span>Email ID</span>
        </label>
    );
}
