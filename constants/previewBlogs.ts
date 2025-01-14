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
    id: 2,
    title: "The Rapid Economic Growth of Kurdistan and Its Impact",
    description:
      "An in-depth look at the factors driving Kurdistan's economic development.",
    src: "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fullName: "Mohammed Osman",
    authorImage: undefined,
    authorBio: "Engineer, Writer",
  },
  {
    id: 1,
    title: "The Importance of Sleep for Children's Health",
    description:
      "Explore how adequate sleep positively impacts children's health and development.",
    src: "https://tse2.mm.bing.net/th/id/OIG3.mdSgx14Ax0H725buTlml?pid=ImgGn",
    fullName: "Ehsan Zaid",
    authorImage:
      "https://as1.ftcdn.net/v2/jpg/03/02/88/46/1000_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",
    authorBio: "Doctor, Writer",
  },
  {
    id: 0,
    title: "The Prison System: Exploring Its Impact on Society and Inmates",
    description:
      "A deep dive into the prison system, its impact on individuals, and society as a whole.",
    src: "https://as2.ftcdn.net/jpg/08/41/68/23/1000_F_841682350_EIf7h08iUn9mNlnES7pQitOitKOXGk5A.jpg",
    fullName: "Sangar Mawlood",
    authorImage: undefined,
    authorBio: "Psychologist, Author",
  },
  {
    id: 3,
    title: "The Importance of Staying Calm for Better Well-being",
    description:
      "Explore how staying calm can improve your overall well-being.",
    src: "https://images.pexels.com/photos/9002742/pexels-photo-9002742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fullName: "Rawand Ranjdar",
    authorImage:
      "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    authorBio: "Innovator",
  },
  {
    id: 4,
    title: "Exploring the Effects of Loneliness on Mental Health",
    description:
      "Understand the impact of loneliness on mental health and ways to combat it.",
    src: "https://tse1.mm.bing.net/th/id/OIG1.KwznMBY4NglXceoosm2u?pid=ImgGn",
    fullName: "Karim Abadulla",
    authorImage:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    authorBio: "Psychologist, Author",
  },
  {
    id: 5,
    title: "The Joy of Coding and Its Endless Possibilities",
    description:
      "Dive into the world of coding and discover how it can unlock endless possibilities.",
    src: "https://tse4.mm.bing.net/th/id/OIG3.AkxPxsozuQr7CoBPgUoe?pid=ImgGn",
    fullName: "Abdlbarry Qaisar",
    authorImage: undefined,
    authorBio: "Software Developer, Educator",
  },
];
