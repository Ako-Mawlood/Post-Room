import {useMutation} from "@tanstack/react-query"
import axios from "../../libs/axiosInstance"
import {IoBookmarkOutline as BookmarkIcon} from "react-icons/io5"
import {useEffect, useState} from "react"
const SaveBlogBtn = ({blogId}: {blogId: string}) => {
  return <BookmarkIcon onClick={() => {}} className="size-5 mr-2 cursor-pointer" />
}

export default SaveBlogBtn
