"use client";

import { SearchEntryData } from "@/types/apiTypes";
import SearchEntry from "./searchEntry";
import { motion } from "framer-motion";

interface searchEntriesBoxProps {
  searchEntries: SearchEntryData[];
  currentPage: number;
}

const containerVariants = {
  initial: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function SearchEntriesBox({
  searchEntries,
  currentPage,
}: searchEntriesBoxProps) {
  return (
    <motion.ul
      initial="initial"
      animate="visible"
      key={currentPage}
      variants={containerVariants}
      className="flex flex-col gap-2"
    >
      {searchEntries
        .slice((currentPage - 1) * 10, currentPage * 10)
        .map((item, index) => (
          <SearchEntry entry={item} key={index} />
        ))}
    </motion.ul>
  );
}
