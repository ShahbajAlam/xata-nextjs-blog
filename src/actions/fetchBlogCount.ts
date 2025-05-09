"use server";

import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function fetchBlogCount(search: string = "", author: string = "") {
    try {
        const page = await xata.db.posts
            .filter({
                $all: [
                    search ? { title: { $contains: search } } : {},
                    author ? { author: { $is: author } } : {},
                ],
            })
            .summarize({
                summaries: {
                    totalBlogs: {
                        count: "*",
                    },
                },
            });

        return {
            success: true,
            data: page.summaries[0].totalBlogs,
        };
    } catch (error) {
        return {
            success: false,
            data: "Failed to fetch blogs count",
        };
    }
}
