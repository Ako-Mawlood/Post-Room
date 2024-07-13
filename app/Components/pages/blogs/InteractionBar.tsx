import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/app/Components/ui/avatar"
import {Button} from "@/app/Components/ui/button"
import {LuMessageCircle as CommentIcon} from "react-icons/lu"
import FollowBtn from "@/app/Components/pages/blogs/FollowBtn"
import StarBtn from "@/app/Components/pages/blogs/StarBtn"
import SaveBtn from "@/app/Components/pages/blogs/SaveBtn"
import ShareBtn from "@/app/Components/pages/blogs/ShareBtn"
import {getInitials} from "@/libs/utils"

type BlogMetaProps = {
  blog: {
    author: {
      username: string
      fullname: string
      imageUrl: string
      id: number
    }
    following: boolean
    blogId: string
    starred: boolean
    _count: {
      stars: number
      comments: number
    }
    saved: boolean
  }
  isMyBlog: boolean
}

const BlogMeta = ({blog, isMyBlog}: BlogMetaProps) => {
  return (
    <section className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Link href={`/@${blog.author.username}`}>
          <Avatar>
            <AvatarFallback>{getInitials(blog.author.fullname)}</AvatarFallback>
            <AvatarImage src={blog.author.imageUrl} />
          </Avatar>
        </Link>
        <Link
          href={`/@${blog.author.username}`}
          className="text-xs font-semibold hover:underline"
        >
          {blog.author.fullname}
        </Link>
        <FollowBtn
          isFollowed={blog.following}
          username={blog.author.username}
          isMyBlog={isMyBlog}
        />
      </div>

      <div className="flex items-center gap-2">
        <StarBtn
          blogId={blog.blogId}
          isStarred={blog.starred}
          starCount={blog._count.stars}
        />
        <Button size="sm" variant="outline">
          <CommentIcon size={20} />
          <span>{blog._count.comments}</span>
        </Button>
        <SaveBtn isSaved={blog.saved} blogId={blog.blogId} isMyBlog={isMyBlog} />
        <ShareBtn blogId={blog.blogId} />
      </div>
    </section>
  )
}

export default BlogMeta
