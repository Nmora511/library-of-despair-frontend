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
import LoadingAnimation from "@/components/loadingAnimation";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchEntries, setSearchEntries] = useState<Array<SearchEntryData>>(
    [],
  );
  const [searchFilters, setSearchFilters] = useState<Array<Filter>>([]);
  const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true);
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
      setSearchEntries(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleUpdateSearchFilters = (newFilters: Filter[]) => {
    setSearchFilters(newFilters);
    startSearchQuery(searchText, newFilters);
  };

  const handleUpdateSearchText = (newValue: string) => {
    if (isFirstQuery && newValue !== "") {
      setIsFirstQuery(false);
    }

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
    <motion.main
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`flex flex-col flex-1 gap-0 items-center font-sans w-full h-full ${isFirstQuery ? "justify-center" : ""}`}
    >
      <SearchFiltersContext.Provider
        value={{ searchFilters, handleUpdateSearchFilters }}
      >
        <motion.section
          layout
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={`flex items-center justify-center h-full mt-6 ${isFirstQuery ? "w-[72%] flex-col gap-8" : "w-[92%] gap-4"}`}
        >
          <div className="flex items-center justify-center gap-3">
            <Image
              height={50}
              width={50}
              alt="mascara do desespero icon"
              src={"/mascara_desespero.webp"}
              loading="eager"
              className="h-auto w-auto object-contain"
            />
            {isFirstQuery && (
              <section className="flex flex-col">
                <span className="text-4xl font-bold">BIBLIOTECA</span>
                <span className="text-4xl font-bold">DO DESESPERO</span>
                <span></span>
              </section>
            )}
          </div>
          <div className="w-full">
            <SearchBar
              value={searchText}
              setValue={handleUpdateSearchText}
              onChange={handleChange}
            />
          </div>
        </motion.section>
        <SearchFiltersBoxes />
        {!isFirstQuery &&
          (isSearchLoading ? (
            <div className="flex flex-1 items-center justify-center w-full h-full min-h-[50vh]">
              <LoadingAnimation />
            </div>
          ) : (
            <div className="flex flex-col gap-3 h-full w-[92%] text-xl text-start mt-2">
              <h1 className="w-full border-b border-foreground font-bold">
                Respostas
              </h1>
              <ul className="flex flex-col gap-2">
                {searchEntries
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((item, index) => (
                    <SearchEntry entry={item} key={index} />
                  ))}
              </ul>
            </div>
          ))}
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
    </motion.main>
  );
}
