export default function Blogs({ params }: { params: { userId: string } }) {
  return <div>Blogs of user id: {params.userId}</div>;
}
