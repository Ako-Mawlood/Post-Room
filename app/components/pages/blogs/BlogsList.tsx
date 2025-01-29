import { blogType } from "@/app/types/blogType";
import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";
import Trigger from "@/app/components/shared/Trigger";
import BlogCard from "@/app/components/ui/BlogCard";
import { Dispatch, SetStateAction } from "react";

type Props = {
  blogs: blogType[];
  isFetching: boolean;
  hasReachedEnd: boolean;
  setSkip: Dispatch<SetStateAction<number>>;
};

const BlogsList = ({ blogs, isFetching, hasReachedEnd, setSkip }: Props) => (
  <section className="flex min-h-[200vh] w-full flex-col items-center gap-5">
    {blogs.length === 0 && isFetching && (
      <>
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </>
    )}

    {blogs.length !== 0 && (
      <>
        {blogs.map((blog: blogType) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            author={blog.author.fullname}
            authorImageUrl={blog.author.imageUrl}
            blogId={blog.blogId}
            blogImageUrl={blog.imageUrl}
            categories={blog.categories}
            content={blog.content}
            createdAt={blog.createdAt}
            stars={blog._count.stars}
            username={blog.author.username}
            isSaved={blog.saved}
            isDraft={false}
          />
        ))}
        {hasReachedEnd && !isFetching && (
          <p className="my-20 text-center font-sans text-lg">
            🚀 Whoa, you&apos;ve reached the end!
          </p>
        )}
        {isFetching && (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        )}
        {!hasReachedEnd && !isFetching && blogs.length !== 0 && (
          <Trigger setSkip={setSkip} />
        )}
      </>
    )}
  </section>
);

export default BlogsList;
