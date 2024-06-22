import {useQuery} from "@tanstack/react-query"
import axios from "../../../../libs/axios"

function getSavedBLogs() {
  return axios.get("/api/list", {headers: {Authorization: localStorage.getItem("token")}})
}
const SavedBlogsList = () => {
  const {
    data: savedBlogs,
    isPending,
    isError,
    error,
  } = useQuery({queryKey: ["savedBlogs"], queryFn: getSavedBLogs})

  return (
    <div>
      {isPending && <span>Loading...</span>}
      {savedBlogs && <span>savedBlogsArived</span>}
      {isError && <span>{error.message}</span>}
    </div>
  )
}

export default SavedBlogsList
