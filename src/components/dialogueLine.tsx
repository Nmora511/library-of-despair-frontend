"use client";

import { DialogueLineData } from "@/types/apiTypes";
import { capitalizeFirstLetter } from "@/utils/stringFormatter";
import ReportModal from "./reportModal";

export default function DialogueLine({
  line,
  episodeId,
}: {
  line: DialogueLineData;
} & { episodeId: string }) {
  const nameColorPerCharacterName: Record<string, string> = {
    Agatha: "text-red-800",
    Arthur: "text-[#09fd44]",
    thiago_fritz: "text-orange-700",
    daniel_hartmann: "text-blue-700",
    elizabeth_webber: "text-green-600",
    alexsander_kothe: "text-yellow-400",
    mestre: "text-white",
    default: "text-yellow-700",
  };

  if (!line) {
    return <></>;
  }

  return (
    <div className="flex w-full py-3 font-bold">
      {line.speakers.map((item, index) => {
        const textColorCss: string =
          item.id in nameColorPerCharacterName
            ? nameColorPerCharacterName[item.id]
            : nameColorPerCharacterName["default"];

        item.name = capitalizeFirstLetter(item.name);

        if (index > 0) {
          item.name = `, ${item.name}`;
        }

        return (
          <p key={index} className={textColorCss}>
            {item.name}
          </p>
        );
      })}
      <p>:&nbsp;</p>
      <p className="font-normal">{capitalizeFirstLetter(line.text)}</p>
      <ReportModal lineNumber={line.number} episodeId={episodeId} />
    </div>
  );
}
