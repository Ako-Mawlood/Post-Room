"use client";

import { CiSearch as SearchIcon } from "react-icons/ci";
import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import RecentSearchList from "./RecentSearchList";

type RecentSearchesType = {
  id: number;
  content: string;
};

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState<string | null>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearchesType[]>(
    [],
  );
  const params = new URLSearchParams(window.location.search);
  const queryUrl = params.get("q");

  useEffect(() => {
    if (pathname.startsWith("/search")) {
      setQuery(queryUrl);
    } else {
      setQuery("");
    }
  }, [pathname, queryUrl]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }

    if (query) {
      // Update recent searches
      setRecentSearches((prevSearches) => {
        const searchesCopy = [...prevSearches];
        searchesCopy.pop(); // Remove the last element
        return [{ id: Date.now(), content: query }, ...searchesCopy]; // Add the new search entry
      });

      // Set the URL parameter and navigate
      params.set("q", query);
      router.push(`/search?${params.toString()}`);
    }
    setIsPopoverOpen(false);
  };

  async function getRecentSearches() {
    try {
      const res = await axiosInstance("api/search/recent", {
        headers: { Authorization: getCookie("token") },
      });
      setRecentSearches(res.data);
    } catch (err: any) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    getRecentSearches();
  }, []);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <div className="relative flex w-32 flex-col gap-2 md:w-72">
        <form
          onSubmit={handleSearch}
          className="flex w-full items-center gap-2 rounded-full bg-muted p-2"
        >
          <SearchIcon size={25} />
          <PopoverTrigger asChild>
            <input
              value={query as string}
              ref={searchInputRef}
              onChange={(e) => setQuery(e.target.value)}
              className="h-full w-full bg-transparent outline-none"
              placeholder="Search"
              type="text"
            />
          </PopoverTrigger>
        </form>
      </div>

      <PopoverContent
        side="bottom"
        align="end"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <RecentSearchList
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          handleSearch={handleSearch}
          setQuery={setQuery}
          setIsPopoverOpen={setIsPopoverOpen}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Search;
