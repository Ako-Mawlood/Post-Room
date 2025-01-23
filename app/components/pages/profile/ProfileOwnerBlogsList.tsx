import BlogCard from "../../ui/BlogCard";
import blogBlack from "@/public/assets/blogBlack.svg";
import blogWhite from "@/public/assets/blogWhite.svg";
import Image from "next/image";
import { profileOwnerType } from "@/app/types/profileOwnerType";
import DeleteBlogBtn from "../read/DeleteBlogBtn";

type profileOwnerBlogsListProps = {
  profileOwner: profileOwnerType;
};

type profileBlogType = {
  id: number;
  blogId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  categories: {
    id: number;
    categoryId: number;
    blogId: number;
    category: { id: number; name: string; createdAt: string };
  }[];
  _count: {
    stars: number;
  };
};

const ProfileUserBlogsList = ({ profileOwner }: profileOwnerBlogsListProps) => {
  if (!profileOwner || profileOwner.blogs.length === 0) {
    return (
      <div className="mb-7 flex flex-col items-center justify-center">
        <div className="my-10 w-72">
          <Image
            src={blogWhite}
            className="hidden dark:block"
            width={0}
            height={250}
            alt="No blog vector"
          />
          <Image
            src={blogBlack}
            className="dark:hidden"
            width={0}
            height={250}
            alt="No blog vector"
          />
        </div>
        <h1 className="text-center font-PT text-4xl font-semibold">
          No blogs yet.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 p-6">
      {profileOwner.blogs.map((blog: profileBlogType) => (
        <div key={blog.id} className="relative w-full md:w-[43rem] lg:w-[45%]">
          <BlogCard
            author={profileOwner.fullname}
            authorId={profileOwner.id}
            authorImageUrl={profileOwner.imageUrl}
            blogId={blog.blogId}
            blogImageUrl={blog.imageUrl}
            categories={blog.categories}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
            stars={blog._count.stars}
            username={profileOwner.username}
            //TODO:for now false change it later
            isSaved={false}
            isDraft={false}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileUserBlogsList;
