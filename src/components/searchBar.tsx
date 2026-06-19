"use client";
import { motion } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";
import ToolTip from "./toolTip";
import FilterDropdown from "./filtersDropdown";

const MotionCloseIcon = motion.create(RiCloseLargeLine);
const MotionMagnifierIcon = motion.create(SlMagnifier);

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  setValue,
}: SearchBarProps) {
  return (
    <section className="flex gap-3 items-center bg-zinc-50 text-background rounded-4xl w-full h-13 border-(--primary) border-[0.3rem]">
      <ToolTip tooltipText="Pesquisar">
        <MotionMagnifierIcon
          whileHover={{ scale: 1.3 }}
          className="stroke-40 ml-4"
        />
      </ToolTip>
      <input
        className="outline-0 rounded-4xl text-lg w-full h-full"
        value={value}
        onChange={onChange}
        placeholder="Digite sua Pesquisa"
        type="search"
      ></input>
      <ToolTip tooltipText="Limpar">
        <MotionCloseIcon
          onClick={() => {
            setValue("");
          }}
          whileHover={{ scale: 1.3 }}
          className="stroke-1 cursor-pointer"
        />
      </ToolTip>
      <span className="block h-[65%] w-px rounded-lg bg-black opacity-50"></span>
      <FilterDropdown />
    </section>
  );
}
