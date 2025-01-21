"use client";

import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";

import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Skeleton } from "@/app/components/ui/skeleton";
import FollowBtn from "../pages/read/FollowBtn";
import { getInitials } from "@/libs/utils";
import FollowProvider from "@/app/providers/FollowProvider";

const mockUsersToFollow = [
  {
    id: "1",
    fullName: "Ako Mawlood",
    username: "ako.mawlood.othman",
    profileImage: "https://via.placeholder.com/150",
    bio: "Software developer with a passion for open-source.",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    username: "janesmith",
    profileImage: "/images/authors/abdulbary.jpeg",
    bio: "UX/UI designer who loves creating intuitive user experiences.",
  },
  {
    id: "3",
    fullName: "Michael Johnson",
    username: "michaeljohnson",
    profileImage: "https://via.placeholder.com/150",
    bio: "Data scientist specializing in machine learning.",
  },
  {
    id: "4",
    fullName: "Emily Davis",
    username: "emilydavis",
    profileImage: "/images/authors/ehsan.jpg",
    bio: "Digital marketer helping brands grow online.",
  },
  {
    id: "5",
    fullName: "David Brown",
    username: "davidbrown",
    profileImage: "/images/authors/sangar.jpg",
    bio: "Cybersecurity enthusiast and ethical hacker.",
  },
];

const WhoToFollow = () => {
  const [usersToFollow, setUsersToFollow] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookie("token");

        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const res = await axiosInstance.get("/api/user/follow", {
          headers: { Authorization: token },
        });

        setUsersToFollow(res.data);
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch users to follow",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Who to Follow</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="mb-4 flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (false) {
    return (
      <Card className="rounded-xl bg-red-50 text-red-800">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl bg-neutral-50 text-neutral-800">
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {(usersToFollow.length > 0 ? usersToFollow : mockUsersToFollow).map(
            (user: any) => (
              <FollowProvider
                key={user.id}
                defaultFollowedUsers={{ [user.id]: false }}
              >
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.profileImage}
                        alt={user.fullName}
                      />
                      <AvatarFallback>
                        {getInitials(user.fullName || "Anonymous")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/@${user.username}`}
                        className="font-semibold hover:underline"
                      >
                        {user.fullName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        @{user.username}
                      </p>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                  <FollowBtn username={user.username} userId={user.id} />
                </li>
              </FollowProvider>
            ),
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;
