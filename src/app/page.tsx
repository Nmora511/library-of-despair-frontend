"use client";
import { useState } from "react";
import SearchEntry from "@/components/searchEntry";
import { SearchEntryData } from "@/types/apiTypes";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { AxiosResponse } from "axios";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { Filter, FilterType } from "@/types/filtersTypes";
import { SearchFiltersContext } from "@/context/SearchFiltersContext";
import SearchFiltersBoxes from "@/components/searchFiltersBoxes";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchEntries, setSearchEntries] = useState<Array<SearchEntryData>>(
    [],
  );
  const [searchFilters, setSearchFilters] = useState<Array<Filter>>([]);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startSearchQuery = async (
    queryText: string,
    queryFilters: Filter[],
  ) => {
    setCurrentPage(1);
    setIsSearchLoading(true);

    let queryPath: string = `/line?query=${queryText}`;

    for (const filter of queryFilters) {
      switch (filter.filterType) {
        case FilterType.Episode: {
          queryPath += `&episode=${filter.value}`;
          break;
        }
        case FilterType.Season: {
          queryPath += `&season=${filter.value}`;
          break;
        }
        case FilterType.Speaker: {
          queryPath += `&speaker=${filter.value}`;
          break;
        }
      }
    }
    try {
      const response: AxiosResponse<SearchEntryData[]> =
        await api.get(queryPath);
      setIsSearchLoading(false);
      setSearchEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSearchFilters = (newFilters: Filter[]) => {
    setSearchFilters(newFilters);
    startSearchQuery(searchText, newFilters);
  };

  const handleUpdateSearchText = (newValue: string) => {
    setSearchText(newValue);

    if (newValue.trim() === "") {
      setSearchEntries([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextText = e.target.value;
    handleUpdateSearchText(nextText);

    if (nextText.trim() === "") {
      return;
    }

    startSearchQuery(nextText, searchFilters);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex flex-col flex-1 gap-0 items-center font-sans w-full h-full">
      <SearchFiltersContext.Provider
        value={{ searchFilters, handleUpdateSearchFilters }}
      >
        <section className="flex items-center justify-center gap-4 w-[92%] h-full mt-6">
          <Image
            height={50}
            width={50}
            alt="mascara do desespero icon"
            src={"/mascara_desespero.webp"}
            loading="eager"
          />
          <div className="w-full">
            <SearchBar
              value={searchText}
              setValue={handleUpdateSearchText}
              onChange={handleChange}
            />
          </div>
        </section>
        <SearchFiltersBoxes />
        <div className="flex flex-col gap-3 h-full w-[92%] text-xl text-start mt-2">
          <h1 className="w-full border-b border-foreground font-bold">
            Respostas
          </h1>
          {isSearchLoading ? (
            <p>Loading...</p>
          ) : (
            searchEntries
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((item, index) => <SearchEntry entry={item} key={index} />)
          )}
        </div>
        <footer className="flex justify-center items-center gap-2 p-5">
          {searchEntries.length === 0 ? (
            <></>
          ) : (
            Array.from({ length: 10 }).map((_, index) => (
              <motion.button
                whileHover={{ scale: 1.3 }}
                key={index}
                onClick={() => {
                  setCurrentPage(index + 1);
                  scrollToTop();
                }}
                className={`flex items-center justify-center w-4 h-4 m-1 cursor-pointer rounded-2xl p-3 ${currentPage == index + 1 ? "bg-(--primary)" : ""}`}
              >
                <p className="font-bold">{index + 1}</p>
              </motion.button>
            ))
          )}
        </footer>
      </SearchFiltersContext.Provider>
    </main>
  );
}
