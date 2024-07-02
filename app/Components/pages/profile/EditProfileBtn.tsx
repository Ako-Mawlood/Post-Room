"use client"

import {usePathname, useRouter} from "next/navigation"
import {Button} from "../../ui/button"

const EditProfileBtn = ({searchParams}: any) => {
  const router = useRouter()
  const pathname = usePathname()
  const handleModalToggle = () => {
    const params = new URLSearchParams(searchParams)
    if (params.get("edit") === "t") {
      params.delete("edit")
    } else {
      params.append("edit", "t")
    }
    router.push(pathname + "?" + params.toString(), {scroll: false})
  }
  return (
    <Button onClick={handleModalToggle} variant="outline" className="absolute right-6 bottom-4">
      Edit Profile
    </Button>
  )
}

export default EditProfileBtn
