"use server";

import { ApiResponse, NewCommentData } from "@/types";
import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export async function addComment(
    commentData: NewCommentData
): Promise<ApiResponse<string>> {
    const { comment, post_id, author_id } = commentData;

    try {
        const author = await xata.db.users.read(author_id);
        if (!author) {
            return {
                success: false,
                data: "User not found",
            };
        }

        await xata.db.comments.create({
            comment,
            post_id,
            author_id,
            author_name: author.name,
        });

        revalidatePath(`/${post_id}/comments`);

        return {
            success: true,
            data: "Comment added successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: "Failed to add comment",
        };
    }
}
