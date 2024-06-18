import {IoBookmarkOutline as BookmarkIcon} from "react-icons/io5"
const SaveBlogBtn = ({blogId}: {blogId: number}) => {
  async function handleSaveBlog() {}
  return <BookmarkIcon onClick={handleSaveBlog} className="size-4 mr-2 cursor-pointer" />
}

export default SaveBlogBtn
