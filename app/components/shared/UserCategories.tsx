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
  console.log(categories);

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="secondary"
              className="w-full justify-start text-black"
              asChild
            >
              <Link href={`/category/${category.category.name}`}>
                {category.category.name}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCategories;
