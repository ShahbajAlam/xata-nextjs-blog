import { OTPInputProps } from "@/types";

export default function OTPInput({ enteredOtp, setEnteredOtp }: OTPInputProps) {
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
