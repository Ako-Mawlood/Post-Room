export type blogType = {
  id: number
  blogId: string
  title: string
  content: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  categories: {
    id: number
    categoryId: number
    blogId: number
    category: {id: number; name: string; createdAt: string}
  }[]
  _count: {
    stars: number
  }
}
