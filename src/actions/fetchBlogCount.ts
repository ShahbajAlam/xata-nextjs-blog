"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchBlogCount() {
    try {
        const totalCount = await xata.db.posts.summarize({
            summaries: {
                count: { count: "*" },
            },
        });
        return { success: true, data: Number(totalCount.summaries[0].count) };
    } catch (error) {
        return { success: false, data: "Failed to fetch blogs count" };
    }
}
