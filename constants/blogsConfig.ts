interface blogConfigType {
  id: number;
  fullName: string;
  authorBio: string;
  authorImage: string | undefined;
  title: string;
  src: string;
}
export const blogsConfig: blogConfigType[] = [
  {
    id: 1,
    title: "The Rapid Economic Growth of Kurdistan and Its Impact",
    src: "/kurdistan-economic-growth.jpeg",
    fullName: "Mohammed Osman",
    authorImage: undefined,
    authorBio: "Engineer, Writer",
  },
  {
    id: 2,
    title: "The Importance of Sleep for Children's Health",
    src: "/children-sleep-health.webp",
    fullName: "Ehsan Zaid",
    authorImage: "/ehsan.jpg",
    authorBio: "Doctor, Writer",
  },
  {
    id: 0,
    title: "The Prison System: Exploring Its Impact on Society and Inmates",
    src: "/prison-system-impact.webp",
    fullName: "Sangar Mawlood",
    authorImage: "/sangar.jpg",
    authorBio: "Psychologist, Author",
  },
  {
    id: 3,
    title: "The Importance of Staying Calm for Better Well-being",
    src: "/stay-calm.png",
    fullName: "Rawand Ranjdar",
    authorImage: undefined,
    authorBio: "Innovator",
  },
  {
    id: 4,
    title: "Exploring the Effects of Loneliness on Mental Health",
    src: "/effects-of-loneliness.webp",
    fullName: "Karim Abadulla",
    authorImage: undefined,
    authorBio: "Psychologist, Author",
  },
  {
    id: 5,
    title: "The Joy of Coding and Its Endless Possibilities",
    src: "/joy-of-codding.webp",
    fullName: "Abdlbarry Qaisar",
    authorImage: "/abdulbary.jpeg",
    authorBio: "Software Developer",
  },
];
