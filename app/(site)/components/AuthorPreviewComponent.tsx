import Link from "next/link";
import { ImageRoundedComponent } from "./ImageComponent";
import { Author } from "@/types/Author";
import { getPortableTextPreview } from "../utils/utils";

export default async function AuthorPreviewComponent({ slug, _id, coverImage, name, description }: Author) {
    return (
        <div className="border-t border-b border-gray-300 py-10 my-10">
            <h3 className="font-ubuntu-bold text-2xl text-gray-400 uppercase tracking-widest mb-8">About The Author</h3>

            <Link href={`/author/${slug.current}`} key={_id} className="group block">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                    
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-full border border-gray-200 group-hover:border-black transition duration-300">
                        <ImageRoundedComponent image={coverImage} width="100%" height="100%" />
                    </div>
                    
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-3xl font-baskervville text-black mb-3 group-hover:text-gray-600 transition duration-300">{name}</h2>
                        <p className="text-gray-600 font-geist-sans leading-relaxed text-sm sm:text-base mb-4">
                            {getPortableTextPreview(description)}
                        </p>
                        <span className="text-xs font-ubuntu-bold text-black uppercase tracking-widest group-hover:underline">
                            Read more articles ➝
                        </span>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}