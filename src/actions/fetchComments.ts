"use server";

import { ApiResponse, CommentProps } from "@/types";
import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchComments(
    post_id: string
): Promise<ApiResponse<CommentProps[]>> {
    try {
        const comments = await xata.db.comments
            .filter({ post_id })
            .sort("xata_createdat", "desc")
            .getMany();

        return {
            success: true,
            data: comments,
        };
    } catch (error) {
        return {
            success: false,
            data: [],
        };
    }
}
