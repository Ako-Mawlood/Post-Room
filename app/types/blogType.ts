export type blogType = {
  author:{id:number,imageUrl:string,fullname:string,username:string}
  id: number
  blogId: string
  title: string
  content: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  following:boolean
  starred:boolean
  saved:boolean
  categories: {
    id: number
    categoryId: number
    blogId: number
    category: {id: number; name: string; createdAt: string}
  }[]
  _count: {
    stars: number
    comments:any
  }
}
