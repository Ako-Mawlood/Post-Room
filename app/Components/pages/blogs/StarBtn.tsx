"use client"

import {Button} from "../../ui/button"
import {LuStar as StarIcon} from "react-icons/lu"
import {GoStarFill as StaredIcon} from "react-icons/go"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {useState, useCallback} from "react"

type starBtnPropsType = {
  isStarred: boolean
  starCount: number
  blogId: string
}
const StarBtn = ({isStarred, starCount, blogId}: starBtnPropsType) => {
  const [isBlogStarred, setIsBlogStarred] = useState(isStarred)
  const [blogStarCount, setBlogStarCount] = useState(starCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleStar = useCallback(async () => {
    setIsLoading(true)
    setIsBlogStarred(true)
    setBlogStarCount((prevCount) => prevCount + 1)
    try {
      await axiosInstance.post(
        `/api/blog/star/${blogId}`,
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      )
    } catch (err) {
      setIsBlogStarred(false)
      setBlogStarCount((prevCount) => prevCount - 1)
    } finally {
      setIsLoading(false)
    }
  }, [blogId])

  const handleUnStar = useCallback(async () => {
    setIsLoading(true)
    setIsBlogStarred(false)
    setBlogStarCount((prevCount) => prevCount - 1)
    try {
      await axiosInstance.delete(`/api/blog/star/${blogId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      })
    } catch (err) {
      setIsBlogStarred(true)
      setBlogStarCount((prevCount) => prevCount + 1)
    } finally {
      setIsLoading(false)
    }
  }, [blogId])

  return (
    <Button
      onClick={isBlogStarred ? handleUnStar : handleStar}
      size="sm"
      variant="outline"
      disabled={isLoading}
      className="disabled:opacity-100"
    >
      {isBlogStarred ? <StaredIcon size={20} /> : <StarIcon size={20} />}
      <span>{blogStarCount}</span>
    </Button>
  )
}

export default StarBtn
