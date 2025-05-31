"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchBookmarkedBlogs(authorId: string) {
    try {
        const bookmarks = await xata.db.bookmark
            .filter({
                author_id: authorId,
            })
            .select(["post_id"])
            .getAll();

        const postIds = bookmarks.map((bookmark) => bookmark.post_id);

        if (postIds.length === 0) {
            return JSON.stringify({
                success: true,
                data: [],
            });
        }

        const posts = await xata.db.posts
            .filter({
                xata_id: { $any: postIds },
            })
            .getAll();

        return JSON.stringify({
            success: true,
            data: posts,
        });
    } catch (error) {
        return JSON.stringify({
            success: false,
            data: "Failed to fetch bookmarked blogs",
        });
    }
}
