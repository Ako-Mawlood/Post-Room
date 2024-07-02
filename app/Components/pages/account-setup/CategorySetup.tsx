"use client"

import {categories} from "@/StaticData/categories"
import {Button} from "../../ui/button"
import {IoAddOutline as AddIcon} from "react-icons/io5"
import {IoCheckmarkSharp as TrueIcon} from "react-icons/io5"
import {Suspense, useCallback} from "react"
import {useSearchParams, useRouter, usePathname} from "next/navigation"
import {Skeleton} from "../../ui/skeleton"

const CategorySetup = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selectedCategories = searchParams.getAll("category")
  const handleAddRemoveCategory = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      if (selectedCategories.includes(value)) {
        params.delete("category", value)
      } else {
        params.append("category", value)
      }
      return params.toString()
    },
    [selectedCategories]
  )

  return (
    <main className="flex flex-col h-full w-full md:w-7/12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-primary text-2xl font-PT">Witch category are you intrested in ?</h1>
        <p className="text-lg">Choose three or more.</p>
        <Suspense fallback={<Skeleton />}>
          <section className="w-full mb-20">
            {categories.map((category, index) => {
              return (
                <Button
                  key={index}
                  onClick={() =>
                    router.push(pathname + "?" + handleAddRemoveCategory(category), {scroll: false})
                  }
                  variant={selectedCategories.includes(category) ? "default" : "secondary"}
                  className="m-1 rounded-full"
                >
                  <span>{category}</span>
                  {selectedCategories.includes(category) ? (
                    <TrueIcon className="ml-1 duration-300" size={15} />
                  ) : (
                    <AddIcon className="ml-1 duration-300" size={15} />
                  )}
                </Button>
              )
            })}
          </section>
        </Suspense>
        <div className="flex justify-center items-center w-screen fixed bottom-0 left-0 bg-background h-20">
          <Button className=" w-64" disabled={searchParams.size < 4}>
            Continue
          </Button>
        </div>
      </div>
    </main>
  )
}

export default CategorySetup
