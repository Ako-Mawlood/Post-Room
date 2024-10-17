import React, { useEffect, useState } from "react";
import { CreateBlogType } from "../types/CreateBlogType";

const useDebounceBlogData = (blogData: CreateBlogType, delay: number) => {
  const [debouncedBlogData, setDebouncedBlogData] = useState(blogData);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBlogData(blogData);
    }, delay);

    return () => clearTimeout(handler);
  }, [blogData, delay]);
  return debouncedBlogData;
};

export default useDebounceBlogData;
