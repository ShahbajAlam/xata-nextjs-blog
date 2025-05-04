"use client";

import login from "@/actions/login";
import Toast from "@/components/toast/Toast";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import EmailInput from "../register/EmailInput";
import PasswordInput from "../register/PasswordInput";
import LoginButton from "./LoginButton";

interface Input {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false);
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

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!input.email.trim() || !input.password.trim()) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        const { message, success } = (await login(
            input.email,
            input.password
        )) as { success: boolean; message: string };
        setLoading(false);

        if (!success) {
            setError(message);
            return;
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
                <h2 className="text-center mb-4">Welcome back!!</h2>

                <EmailInput input={input} setInput={setInput} />
                <PasswordInput input={input} setInput={setInput} />
                <LoginButton loading={loading} />

                <div className="flex justify-between items-center">
                    <p>
                        <Link href="/reset" className="text-blue-400">
                            Forgot password?
                        </Link>
                    </p>

                    <p className="text-right">
                        No account? Register{" "}
                        <Link href="/register" className="text-blue-400">
                            here
                        </Link>
                    </p>
                </div>
            </form>

            {error && <Toast message={error} />}
        </>
    );
}
