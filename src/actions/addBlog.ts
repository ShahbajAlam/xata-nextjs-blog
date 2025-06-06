"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

import { NewBlog } from "@/types";

const xata = getXataClient();

export async function addBlog({ blog }: { blog: NewBlog }) {
    const { title, content, url, slug, author_id } = blog;

    try {
        const data = await xata.db.users
            .filter({ xata_id: author_id })
            .getFirst();

        await xata.db.posts.create({
            title,
            content,
            slug,
            ...(url && { image: url }),
            author_id,
            author_name: data?.name,
        });
        return { success: true, data: "Post added successfuly" };
    } catch (error) {
        console.log(error);
        return { success: false, data: "Failed to add post" };
    } finally {
        revalidatePath("/", "page");
    }
}
