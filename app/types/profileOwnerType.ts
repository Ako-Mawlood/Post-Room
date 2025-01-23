import { blogType } from "./blogType";

export type profileOwnerType = {
  id: number;
  fullname: string;
  bio: string;
  username: string;
  imageUrl: string;
  _count: {
    followers: number;
    followed: number;
  };
  blogs: blogType[];
};
