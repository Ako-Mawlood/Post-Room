"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import clsx from "clsx";

type Category = any;
const UserCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/user/categories", {
          headers: { Authorization: getCookie("token") },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card
      className={clsx("relative w-full overflow-hidden bg-background pb-4", {
        "h-fit": isExpanded,
        "max-h-[25rem]": !isExpanded,
      })}
    >
      <CardHeader>
        <CardTitle>Your Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="secondary"
              className="m-1 text-black"
              asChild
            >
              <Link href={`/category/${category.category.name}`}>
                {category.category.name}
              </Link>
            </Button>
          ))}
        </div>
        {categories.length > 14 && (
          <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-white bg-opacity-50 backdrop-blur dark:bg-black">
            <button
              className="w-full justify-start text-sm text-primary"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCategories;
