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
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";

export default function SearchFiltersBoxes() {
  const context = useContext(SearchFiltersContext);
  if (!context) return null;

  const { searchFilters, setSearchFilters } = context;
  const MotionCloseIcon = motion.create(RiCloseLargeLine);

  const handleRemoveFilter = (thisFilter: Filter) => {
    const newFilters = searchFilters.filter(
      (prevFilter) => prevFilter !== thisFilter,
    );
    setSearchFilters(newFilters);
  };

  return (
    <ul className="flex w-full justify-start ml-[17%] gap-3">
      <AnimatePresence>
        {searchFilters.map((filter) => {
          let displayName: string;
          let backgroundCssProperty: string;
          switch (filter.filterType) {
            case FilterType.Episode: {
              const currentMap = filterTypeToMap[filter.filterType];
              const mapItem = currentMap[filter.value]
                ? currentMap[filter.value]
                : null;

              displayName = mapItem ? mapItem.name : filter.value;
              backgroundCssProperty = "--episode-background";
              break;
            }

            case FilterType.Season: {
              const currentMap = filterTypeToMap[filter.filterType];
              const mapItem = currentMap[filter.value]
                ? currentMap[filter.value]
                : null;

              displayName = mapItem ? mapItem : filter.value;
              backgroundCssProperty = "--season-background";
              break;
            }

            case FilterType.Speaker: {
              const currentMap = filterTypeToMap[filter.filterType];
              const mapItem = currentMap[filter.value]
                ? currentMap[filter.value]
                : null;

              displayName = mapItem ? mapItem.name : filter.value;
              backgroundCssProperty = "--speaker-background";
              break;
            }
          }

          backgroundCssProperty = `var(${backgroundCssProperty})`;

          return (
            <motion.li
              key={filter.filterType}
              className="flex items-center justify-center gap-2 p-3 px-4 rounded-full text-black text-md"
              style={{ backgroundColor: backgroundCssProperty }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              layout
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                layout: { type: "spring", stiffness: 150, damping: 20 },
              }}
            >
              <p className="font-bold">
                {filterTypeToName[filter.filterType]}:
              </p>
              <p>{displayName}</p>
              <ToolTip tooltipText="Remover Filtro">
                <MotionCloseIcon
                  onClick={() => handleRemoveFilter(filter)}
                  whileHover={{ scale: 1.3 }}
                  className="stroke-1 cursor-pointer"
                />
              </ToolTip>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
