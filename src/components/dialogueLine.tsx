"use client";

import { DialogueLineData } from "@/types/apiTypes";
import { capitalizeFirstLetter } from "@/utils/stringFormatter";
import rawSpeakerIdMap from "@/lib/speaker-id-map.json";
import ReportModal from "./reportModal";
import { SpeakerIdMapItem } from "@/types/mapTypes";

const speakerIdMap = rawSpeakerIdMap as Record<string, SpeakerIdMapItem>;

export default function DialogueLine({
  line,
  episodeId,
  isMainLine = false,
}: {
  line: DialogueLineData;
} & { episodeId: string; isMainLine?: boolean }) {
  if (!line) {
    return <></>;
  }

  return (
    <div
      className={`flex w-full py-3 font-bold ${isMainLine ? "opacity-100" : "opacity-60"}`}
    >
      {line.speakers.map((speaker, index) => {
        const currentSpeakerItem = speakerIdMap[speaker.id];
        let textHexColor: string = currentSpeakerItem?.color;

        if (!textHexColor || textHexColor === "") {
          textHexColor = "#d6ab00";
        }

        speaker.name = capitalizeFirstLetter(speaker.name);

        if (index > 0) {
          speaker.name = `, ${speaker.name}`;
        }

        return (
          <span key={index}>
            <span style={{ color: textHexColor }}>{speaker.name}</span>
            {index === line.speakers.length - 1 && <span>:&nbsp;</span>}
          </span>
        );
      })}
      <span className="font-normal">{capitalizeFirstLetter(line.text)}</span>
      <ReportModal lineNumber={line.number} episodeId={episodeId} />
    </div>
  );
}
