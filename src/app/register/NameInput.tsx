import { NameInputProps } from "@/types";

export default function NameInput({ name, setName }: NameInputProps) {
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
