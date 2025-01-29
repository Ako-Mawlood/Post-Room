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

type Category = { category: { name: string } };

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
        setCategories(response.data.slice(0, 40));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Generate random widths for skeletons
  const getRandomWidth = () => `${Math.floor(Math.random() * (80 - 8) + 90)}px`;

  return (
    <Card className="relative w-full overflow-hidden rounded-xl bg-background pb-4">
      {!loading ? (
        <>
          <CardHeader>
            <CardTitle>Your Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {categories.map((category) => (
                <Button
                  key={category.category.name}
                  variant="secondary"
                  className="m-1 text-sm"
                >
                  <Link href={`/category/${category.category.name}`}>
                    {category.category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Your Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap">
              {Array(15)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="m-1 h-10 animate-pulse rounded-full bg-muted p-2"
                    style={{ width: getRandomWidth() }}
                  />
                ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default UserCategories;
