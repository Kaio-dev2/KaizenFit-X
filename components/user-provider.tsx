"use client"

import { createContext, useContext, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string | null
}

interface UserContextType {
  user: User
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ 
  children, 
  user 
}: { 
  children: ReactNode
  user: User 
}) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
