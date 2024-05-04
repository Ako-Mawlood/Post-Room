"use client"

import { createContext, useState, useEffect } from 'react'
import { getCurrentUser } from '@/libs/auth'
import { currentUserType } from '../Types/currentUserType'
export const CurrentUserContex = createContext<undefined | currentUserType>(undefined)
const CurrentUserContext = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType>(null)
    useEffect(() => {
        getCurrentUser().then((user: currentUserType) => {
            setCurrentUser(user)
        })
    }, [])
    return (
        <CurrentUserContex.Provider value={currentUser}  >
            {children}
        </CurrentUserContex.Provider>
    )
}

export default CurrentUserContext