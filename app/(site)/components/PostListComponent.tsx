import Link from "next/link";
import { PostPreviewComponent } from "./ImageComponent";
import { getCategories, getCategoryDescription, getPosts } from "@/sanity/sanity-utils";
import { Post } from "@/types/Post";
import { Category, Category_ref } from "@/types/Category";
import { findNameById, findSlugById, getPortableTextPreview } from "../utils/utils";

export default async function PostListComponent({ slug, filter }: { slug: string, filter: string }) {
  const posts: Post[] = await getPosts(filter);
  const categoryDescription = await getCategoryDescription(slug);
  const categories: Category[] = await getCategories();
  return (
    <div className="items-center">
      {
        categoryDescription && <h1 className="font-baskervville text-3xl text-center text-black pt-4 pb-2 border-b border-gray-200">{categoryDescription}</h1>
      }

      <div className="flex flex-col gap-y-4 divide-y divide-gray-300 pt-2">
        {posts.map((post: Post) => (
          <div className="flex flex-col sm:flex-row space-y-4 sm:max-w" key={post._id}>
            <Link className="flex sm:flex-shrink-0 hover:opacity-80 transition object-cover" href={`/post/${post.slug.current}`}>
              <PostPreviewComponent image={post.coverImage} />
            </Link>
            <div className="text-left sm:px-6 md:px-6 lg:px-6 xl:px-6">
              {
                post.categories.map((category: Category_ref) => (
                  <Link className="" href={`/${findSlugById(categories, category._ref)}`} key={category._ref}>
                    <span className="font-ubuntu-bold text-sm text-gray-700 pe-2 hover:underline transition" key={category._ref}>{findNameById(categories, category._ref)}</span>
                  </Link>
                ))
              }
              <Link className="" href={`/post/${post.slug.current}`}>
                <h3 className="font-baskervville font-bold text-black hover:underline transition">{post.title}</h3>
              </Link>
              <p className="text-gray-600 font-geist-sans leading-relaxed">{getPortableTextPreview(post.body)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}