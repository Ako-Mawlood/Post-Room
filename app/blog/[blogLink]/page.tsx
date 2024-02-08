export default function Blog({ params }: { params: { blogLink: string } }) {
  return <div>Blog {params.blogLink}</div>;
}
