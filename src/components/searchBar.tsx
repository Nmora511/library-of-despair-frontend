import { motion } from "framer-motion";
import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";
import ToolTip from "./toolTip";

const MotionCloseIcon = motion.create(RiCloseLargeLine);
const MotionMagnifierIcon = motion.create(SlMagnifier);

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({
  value,
  onChange,
  setValue,
}: SearchBarProps) {
  return (
    <section className="flex gap-3 items-center bg-zinc-50 text-background rounded-4xl w-full h-13 border-(--golden) border-[0.3rem]">
      <input
        className="pl-4 outline-0 rounded-4xl text-lg w-full h-full"
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
      <ToolTip tooltipText="Pesquisar">
        <MotionMagnifierIcon
          whileHover={{ scale: 1.3 }}
          className="stroke-40 mr-5 cursor-pointer"
        />
      </ToolTip>
    </section>
  );
}
