"use server";

import { ApiResponse } from "@/types";
import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export async function updateComment(
    comment_id: string,
    newComment: string,
    post_id: string
): Promise<ApiResponse<string>> {
    try {
        const comment = await xata.db.comments.read(comment_id);

        if (!comment) {
            return {
                success: false,
                data: "Comment not found",
            };
        }

        await xata.db.comments.update(comment_id, {
            comment: newComment,
        });

        revalidatePath(`/${post_id}/comments`);

        return {
            success: true,
            data: "Comment updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: "Failed to update comment",
        };
    }
}
