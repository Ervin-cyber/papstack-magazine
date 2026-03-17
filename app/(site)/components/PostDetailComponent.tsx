import { PortableText } from "next-sanity";
import { PortableTextComponents } from "./PortableTextComponents";
import AuthorPreviewComponent from "./AuthorPreviewComponent";
import { getAuthorByPost, getPostDetail } from "@/sanity/sanity-utils";

export default async function PostDetailComponent({ params }: { params: Promise<{ slug: string }>; }) {
  const author = await getAuthorByPost((await params).slug);
  const post = await getPostDetail((await params).slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magazine.papstack.net';

  if (!post) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.aiSummary || post.title,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.publishedAt,
    author: [{
      '@type': 'Person',
      name: author.name,
      url: `${baseUrl}/author/${author.slug.current}`
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Papstack Magazine',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/post/${post.slug.current}`
    }
  };

  return (
    <div className="py-5">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-baskervville text-5xl md:text-7xl text-black mb-8">{post.title}</h1>

      {post.aiSummary && (
        <div className="bg-gray-100 p-6 border-l-4 border-black mb-8 rounded-r-md">
          <h3 className="font-ubuntu-bold text-sm uppercase tracking-widest text-gray-500 mb-2">✨ AI Quick Summary</h3>
          <p className="font-geist-sans text-gray-800 leading-relaxed">{post.aiSummary}</p>
        </div>
      )}

      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <PortableText value={post.body} components={PortableTextComponents} />

        <AuthorPreviewComponent slug={author.slug} _id={author._id} coverImage={author.coverImage} name={author.name} description={author.description} />
      </div>
    </div>

  );
}