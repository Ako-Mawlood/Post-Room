import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/app/Components/ui/tabs"
import Sheet from "../../Components/pages/write/Sheet"
import axiosInstance from "@/libs/axiosInstance"
import Link from "next/link"
import {CgEricsson as Logo} from "react-icons/cg"
import {getCookie} from "cookies-next"
import {cookies} from "next/headers"

async function getBlog(blogId: string) {
  try {
    const res = await axiosInstance(`/api/blog/${blogId}`, {
      headers: {
        Authorization: getCookie("token", {cookies}),
      },
    })
    return res.data
  } catch (err: any) {
    console.log("error", err.response.data)
  }
}

const WritePage = async ({params}: {params: {blogId: string}}) => {
  const blog = await getBlog(params.blogId)
  console.log(blog)
  return (
    <>
      <nav className="flex items-center gap-1 m-3 text-primary font-bold">
        <Link href="/blogs" className="text-md sm:text-2xl">
          <Logo size={35} />
        </Link>
        <h1 className="text-xl">Create</h1>
      </nav>
      <div className="w-8/12 mx-auto mt-10">
        <Tabs defaultValue="write">
          <TabsList className="bg-transparent">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Sheet blog={blog} params={params} />
          </TabsContent>
          <TabsContent value="preview">content</TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default WritePage
