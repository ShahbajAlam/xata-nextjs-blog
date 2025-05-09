"use server";

import { SIZE } from "@/utils/var";
import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchBlogs(
    pageNumber: number = 1,
    search: string = "",
    author: string = ""
) {
    try {
        const page = await xata.db.posts
            .filter({
                $all: [
                    search ? { title: { $contains: search } } : {},
                    author ? { author: { $is: author } } : {},
                ],
            })
            .sort("xata_createdat", "desc")
            .getPaginated({
                pagination: { size: SIZE, offset: (pageNumber - 1) * SIZE },
            });
        return JSON.stringify({ success: true, data: page.records });
    } catch (error) {
        return JSON.stringify({
            success: false,
            data: "Failed to fetch blogs",
        });
    }
}
