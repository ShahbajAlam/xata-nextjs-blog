import { Dispatch, SetStateAction } from "react";

export default function NameInput({
    name,
    setName,
}: {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
}) {
    return (
        <label className="floating-label">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="input input-lg rounded-lg w-full border-none"
            />
            <span>Name</span>
        </label>
    );
}
