"use client";

import axiosInstance from "@/libs/axiosInstance";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CiBellOn as Notification } from "react-icons/ci";
import { getCookie } from "cookies-next";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDate, getInitials } from "@/libs/utils";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ImSpinner8 as Spinner } from "react-icons/im";
import Image from "next/image";
import { LuDot as Dot } from "react-icons/lu";

type NotificationType = {
  id: number;
  blog: {
    id: number;
    blogId: string;
    imageUrl: string;
  };
  createdAt: string;
  seen: boolean;
};
const NotificationLog = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNotificationLogOpened, setIsNotificationLogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isNotificationLogOpened) {
      setNotificationCount(0);
      axiosInstance.patch(
        "/api/notification",
        {},
        { headers: { Authorization: getCookie("token") } },
      );
    }
  }, [isNotificationLogOpened]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance("/api/notification", {
      headers: { Authorization: getCookie("token") },
    })
      .then((res) => {
        setNotifications(res.data);
        setNotificationCount(
          res.data.filter(
            (notification: NotificationType) => notification.seen == false,
          ).length,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Popover
      open={isNotificationLogOpened}
      onOpenChange={setIsNotificationLogOpened}
    >
      <PopoverTrigger className="relative flex items-center rounded-full p-2 hover:bg-muted">
        <div
          className={clsx(
            "absolute flex items-center justify-center rounded-full bg-red-500 text-xs text-white",
            {
              hidden: notificationCount === 0,
              "right-2 top-2 size-4": notifications.length < 9,
              "right-1 top-1 size-5": notifications.length >= 9,
            },
          )}
        >
          {notifications.length < 10 ? notificationCount : "9+"}
        </div>
        <Notification size={25} />
      </PopoverTrigger>
      <PopoverContent className="z-50 mr-28 flex max-h-[40rem] w-[30rem] flex-col overflow-auto rounded-xl p-0 text-lg">
        <div className="sticky top-0 z-50 flex w-[30rem] items-center gap-2 border-b bg-card p-2 text-xl font-semibold">
          <Notification size={25} />
          <h1>Notifications</h1>
        </div>
        {isLoading ? (
          <div className="flex h-52 w-full items-center justify-center p-4 text-center">
            <Spinner
              className="animate-spin text-accent-foreground"
              size={40}
            />
          </div>
        ) : notifications.length === 0 ? (
          <p>No notification available</p>
        ) : (
          notifications.map((notification: any) => (
            <div key={notification.id}>
              <Link
                href={`/read/${notification.blog.blogId}`}
                onClick={() => setIsNotificationLogOpened(false)}
                className="flex items-start justify-between gap-4 p-4 hover:bg-muted"
              >
                <div className="relative flex items-center">
                  <Dot
                    className={clsx(
                      "absolute -left-5 top-1/2 z-40 -translate-y-1/2 text-blue-500",
                      {
                        hidden: notification.seen,
                      },
                    )}
                    size={25}
                  />

                  <Avatar className="size-12 p-0">
                    <AvatarImage
                      src={notification.blog.author.imageUrl}
                      alt="author image"
                    />
                    <AvatarFallback>
                      {getInitials(notification.blog.author.fullname)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex w-64 flex-col justify-between">
                  <p className="font-PT text-sm">
                    {notification.blog.author.fullname} published:{" "}
                    {notification.blog.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
                <Image
                  className="h-[66px] w-[128px] rounded-lg"
                  src={
                    notification.blog.imageUrl ||
                    "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
                  }
                  height={150}
                  width={150}
                  alt="Blog cover"
                />
              </Link>
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationLog;
