import { Dispatch, SetStateAction } from "react";

export default function OTPInput({
    enteredOtp,
    setEnteredOtp,
}: {
    enteredOtp: string;
    setEnteredOtp: Dispatch<SetStateAction<string>>;
}) {
    return (
        <label className="floating-label">
            <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="Enter OTP"
                className="input input-lg rounded-lg w-full border-none"
            />
            <span>OTP</span>
        </label>
    );
}
