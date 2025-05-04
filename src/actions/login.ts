"use server";

import { getXataClient } from "@/xata";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const xata = getXataClient();

export default async function login(email: string, password: string) {
    const cookieStore = await cookies();

    try {
        const user = await xata.db.users.filter({ email }).getFirst();
        if (!user) {
            return { success: false, message: "Invalid email or password." };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid email or password." };
        } else {
            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "7d",
                }
            );
            cookieStore.set("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60,
            });
            return { success: true, message: "Logged in successfully" };
        }
    } catch (error) {
        if (error instanceof Error)
            return { success: false, message: error.message };
    }
}
