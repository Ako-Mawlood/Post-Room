import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar"
import { Button } from "../../ui/button";
import starIcon from "../../../../public/Icons/star.svg"

interface blogType {
    id: number;
    fullName: string;
    authorBio: string;
    authorImage: string;
    title: string;
    description: string;
    src: string;
}

const previewBlogs: blogType[] = [
    {
        id: 0,
        title: "Impacts of Adult Behaviors on Children",
        description: "Explore how adult actions and behaviors influence children's development.",
        src: "https://tse2.mm.bing.net/th/id/OIG1.69oXxCxgb5GiBZw6Rz4m?pid=ImgGn",
        fullName: "Sangar Mawlood",
        authorImage: "https://scontent.febl5-2.fna.fbcdn.net/v/t39.30808-6/274879156_2177696605718753_4655404325092292858_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LDZ-1TfT64AQ7kNvgEPvJNF&_nc_ht=scontent.febl5-2.fna&oh=00_AYCJP1XZLdZ3WLgvJJ4sm0igh_QZOpCnJE2osYXn1CL2FA&oe=66666DAA",
        authorBio: "Psychologist, Author"
    },
    {
        id: 1,
        title: "The Importance of Sleep for Children",
        description: "Explore how adequate sleep positively impacts children's health and development.",
        src: "https://tse2.mm.bing.net/th/id/OIG3.mdSgx14Ax0H725buTlml?pid=ImgGn",
        fullName: "Jordan Smith",
        authorImage: "https://as1.ftcdn.net/v2/jpg/03/02/88/46/1000_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",
        authorBio: "Doctor, Writer"
    },
    {
        id: 2,
        title: "The Rapid Economic Growth of Kurdistan",
        description: "An in-depth look at the factors driving Kurdistan's economic development.",
        src: "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        fullName: "Mohammed",
        authorImage: "https://images.peFxels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        authorBio: "Engineer, Writer"
    },
    {
        id: 3,
        title: "The Importance of Calmness",
        description: "Explore how staying calm can improve your overall well-being.",
        src: "https://images.pexels.com/photos/9002742/pexels-photo-9002742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        fullName: "Peirs Mosh",
        authorImage: "https://www.wilsoncenter.org/sites/default/files/styles/large/public/media/images/person/james-person-1.webp",
        authorBio: "Innovator"
    },
    {
        F
        id: 4,
        title: "The Effects of Loneliness",
        description: "Understand the impact of loneliness on mental health and ways to combat it.",
        src: "https://tse1.mm.bing.net/th/id/OIG1.KwznMBY4NglXceoosm2u?pid=ImgGn",
        fullName: "Karim Abadulla",
        authorImage: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        authorBio: "Psychologist, Author"
    },
    {
        id: 5,
        title: "The Joy of Coding",
        description: "Dive into the world of coding and discover how it can unlock endless possibilities.",
        src: "https://tse4.mm.bing.net/th/id/OIG3.AkxPxsozuQr7CoBPgUoe?pid=ImgGn",
        fullName: "Abdlbarry Qaisar",
        authorImage: "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        authorBio: "Software Developer, Educator"
    }
];


interface BlogsPreviewPropsType {
    sliderIndex: number;
    backgroundColor: string
}
const BlogsPreview = ({ sliderIndex, backgroundColor }: BlogsPreviewPropsType) => {

    return (
        <div style={{ backgroundColor: `rgb(${backgroundColor})` }} className="w-full md:w-[720px] relative border-y-[1px] border-black md:border-none">
            {
                previewBlogs.map((blog: blogType, index: number) => (
                    <div key={blog.id} className={clsx("h-[70vh] md:h-full w-full absolute top-0 left-0", {
                        "opacity-0 duration-500": sliderIndex != index,
                        "opacity-100 duration-500": sliderIndex == index,
                    })}>
                        <div className="flex flex-col md:flex-row w-full h-3/5 absolute md:relative">
                            <div style={{ background: `linear-gradient(0deg, rgb(${backgroundColor}) 0, rgba(0,0,0,0) 50%)` }} className="w-full h-full  relative bottom-[-2px] left-0 z-40">
                                <Button variant="secondary" className="flex items-center gap-3 text-xs absolute top-[-20px] rounded-none opacity-95 shadow-sm mt-8 z-50 right-4">
                                    <Image
                                        className="size-6"
                                        src={starIcon}
                                        alt="Star icon"
                                    />
                                    Get this & many more
                                </Button>
                            </div>
                            <Image
                                src={blog.src}
                                className="object-cover w-full h-full z-30"
                                fill={true}
                                alt="Blog image"
                            />
                        </div>
                        <div className="px-4 pt-10 md:px-5 md:py-7 lg:py-10">
                            <div style={{ backgroundColor: `rgb(${backgroundColor})` }} className="flex flex-col self-center gap-3 w-full h-2/5 absolute bottom-0 left-0 md:relative p-4 sm:pr-10 md:p-0 border-black font-semibold z-50">
                                <h1 className="text-2xl line-clamp-2 opacity-75">{blog.title}</h1>
                                <p className="opacity-70 text-base md:line-clamp-2 line-clamp-4">{blog.description}</p>
                                <div className="flex items-center gap-3 font-Satoshi">
                                    <Avatar>
                                        <AvatarImage src={blog.authorImage} />
                                        <AvatarFallback>AM</AvatarFallback>
                                    </Avatar>
                                    <div className="text-base font-sans">
                                        <h2 className="opacity-75">{blog.fullName}</h2>
                                        <p className="text-xs opacity-70 line-clamp-2">{blog.authorBio}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BlogsPreview
