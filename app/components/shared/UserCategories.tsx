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

type Category = any;
const UserCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/user/categories", {
          headers: { Authorization: getCookie("token") },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card className="relative max-h-[25rem] w-full overflow-hidden rounded-xl bg-background pb-4">
      {!loading ? (
        <>
          <CardHeader>
            <CardTitle>Your Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {categories.map((category) => (
                <button
                  key={category.category.name}
                  className="m-1 truncate rounded-full bg-secondary px-2 py-1 text-xs"
                >
                  <Link href={`/category/${category.category.name}`}>
                    {category.category.name}
                  </Link>
                </button>
              ))}
            </div>
            {categories.length > 14 && (
              <div className="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center bg-white bg-opacity-50 backdrop-blur dark:bg-black">
                <Button
                  variant="link"
                  className="w-full justify-center text-sm text-primary"
                >
                  <Link href="/category">See more</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </>
      ) : (
        <div>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Button
                className="m-1 w-20"
                key={index}
                variant="secondary"
                size="sm"
              ></Button>
            ))}
        </div>
      )}
    </Card>
  );
};

export default UserCategories;
