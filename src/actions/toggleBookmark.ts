"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";
const xata = getXataClient();

export async function toggleBookmark(post_id: string, author_id: string) {
    try {
        const existingBookmark = await xata.db.bookmark
            .filter({
                post_id,
                author_id,
            })
            .getFirst();

        if (existingBookmark) {
            await xata.db.bookmark.delete(existingBookmark.xata_id);
        } else {
            await xata.db.bookmark.create({
                post_id,
                author_id,
            });
        }
        revalidatePath(`/blogs/${post_id}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to toggle bookmark" };
    }
}
