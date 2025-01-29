"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { X as Remove } from "lucide-react";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { createBlogSchema } from "@/libs/validations";
import { CreateBlogType } from "@/app/types/CreateBlogType";

type formDataType = z.infer<typeof createBlogSchema>;

type Props = {
  form: UseFormReturn<formDataType>;
  blogData: CreateBlogType;
  setBlogData: Dispatch<SetStateAction<CreateBlogType>>;
};

const AddCategory = ({
  form,
  blogData: { selectedCategories },
  setBlogData,
}: Props) => {
  const [addCategoryInputValue, setAddCategoryInputValue] = useState("");
  const [isAddCategoryInputOnFocus, setIsAddCategoryInputOnFocus] =
    useState(false);
  const [categories, setCategories] = useState<{ name: string }[] | undefined>(
    undefined,
  );
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingInputValue, setEditingInputValue] = useState("");
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<
    number | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const editingInputRef = useRef<HTMLInputElement>(null);

  //Filtering categories depending of addCategoryInputValue state.
  const filteredCategories = categories?.filter((category) => {
    if (addCategoryInputValue === "")
      return !selectedCategories.includes(category.name);
    return (
      category.name
        .toLowerCase()
        .includes(addCategoryInputValue.toLowerCase()) &&
      !selectedCategories.includes(category.name)
    );
  });

  const handleAddCategory = (e: any, category: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Enter" && addCategoryInputValue.trim() !== "") {
      if (!selectedCategories.includes(addCategoryInputValue)) {
        setBlogData((prev) => ({
          ...prev,
          selectedCategories: [
            ...selectedCategories,
            addCategoryInputValue.trim(),
          ],
        }));
        setAddCategoryInputValue("");
      }
    } else if (category !== "") {
      if (!selectedCategories.includes(category)) {
        setBlogData((prev) => ({
          ...prev,
          selectedCategories: [...selectedCategories, category],
        }));
      }
      setAddCategoryInputValue("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setBlogData((prev) => ({
      ...prev,
      selectedCategories: selectedCategories.filter((c) => category !== c),
    }));
  };

  const handleFocus = () => {
    setIsAddCategoryInputOnFocus(true);
  };

  const handleUpdateCategory = (e: any, index: number) => {
    e.stopPropagation();
    const updatedCategory = e.target.value.replace(/^#\s*/, "");
    if (updatedCategory.trim() !== "") {
      const updatedCategories = [...selectedCategories];
      updatedCategories[index] = updatedCategory;
      setBlogData((prev) => ({
        ...prev,
        selectedCategories: updatedCategories,
      }));
    }
    setIsEditing(false);
    setEditingCategoryIndex(null);
  };

  useEffect(() => {
    axiosInstance("/api/category", {
      headers: { Authorization: getCookie("token") },
    }).then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (editingInputRef.current) {
      editingInputRef.current.focus();
    }
    if (selectedCategories.length >= 4) {
      setIsAddCategoryInputOnFocus(false);
    }
    form.setValue("categories", selectedCategories);
  }, [selectedCategories, editingCategoryIndex, form]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsAddCategoryInputOnFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start">
      <div className="flex flex-col gap-1 md:flex-row">
        <ul className="order-2 flex flex-wrap items-center md:order-1">
          {selectedCategories.map((category, index: number) => (
            <li key={index} className="flex items-center rounded-sm p-1">
              <div
                onClick={() => editingInputRef.current?.focus()}
                className="flex w-fit items-center rounded-lg border dark:border-gray-700"
              >
                {isEditing && editingCategoryIndex === index ? (
                  <input
                    ref={editingInputRef}
                    value={`# ${editingCategory}`}
                    onChange={(e) =>
                      setEditingCategory(e.target.value.replace(/^#\s*/, ""))
                    }
                    onBlur={(e) => handleUpdateCategory(e, index)}
                    className="text-md h-8 bg-transparent text-xs outline-none"
                  />
                ) : (
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setIsEditing(true);
                      setEditingCategoryIndex(index);
                    }}
                    type="button"
                    className="h-8 rounded-lg px-1 text-xs"
                  >
                    # {category}
                  </button>
                )}
                <Remove
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="mr-2 size-4 cursor-pointer"
                />
              </div>
            </li>
          ))}
        </ul>
        {selectedCategories.length < 4 && (
          <input
            ref={inputRef}
            onChange={(e) => {
              setAddCategoryInputValue(e.target.value.split(" ").join(""));
              setEditingInputValue(e.target.value.split(" ").join(""));
            }}
            onFocus={handleFocus}
            value={addCategoryInputValue}
            onKeyDown={(e) => handleAddCategory(e, "")}
            placeholder={
              selectedCategories.length
                ? "Add another... "
                : "Add up to 4 tags..."
            }
            className={clsx(
              "order-1 ml-1 bg-transparent placeholder-muted-foreground outline-none md:order-2",
              { hidden: selectedCategories.length >= 4 },
            )}
          />
        )}
      </div>

      {isAddCategoryInputOnFocus && selectedCategories.length < 4 && (
        <div
          ref={categoriesRef}
          className="modal-open-animation flex h-52 w-full flex-col overflow-y-scroll rounded-lg border bg-card p-2 shadow-md dark:bg-neutral-900"
        >
          <h1 className="border-b p-2 text-xl font-semibold">Tags</h1>
          {filteredCategories?.length ? (
            filteredCategories.map((category, index: number) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  handleAddCategory(e, category?.name);
                  if (inputRef) inputRef.current?.focus();
                }}
                className="flex h-20 w-full flex-col p-2 text-start hover:bg-muted hover:text-violet-600"
              >
                <div className="flex gap-1">
                  <span className="text-violet-600">#</span>
                  <span>{category?.name}</span>
                </div>
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={(e) => {
                handleAddCategory(e, editingInputValue);
                if (inputRef) inputRef.current?.focus();
              }}
              className="flex h-auto w-full flex-col p-4 text-start hover:bg-muted"
            >
              <span># {editingInputValue}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddCategory;
