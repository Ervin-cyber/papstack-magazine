import { getPostDetail, getSlugType } from "@/sanity/sanity-utils";
import PostListComponent from "../components/PostListComponent";
import ServiceDetailComponent from "../components/ServiceDetailComponent";
import notFound from "../[...not-found]/page";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPostDetail((await params).slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | PapStack Magazine`,
    description: `Read our latest article: ${post.title}`, 
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    }
  };
}

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await (params)).slug
  const slugType = await getSlugType(slug);
  const filter = `*[_type == "category" && slug.current == "${slug}"][0]._id in categories[]._ref`;
  const page = slugType && slugType == "service" ? await ServiceDetailComponent({ slug }) : await PostListComponent({ slug, filter });
  if (!slugType) {
    return notFound();
  }
  return (
    page && page
  );
}