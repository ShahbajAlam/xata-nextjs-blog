"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

interface Blog {
    url?: string;
    title: string;
    slug: string;
    content: string;
}

const xata = getXataClient();

export async function addBlog({ blog }: { blog: Blog }) {
    const { title, content, url, slug } = blog;
    try {
        await xata.db.posts.create({
            title,
            content,
            slug,
            image: url,
        });
        return { success: true, data: "Post added successfuly" };
    } catch (error) {
        console.log(error);
        return { success: false, data: "Failed to add post" };
    } finally {
        revalidatePath("/");
    }
}
