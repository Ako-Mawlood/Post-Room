"use client";

import { Button } from "@/app/components/ui/button";
import { IoAddOutline as AddIcon } from "react-icons/io5";
import { IoCheckmarkSharp as TrueIcon } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { ImSpinner8 as Spinner } from "react-icons/im";

const CategorySetup = () => {
  const [categories, setCategories] = useState<string[] | undefined>(undefined);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategories = searchParams.getAll("category");
  const token = getCookie("token");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(
        "/api/user/category",
        { categories: selectedCategories },
        {
          headers: { Authorization: token },
        },
      );
    },
    onSuccess: () => {
      router.push("/blogs");
    },
    onError: (err: any) => {
      console.log(err.response.data);
    },
  });

  const handleAddRemoveCategory = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (selectedCategories.includes(value)) {
        params.delete("category", value);
      } else {
        params.append("category", value);
      }
      return params.toString();
    },
    [selectedCategories, searchParams],
  );

  useEffect(() => {
    axiosInstance("/api/category", {
      headers: { Authorization: getCookie("token") },
    }).then((res) => {
      setCategories(res.data);
    });
  }, []);

  if (!categories) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex h-full w-full flex-col md:w-7/12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="font-PT text-2xl text-primary">
          Witch category are you interested in ?
        </h1>
        <p className="text-lg">Choose three or more.</p>
        <section className="mb-20 w-full">
          {categories?.map((category: any, index: number) => {
            return (
              <Button
                key={index}
                onClick={() =>
                  router.push(
                    pathname + "?" + handleAddRemoveCategory(category.name),
                    {
                      scroll: false,
                    },
                  )
                }
                variant={
                  selectedCategories.includes(category.name)
                    ? "default"
                    : "secondary"
                }
                className="m-1 rounded-full"
              >
                <span>{category.name}</span>
                {selectedCategories.includes(category.name) ? (
                  <TrueIcon className="ml-1 duration-300" size={15} />
                ) : (
                  <AddIcon className="ml-1 duration-300" size={15} />
                )}
              </Button>
            );
          })}
        </section>
        <div className="fixed bottom-0 left-0 flex h-20 w-screen items-center justify-center bg-background">
          <Button
            className="w-64"
            disabled={searchParams.size < 4}
            onClick={() => mutate()}
          >
            {isPending ? (
              <Spinner className="animate-spin" />
            ) : (
              <span>Continue</span>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CategorySetup;
