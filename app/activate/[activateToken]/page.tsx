"use client"

import axios from "../../../libs/axiosInstance"
import {useRouter} from "next/navigation"
import {useMutation} from "@tanstack/react-query"
import {useEffect} from "react"
const page = ({params: {activateToken}}: {params: {activateToken: string}}) => {
  const router = useRouter()
  const {
    mutate: handleActivateToken,
    error,
    isPending,
  } = useMutation({
    mutationFn: () => axios.post(`/api/activate/${activateToken}`, {headers: {authorization: activateToken}}),
    onSuccess: () => router.push("/account-setup"),
  })
  useEffect(() => {
    handleActivateToken()
  }, [])
  return (
    <div className="flex justify-center items-center w-full h-screen text-3xl">
      {isPending && <span>Verifing...</span>}
      {error && (
        <div className="flex flex-col gap-2 text-center">
          <span className="text-red-600">Couldn't verify...</span>
          <span className="text-center p-2 text-xl">please refresh or try again later</span>
        </div>
      )}
    </div>
  )
}

export default page
