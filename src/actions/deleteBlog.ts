"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export async function deleteBlog(id: string) {
    try {
        await xata.db.posts.delete(id);
        return true;
    } catch (error) {
        return false;
    } finally {
        revalidatePath("/myblogs", "page");
    }
}
