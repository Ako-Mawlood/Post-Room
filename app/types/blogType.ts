export type blogType = {
  id: number
  blogId: string
  title: string
  content: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  categories: string[]
  _count: {
    stars: number
  }
}
