"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function isBookmarked(post_id: string, author_id: string) {
    try {
        const bookmark = await xata.db.bookmark
            .filter({
                post_id,
                author_id,
            })
            .getFirst();

        return !!bookmark;
    } catch (error) {
        return false;
    }
}
