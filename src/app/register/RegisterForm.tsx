"use client";

import Toast from "@/components/toast/Toast";
import { FormEvent, useEffect, useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import OTPInput from "./OTPInput";
import { sendOTP } from "@/actions/sendOTP";
import register from "@/actions/register";
import { redirect } from "next/navigation";
import Link from "next/link";
import NameInput from "./NameInput";

interface Input {
    email: string;
    password: string;
}

export default function Form() {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [enteredOtp, setEnteredOtp] = useState<string>("");
    const [generatedOtp, setGeneratedOtp] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [input, setInput] = useState<Input>({
        email: "",
        password: "",
    });

    useEffect(
        function () {
            const id = setTimeout(function () {
                setError("");
            }, 3000);
            return () => clearTimeout(id);
        },
        [error]
    );

    async function getOTP() {
        if (!input.email.trim() || !input.password.trim() || !name.trim()) {
            setError("All the fields are required");
            return;
        }

        try {
            setLoading(true);
            const sentOtp = await sendOTP(input.email);
            setGeneratedOtp(sentOtp);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (enteredOtp !== generatedOtp) {
            setError("Invalid OTP");
            return;
        }

        setLoading(true);
        const { success, message } = (await register(
            name,
            input.email,
            input.password
        )) as { success: boolean; message: string };
        setLoading(false);

        if (!success) {
            setError(message);
            setEnteredOtp("");
            setGeneratedOtp("");
        } else {
            redirect("/");
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 bg-gray-700 p-8 rounded-lg w-[90%] max-w-[600px] mx-auto items-stretch"
            >
                <h2 className="text-center mb-4">Welcome!!</h2>
                <NameInput name={name} setName={setName} />
                <EmailInput input={input} setInput={setInput} />
                <PasswordInput input={input} setInput={setInput} />
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-success btn-lg rounded-lg"
                        >
                            {loading ? (
                                <span className="loading loading-spinner text-primary"></span>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </>
                )}

                <p className="text-right">
                    Already registered? Login{" "}
                    <Link href="/login" className="text-blue-400">
                        here
                    </Link>
                </p>
            </form>

            {error && <Toast message={error} />}
        </>
    );
}
