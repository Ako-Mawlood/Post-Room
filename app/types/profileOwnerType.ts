import {blogType} from "./blogType"
import {currentUserType} from "./currentUserType"

export interface profileOwnerType {
  id: number
  fullname: string
  bio: string
  username: string
  imageUrl: string
  _count: {
    followers: number
    followed: number
  }
  blogs: blogType[]
}
