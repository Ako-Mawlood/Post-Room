import { useEffect, useState } from "react";
import { blogType } from "../types/blogType";
import { getBlogs } from "@/libs/getBlogs";

const useBlogFetcher = (baseUrl: string) => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNewBlogs() {
      try {
        const URL = `${baseUrl}skip=${skip}`;
        setIsLoading(true);
        const fetchedBlogs: blogType[] = await getBlogs(URL);
        console.log(fetchedBlogs);
        if ((fetchedBlogs.length = 0)) {
          setHasReachedEnd(true);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...fetchedBlogs]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNewBlogs();
  }, [skip]);

  return {
    skip,
    setSkip,
    hasReachedEnd,
    setHasReachedEnd,
    blogs,
    setBlogs,
    isLoading,
  };
};

export default useBlogFetcher;
