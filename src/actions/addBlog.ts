"use server";

interface Blog {
    url?: string;
    title: string;
    content: string;
}

export async function addBlog({ blog }: { blog: Blog }) {}
