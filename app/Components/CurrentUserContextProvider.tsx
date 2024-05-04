"use client"

import { createContext, useState, useEffect } from 'react'
import { getCurrentUser } from '@/libs/auth'
import { currentUserType } from '../Types/currentUserType'
export const currentUserContext = createContext<currentUserType>(null)
const CurrentUserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType>(null)

    useEffect(() => {
        getCurrentUser().then((user: currentUserType) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <currentUserContext.Provider value={currentUser}  >
            {children}
        </currentUserContext.Provider>
    )
}

export default CurrentUserContextProvider;