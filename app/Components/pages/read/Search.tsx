"use client";

import { CiSearch as SearchIcon } from "react-icons/ci";
import { X as Remove } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { Button } from "../../ui/button";

const Search = () => {
  const router = useRouter();
  const [isSearchInputOnFocus, setIsSearchInputOnFocus] = useState(false);
  const [recentSearches, setRecentSearches] = useState<
    { id: number; content: string }[] | undefined
  >(undefined);
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (query) {
      const params = new URLSearchParams();
      params.set("q", query);
      router.push(`/blogs/search?${params.toString()}`);

      setIsSearchInputOnFocus(false);
    }
  };

  function handleRemoveRecentSearch(searchToRemoveId: number) {
    const updatedSearches = recentSearches?.filter(
      (search) => search.id !== searchToRemoveId,
    );
    setRecentSearches(updatedSearches);
    axiosInstance.delete(`/api/search/${searchToRemoveId}`, {
      headers: { Authorization: getCookie("token") },
    });
  }

  useEffect(() => {
    axiosInstance("api/search/recent", {
      headers: { Authorization: getCookie("token") },
    }).then((res) => {
      setRecentSearches(res.data);
    });
  }, []);

  return (
    <div className="relative flex w-72 flex-col gap-2">
      <form
        onSubmit={handleSearch}
        className="flex w-72 items-center gap-2 rounded-full bg-muted p-2"
      >
        <button
          type="submit"
          className="size-6 cursor-pointer border-none bg-transparent"
        >
          <SearchIcon />
        </button>
        <input
          onFocus={() => setIsSearchInputOnFocus(true)}
          onBlur={() => setIsSearchInputOnFocus(false)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-full w-full bg-transparent outline-none"
          placeholder="Search for blogs..."
          type="text"
        />
      </form>
      {isSearchInputOnFocus && (
        <div className="absolute top-14 z-50 flex w-full flex-col border bg-muted p-2 text-muted-foreground">
          <h1 className="text-lg font-semibold text-primary">
            Recent Searches
          </h1>
          {recentSearches?.map((recentSearch, index) => (
            <div key={index} className="flex items-center justify-between p-2">
              <Button
                type="submit"
                className="w-full text-start"
                variant="ghost"
              >
                {recentSearch.content}
              </Button>
              <Remove
                type="button"
                onClick={() => handleRemoveRecentSearch(recentSearch.id)}
                className="mr-2 size-4 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
