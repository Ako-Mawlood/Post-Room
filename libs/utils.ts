import { Editor } from "@tiptap/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months >= 1) {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  } else if (days >= 1) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds < 60) {
    return "just now";
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

export function getInitials(fullName: string = ""): string {
  if (!fullName) return "";
  const words = fullName.split(" ");

  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return initials;
}

export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes < 1 ? 1 : minutes} min read`;
}
export const sanitizeContent = (content: string): string => {
  return content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*{1,2}|~{2})(.*?)\1/g, "$2")
    .replace(/\[([^\]]+)]\([^\)]+\)/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\$+.*?\$+/g, "")
    .replace(/^>\s+/gm, "")
    .replace(/^([-*+]|\d+\.)\s+/gm, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
};
