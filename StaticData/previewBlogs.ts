interface blogType {
    id: number;
    fullName: string;
    authorBio: string;
    authorImage: string | undefined;
    title: string;
    description: string;
    src: string;
}

export const previewBlogs: blogType[] = [
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
        fullName: "Mohammed Osman",
        authorImage: undefined,
        authorBio: "Engineer, Writer"
    },
    {
        id: 3,
        title: "The Importance of Calmness",
        description: "Explore how staying calm can improve your overall well-being.",
        src: "https://images.pexels.com/photos/9002742/pexels-photo-9002742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        fullName: "Rawand Ranjdar",
        authorImage: "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        authorBio: "Innovator"
    },
    {
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
        authorImage: undefined,
        authorBio: "Software Developer, Educator"
    }
];