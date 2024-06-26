export type blogType = {
  id: number
  blogId: string
  categories: string[]
  title: string
  content: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  _count: {
    stars: number
  }
}
