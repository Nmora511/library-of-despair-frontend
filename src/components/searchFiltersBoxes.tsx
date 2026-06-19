"use client";
import { SearchFiltersContext } from "@/context/SearchFiltersContext";
import {
  Filter,
  FilterType,
  filterTypeToMap,
  filterTypeToName,
} from "@/types/filtersTypes";
import { useContext } from "react";
import ToolTip from "./toolTip";
import { motion } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";

export default function SearchFiltersBoxes() {
  const context = useContext(SearchFiltersContext);
  if (!context) return null;

  const { searchFilters, handleUpdateSearchFilters } = context;
  const MotionCloseIcon = motion.create(RiCloseLargeLine);

  const handleRemoveFilter = (thisFilter: Filter) => {
    const newFilters = searchFilters.filter(
      (prevFilter) => prevFilter !== thisFilter,
    );
    handleUpdateSearchFilters(newFilters);
  };

  return (
    <div className="flex w-full justify-start ml-[17%] gap-3">
      {searchFilters.map((filter, key) => {
        let displayName: string;
        switch (filter.filterType) {
          case FilterType.Episode: {
            const currentMap = filterTypeToMap[filter.filterType];
            const mapItem = currentMap[filter.value]
              ? currentMap[filter.value]
              : null;

            displayName = mapItem ? mapItem.name : filter.value;
            break;
          }

          case FilterType.Season: {
            const currentMap = filterTypeToMap[filter.filterType];
            const mapItem = currentMap[filter.value]
              ? currentMap[filter.value]
              : null;

            displayName = mapItem ? mapItem : filter.value;
            break;
          }

          case FilterType.Speaker: {
            const currentMap = filterTypeToMap[filter.filterType];
            const mapItem = currentMap[filter.value]
              ? currentMap[filter.value]
              : null;

            displayName = mapItem ? mapItem.name : filter.value;
            break;
          }
        }

        return (
          <span
            key={key}
            className="flex items-center justify-center gap-2 bg-(--primary) p-3 px-4 rounded-full text-md"
          >
            <p className="font-bold">{filterTypeToName[filter.filterType]}:</p>
            <p>{displayName}</p>
            <ToolTip tooltipText="Remover Filtro">
              <MotionCloseIcon
                onClick={() => handleRemoveFilter(filter)}
                whileHover={{ scale: 1.3 }}
                className="stroke-1 cursor-pointer"
              />
            </ToolTip>
          </span>
        );
      })}
    </div>
  );
}
