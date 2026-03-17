import { PortableText } from "next-sanity";
import { PortableTextComponents } from "../../../(site)/components/PortableTextComponents";
import { getAuthorBySlug } from "@/sanity/sanity-utils";
import { ImageRoundedComponent } from "../../components/ImageComponent";
import notFound from "../../[...not-found]/page";
import PostListComponent from "../../components/PostListComponent";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = await getAuthorBySlug((await params).slug);

  if (!author) {
    return notFound();
  }
  return (
    <div className="py-10">
      
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        
        <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full mb-6 border border-gray-200 shadow-sm flex-shrink-0">
          <ImageRoundedComponent image={author.coverImage} width="100%" height="100%" />
        </div>
        
        <h1 className="font-baskervville text-5xl md:text-6xl text-black mb-6">{author.name}</h1>
        
        <div className="prose prose-lg text-gray-600 font-geist-sans leading-relaxed">
          <PortableText value={author.description} components={PortableTextComponents} />
        </div>
        
        {author.registeredAt && (
          <p className="mt-6 font-ubuntu-bold text-xs uppercase tracking-widest text-gray-400">
            Member since: {new Date(author.registeredAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="border-t border-gray-300 pt-10">
        <h3 className="font-ubuntu-bold text-2xl text-gray-400 uppercase tracking-widest mb-8 text-center sm:text-left">
          Articles by {author.name}
        </h3>
        
        <PostListComponent slug="" filter={`author._ref == "${author._id}"`} />
      </div>
      
    </div>
  );
}