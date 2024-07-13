import {currentUserType} from "@/app/types/currentUserType"
import {getCurrentUser} from "./getCurrentUser"

export async function isMe(userId: number) {
  const currentUser: currentUserType = await getCurrentUser()
  return currentUser ? currentUser.id === userId : false
}
