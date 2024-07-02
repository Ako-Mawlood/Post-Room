type blogPageTypes = {
  params: {blogId: string}
}
const BlogPage = ({params}: blogPageTypes) => {
  return <div>{params.blogId}</div>
}

export default BlogPage
