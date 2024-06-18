"use client"
import {useEffect} from "react"
import axios from "../../../libs/axios"
import {useRouter} from "next/navigation"
const page = ({params: {activateToken}}: {params: {activateToken: string}}) => {
  const router = useRouter()
  useEffect(() => {
    axios.post(`/api/activate/${activateToken}`, {headers: {authorization: activateToken}}).then((res) => {
      router.push("/account-setup")
    })
  }, [])
  return <div className="flex justify-center items-center w-full h-screen text-3xl">Verifing...</div>
}

export default page
