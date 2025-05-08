"use server";

import bcrypt from "bcrypt";
import { getXataClient } from "@/xata";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const xata = getXataClient();

export default async function register(
    name: string,
    email: string,
    password: string
) {
    const cookieStore = await cookies();

    try {
        const existingUser = await xata.db.users.filter({ email }).getFirst();
        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await xata.db.users.create({
            name,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            const token = jwt.sign(
                { email: newUser.email },
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
            return { success: true, message: "Registered successfully" };
        }
    } catch (err) {
        if (err instanceof Error)
            return { success: false, message: err.message };
    }
}
