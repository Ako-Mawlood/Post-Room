import { useEffect, Dispatch, SetStateAction, FormEvent } from "react";
import { Button } from "../../ui/button";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { X } from "lucide-react";

type Props = {
  handleSearch: (e: FormEvent) => void;
  setQuery: Dispatch<SetStateAction<string | null>>;
  recentSearches: recentSearchesType[];
  setRecentSearches: Dispatch<SetStateAction<recentSearchesType[]>>;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
};
type recentSearchesType = {
  id: number;
  content: string;
};

const RecentSearchList = ({
  recentSearches,
  handleSearch,
  setQuery,
  setRecentSearches,
  setIsPopoverOpen,
}: Props) => {
  const token = getCookie("token");

  async function handleRemoveRecentSearch(searchToRemoveId: number) {
    const updatedRecentSearches = recentSearches.filter(
      (recentSearch) => recentSearch.id !== searchToRemoveId,
    );
    setRecentSearches(updatedRecentSearches);

    await axiosInstance.delete(`/api/search/${searchToRemoveId}`, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    axiosInstance("api/search/recent", {
      headers: { Authorization: token },
    }).then((res) => {
      setRecentSearches(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-md font-semibold text-primary">Recent Searches</h1>
      {recentSearches.length > 0 ? (
        <form onSubmit={handleSearch}>
          {recentSearches.map((recentSearch) => (
            <div
              key={recentSearch.id}
              className="flex w-full items-center justify-between"
            >
              <button
                onClick={() => {
                  setQuery(recentSearch.content);
                  setIsPopoverOpen(false);
                }}
                type="submit"
                className="flex-grow truncate px-0 py-2 text-start text-[15px] font-normal hover:underline"
              >
                {recentSearch.content}
              </button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleRemoveRecentSearch(recentSearch.id)}
                className="size-8 p-1"
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </form>
      ) : (
        <p className="p-2 text-center">No recent searches found.</p>
      )}
    </>
  );
};

export default RecentSearchList;
