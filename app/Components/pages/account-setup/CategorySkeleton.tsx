import {categories} from "@/StaticData/categories"
import {Button} from "../../ui/button"
import {Skeleton} from "../../ui/skeleton"

const CategorySkeleton = () => {
  return (
    <div className="w-full flex items-center justify-center flex-wrap">
      {categories.map((category: string, index) => (
        <Skeleton key={index} className="rounded-full m-1">
          <Button className="text-transparent bg-gray-500">{category}</Button>
        </Skeleton>
      ))}
    </div>
  )
}

export default CategorySkeleton
