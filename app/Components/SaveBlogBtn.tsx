import {useMutation} from "@tanstack/react-query"
import axios from "../../libs/axios"
import {IoBookmarkOutline as BookmarkIcon} from "react-icons/io5"
import {useEffect, useState} from "react"
import useCheckIsBlogSaved from "../Hooks/useCheckIsBlogSaved"
const SaveBlogBtn = ({blogId}: {blogId: string}) => {
  const [token, setToken] = useState<string | null>(null)
  const {data} = useCheckIsBlogSaved()
  console.log({data})
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }
  }, [])

  function handleSaveBlog() {
    if (!token) {
      throw new Error("No token found")
    }
    return axios.post(
      `/api/list/blog/${blogId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
  }

  const {mutate: addToSavedBlogs} = useMutation({
    mutationFn: handleSaveBlog,
  })
  return (
    <BookmarkIcon
      onClick={() => {
        addToSavedBlogs()
      }}
      className="size-5 mr-2 cursor-pointer"
    />
  )
}

export default SaveBlogBtn
