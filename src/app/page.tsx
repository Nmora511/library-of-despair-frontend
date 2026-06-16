"use client";
import { useState } from "react";
import SearchEntry from "@/components/searchEntry";
import { SearchEntryData } from "@/types/apiTypes";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { AxiosResponse } from "axios";
import api from "@/utils/api";
import ReportModal from "@/components/reportModal";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchEntries, setSearchEntries] = useState<Array<SearchEntryData>>(
    [],
  );
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  const startSearchQuery = () => {
    setIsSearchLoading(true);
    api
      .get(`/search?query=${searchText}`)
      .then((response: AxiosResponse<SearchEntryData[]>) => {
        setIsSearchLoading(false);
        setSearchEntries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    if (searchText == "") {
      setSearchEntries([]);
      return;
    }

    startSearchQuery();
  };
  return (
    <main className="flex flex-col flex-1 gap-2 items-center font-sans w-full h-full">
      <section className="flex items-center justify-center gap-4 w-[92%] h-full mt-6">
        {/*TEMPORARY SUBSTITUTE FOR LOGO*/}
        <div>
          <Image
            height={50}
            width={50}
            alt="mascara do desespero icon"
            src={"/mascara_desespero.webp"}
            loading="eager"
          />
        </div>
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          onChange={handleChange}
        />
      </section>
      <div className="flex flex-col gap-3 h-full w-[92%] text-xl text-start">
        <h1 className="w-full border-b border-foreground font-bold">
          Respostas
        </h1>
        {isSearchLoading ? (
          <p>Loading...</p>
        ) : (
          searchEntries
            .slice(0, 10)
            .map((item, index) => <SearchEntry entry={item} key={index} />)
        )}
      </div>
    </main>
  );
}
