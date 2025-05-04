import { Dispatch, SetStateAction } from "react";

interface Input {
    email: string;
    password: string;
}

export default function PasswordInput({
    input,
    setInput,
}: {
    input: Input;
    setInput: Dispatch<SetStateAction<Input>>;
}) {
    return (
        <label className="floating-label">
            <input
                type="password"
                value={input.password}
                onChange={(e) =>
                    setInput((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                    }))
                }
                placeholder="Enter Password"
                className="input input-lg rounded-lg w-full border-none"
            />
            <span>Password</span>
        </label>
    );
}
