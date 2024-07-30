import {currentUserType} from "@/app/types/currentUserType"
import {getCurrentUser} from "./getCurrentUser"

export async function isMe(userId: number,token:string) {
  const currentUser: currentUserType = await getCurrentUser(token)
  return currentUser ? currentUser.id === userId : false
}
