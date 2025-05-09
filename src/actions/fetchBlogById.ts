"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchBlogById(id: string) {
    const post = await xata.db.posts.read(id);
    return post;
}
