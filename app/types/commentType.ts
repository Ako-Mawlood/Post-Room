export type CommentType = {
  id: number;
  blogId: string;
  author: {
    id: number;
    imageUrl: string;
    fullname: string;
    username: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
};
