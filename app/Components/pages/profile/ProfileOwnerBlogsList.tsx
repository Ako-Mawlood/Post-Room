import BlogCard from "../../ui/BlogCard";
import noBlogVector from "@/public/assets/no-blog.png";
import Image from "next/image";
import { profileOwnerType } from "@/app/types/profileOwnerType";

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
      <div className="mb-7 flex flex-col items-center justify-center opacity-85 dark:opacity-70">
        <Image src={noBlogVector} width={0} height={250} alt="No blog vector" />
        <h1 className="text-center font-PT text-4xl font-semibold">
          No blogs yet.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 p-6 md:justify-start">
      {profileOwner.blogs.map((blog: profileBlogType) => (
        <div className="h-52 w-full md:w-4/5 lg:w-[47%]">
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
            isDraft={true}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileUserBlogsList;
