"use client";

import { createContext } from "react";
import { Filter } from "@/types/filtersTypes";

interface SearchFiltersContextType {
  searchFilters: Filter[];
  handleUpdateSearchFilters: (newFilters: Filter[]) => void;
}

export const SearchFiltersContext = createContext<
  SearchFiltersContextType | undefined
>(undefined);
