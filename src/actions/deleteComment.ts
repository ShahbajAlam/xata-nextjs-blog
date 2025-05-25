"use server";

import { ApiResponse } from "@/types";
import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export async function deleteComment(
    id: string,
    post_id: string
): Promise<ApiResponse<string>> {
    try {
        await xata.db.comments.delete(id);

        revalidatePath(`/${post_id}/comments`);

        return {
            success: true,
            data: "Comment deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting comment:", error);
        return {
            success: false,
            data: "Failed to delete comment",
        };
    }
}
