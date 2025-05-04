"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export default async function getServerSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        const { email } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as any;
        return email;
    } catch (error) {
        return null;
    }
}
