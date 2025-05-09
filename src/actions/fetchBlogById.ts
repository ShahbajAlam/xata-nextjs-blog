"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchBlogById(id: string) {
    try {
        const post = await xata.db.posts.read(id);
        return post;
    } catch (err) {
        return null;
    }
}
