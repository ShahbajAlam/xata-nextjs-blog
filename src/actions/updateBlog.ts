"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";
import { ApiResponse, UpdateBlogData } from "@/types";

const xata = getXataClient();

export async function updateBlog(
    id: string,
    blogData: UpdateBlogData
): Promise<ApiResponse<string>> {
    const { title, content, url, slug } = blogData;

    try {
        await xata.db.posts.update(id, {
            title,
            content,
            slug,
            image: url,
        });

        revalidatePath("/", "page");
        revalidatePath("/myblogs", "page");
        revalidatePath(`/${id}`, "page");

        return {
            success: true,
            data: "Blog updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: "Failed to update blog",
        };
    }
}
