"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchComments(post_id: string): Promise<string> {
    try {
        const comments = await xata.db.comments
            .filter({ post_id })
            .sort("xata_createdat", "desc")
            .getMany();

        return JSON.stringify({
            success: true,
            data: comments,
        });
    } catch (error) {
        return JSON.stringify({
            success: false,
            data: [],
        });
    }
}
