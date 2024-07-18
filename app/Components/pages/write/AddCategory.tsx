"use client"

import {useState, useEffect, useRef} from "react"
import {Button} from "../../ui/button"
import axiosInstance from "@/libs/axiosInstance"
import {getCookie} from "cookies-next"
import {X as Remove} from "lucide-react"

const AddCategory = ({form, selectedCategories, setSelectedCategories}: any) => {
  const [formValue, setFormValue] = useState("")
  const [categories, setCategories] = useState<string[] | undefined>(undefined)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    axiosInstance("/api/category", {headers: {Authorization: getCookie("token")}}).then(
      (res) => {
        setCategories(res.data)
      }
    )
  }, [])

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingIndex])

  return (
    <div className="flex flex-col items-start justify-start mx-10">
      <div className="flex gap-2">
        <ul className="flex items-center gap-1">
          {selectedCategories.map((category: any, index: number) => {
            return (
              <li
                key={index}
                className="flex items-center gap-1 p-1.5 text-xs rounded-sm"
              >
                {editingIndex === index ? (
                  <input
                    ref={inputRef}
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    onBlur={() => {
                      setSelectedCategories(
                        selectedCategories.map((cat, i) =>
                          i === index ? formValue : cat
                        )
                      )
                      setEditingIndex(null)
                    }}
                    className="text-lg outline-none"
                  />
                ) : (
                  <Button
                    onClick={() => {
                      setFormValue(category)
                      setEditingIndex(index)
                    }}
                    variant="outline"
                    className="flex items-center gap-1 rounded-md"
                  >
                    <span># {category}</span>
                    <Remove
                      type="button"
                      onClick={() =>
                        setSelectedCategories(
                          selectedCategories.filter((c: any) => category !== c)
                        )
                      }
                      className="size-4 text-red-400 duration-150 shadow-inner cursor-pointer"
                    />
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
        <input
          ref={inputRef}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder={
            selectedCategories.length ? "Add another... " : "Add up to 4 tags..."
          }
          className="w-auto ml-2 bg-transparent placeholder-muted-foreground outline-none"
        />
      </div>

      {selectedCategories.length < 5 && (
        <div className="flex flex-col w-[30rem] h-44 p-2 m-5 border shadow-md bg-card rounded-lg overflow-y-scroll">
          <h1 className="font-semibold text-xl border-b p-2">Tags</h1>
          {categories &&
            categories.map((category: any, index: number) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategories([...selectedCategories, category?.name])
                  }}
                  className="flex flex-col text-start h-auto w-full p-4 hover:bg-muted"
                >
                  <span className="text-blue-400"># {category?.name}</span>
                  <p className="text-xs text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione saepe
                    consequuntur nobis veniam, enim omnis sed{" "}
                  </p>
                </button>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default AddCategory
