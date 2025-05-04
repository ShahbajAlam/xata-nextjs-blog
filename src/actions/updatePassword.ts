"use server";

import bcrypt from "bcrypt";
import { getXataClient } from "@/xata";

const xata = getXataClient();

export default async function updatePassword(
    email: string,
    newPassword: string
) {
    try {
        const user = await xata.db.users.filter({ email }).getFirst();

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await xata.db.users.update(user.xata_id, {
            password: hashedPassword,
        });

        return { success: true, message: "Password updated successfully" };
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : "Unknown error",
        };
    }
}
