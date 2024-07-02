import {blogType} from "./blogType"
import {currentUserType} from "./currentUserType"

export interface profileOwnerType extends currentUserType {
  imageUrl: string
  bio: string
  _count: {followers: number; following: number}
  blogs: blogType[]
}
