"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { Filter } from "@/types/filtersTypes";

interface SearchFiltersContextType {
  searchFilters: Filter[];
  setSearchFilters: Dispatch<SetStateAction<Filter[]>>;
}

export const SearchFiltersContext = createContext<
  SearchFiltersContextType | undefined
>(undefined);
