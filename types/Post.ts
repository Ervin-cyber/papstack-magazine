import { PortableTextBlock } from "next-sanity";
import { Slug } from "sanity";
import { Category_ref } from "./Category";

export type Post = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: Slug;
    author: string;
    categories: Array<Category_ref>;
    coverImage: string;
    aiSummary?: string;
    publishedAt: Date;
    body: PortableTextBlock[];
}