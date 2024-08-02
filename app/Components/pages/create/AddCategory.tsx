"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { backgroundColors } from "@/constants/backgroundColors";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { X as Remove } from "lucide-react";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { createBlogSchema } from "@/libs/validations";

type formDataType = z.infer<typeof createBlogSchema>;

type AddCategoryProps = {
  form: UseFormReturn<formDataType>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

const AddCategory = ({
  form,
  selectedCategories,
  setSelectedCategories,
}: AddCategoryProps) => {
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
        setSelectedCategories([
          ...selectedCategories,
          addCategoryInputValue.trim(),
        ]);
        setAddCategoryInputValue("");
      }
    } else if (category !== "") {
      if (!selectedCategories.includes(category)) {
        setSelectedCategories([...selectedCategories, category]);
      }
      setAddCategoryInputValue("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => category !== c));
  };

  const handleFocus = () => {
    setIsAddCategoryInputOnFocus(true);
  };

  const handleUpdateCategory = (e: any, index: number) => {
    const updatedCategory = e.target.value.replace(/^#\s*/, "");
    if (updatedCategory.trim() !== "") {
      const updatedCategories = [...selectedCategories];
      updatedCategories[index] = updatedCategory;
      setSelectedCategories(updatedCategories);
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
  }, [selectedCategories, editingCategoryIndex]);

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
      <div className="flex">
        <ul className="flex flex-wrap items-center">
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
              "ml-1 w-auto bg-transparent placeholder-muted-foreground outline-none",
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
                className="flex h-0 w-full flex-col text-start hover:bg-muted"
              >
                <div className="flex gap-1">
                  <span
                    style={{
                      color: `rgb(${backgroundColors[index % 6]},0.9)`,
                    }}
                  >
                    #
                  </span>
                  <span>{category?.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione saepe consequuntur nobis veniam, enim omnis sed{" "}
                </p>
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
