"use client"

import {createContext, useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import axios from "../../libs/axios"
import {currentUserType} from "../types/currentUserType"

export const CurrentUserContext = createContext<currentUserType | null>(null)
export const CurrentUserProvider = ({children}: {children: React.ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(null)
  useEffect(() => {
    axios("/api/me", {headers: {Authorization: localStorage.getItem("token")}}).then((res) => {
      setCurrentUser(res.data)
    })
  }, [])

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}

export default CurrentUserProvider
