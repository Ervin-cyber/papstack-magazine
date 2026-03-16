import Logo from "./Logo";
import { getSocialPages } from "@/sanity/sanity-utils";
import { SocialPage } from "@/types/SocialPage";
import { IconComponent } from "./ImageComponent";

export default async function Footer() {
    const socialPages = await getSocialPages();
    return (
        <footer>
            <div className="w-full">
                <div className="border-y border-gray-300 flex items-center justify-center h-full md:h-20">
                    <div className="flex items-center">
                        <ul className="flex flex-col md:flex md:flex-row items-center justify-center md:gap-x-[17vw] text-black">
                            {
                                socialPages.map((socialPage: SocialPage) => {
                                    return (
                                        <a href={socialPage.url} className="flex items-center py-3 md:py-0 gap-4 hover:opacity-80" key={socialPage._id}>
                                            <IconComponent image={socialPage.icon} />
                                            <div className="">{socialPage.title}</div>
                                        </a>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full h-25 my-1">
                    <Logo />
                </div>
            </div>
        </footer>
    )
}