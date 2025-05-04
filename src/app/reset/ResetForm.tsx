"use client";

import { sendOTP } from "@/actions/sendOTP";
import Toast from "@/components/toast/Toast";
import { FormEvent, useEffect, useState } from "react";
import updatePassword from "@/actions/updatePassword";
import EmailInput from "../register/EmailInput";
import OTPInput from "../register/OTPInput";
import PasswordInput from "../register/PasswordInput";
import { redirect } from "next/navigation";

interface Input {
    email: string;
    password: string;
}

export default function Form() {
    const [toastMsg, setToastMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [enteredOtp, setEnteredOtp] = useState<string>("");
    const [generatedOtp, setGeneratedOtp] = useState<string>("");
    const [input, setInput] = useState<Input>({
        email: "",
        password: "",
    });

    useEffect(
        function () {
            const id = setTimeout(function () {
                setToastMsg("");
            }, 3000);
            return () => clearTimeout(id);
        },
        [toastMsg]
    );

    async function getOTP() {
        if (!input.email.trim()) {
            setToastMsg("Email is required");
            return;
        }

        try {
            setLoading(true);
            const sentOtp = await sendOTP(input.email);
            setGeneratedOtp(sentOtp);
        } catch (err) {
            if (err instanceof Error) setToastMsg(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (enteredOtp !== generatedOtp) {
            setToastMsg("Invalid OTP");
            return;
        }

        setLoading(true);
        const { message } = (await updatePassword(
            input.email,
            input.password
        )) as {
            success: boolean;
            message: string;
        };
        setLoading(false);
        setToastMsg(message);
        setEnteredOtp("");
        setInput({
            email: "",
            password: "",
        });

        redirect("/login");
    }

    return (
        <>
            <form
                className="flex flex-col gap-6 bg-gray-700 p-8 rounded-lg w-[90%] max-w-[600px] mx-auto items-stretch"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center mb-4">Reset Password</h2>
                <EmailInput input={input} setInput={setInput} />

                {!generatedOtp && (
                    <button
                        type="button"
                        onClick={getOTP}
                        disabled={loading}
                        className="btn btn-success btn-lg rounded-lg"
                    >
                        {loading ? (
                            <span className="loading loading-spinner text-primary"></span>
                        ) : (
                            "Get OTP"
                        )}
                    </button>
                )}

                {generatedOtp && (
                    <>
                        <OTPInput
                            enteredOtp={enteredOtp}
                            setEnteredOtp={setEnteredOtp}
                        />
                        <PasswordInput input={input} setInput={setInput} />
                        <button
                            type="submit"
                            className="btn btn-success btn-lg rounded-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner text-primary"></span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </>
                )}
            </form>

            {toastMsg && <Toast message={toastMsg} />}
        </>
    );
}
