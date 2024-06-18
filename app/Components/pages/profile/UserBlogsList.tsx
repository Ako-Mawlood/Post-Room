import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "../../ui/card"
import SaveBlogBtn from "../../SaveBlogBtn"

const UserBlogsList = ({user}: {user: any}) => {
  return (
    <div className="flex justify-center flex-wrap gap-10 w-full p-6 mx-auto">
      {user?.blogs.map((blog: any) => {
        return (
          <Card key={blog.id} className="flex flex-col gap-4 w-[30%] p-3">
            <CardContent>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.content}</CardDescription>
              <SaveBlogBtn blogId={blog.id} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default UserBlogsList
