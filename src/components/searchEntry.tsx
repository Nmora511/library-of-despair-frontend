"use client";
import Image from "next/image";
import DialogueLine from "./dialogueLine";
import { SearchEntryData } from "@/types/apiTypes";
import YoutubePreview from "./youtubePreview";
import { timeStringFormatter } from "@/utils/stringFormatter";
import { useEffect, useState } from "react";
import ReportModal from "./reportModal";

export default function SearchEntry({ entry }: { entry: SearchEntryData }) {
  const [filePath, setFilePath] = useState<string>("/agatha.jpg");

  useEffect(() => {
    const path = `/${entry.line.speakers[0]?.id}.jpg`;

    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setFilePath(path);
        } else {
          setFilePath("/agatha.jpg");
        }
      })
      .catch(() => setFilePath("/agatha.jpg"));
  }, [entry.line.speakers]);

  return (
    <div className="relative flex items-center w-full min-h-45 h-68 bg-background border-(--golden) border-[0.3rem] rounded-lg">
      <div className="relative h-full w-45 border-(--golden) border-r-[0.3rem] shrink-0 overflow-hidden">
        <Image
          className="object-cover"
          fill
          sizes="200px"
          src={filePath}
          alt="Foto da Agatha"
          loading="eager"
        />
      </div>
      <div className="w-full h-full flex items-center justify-between">
        <div className="ml-5">
          <DialogueLine line={entry.lineBefore} />
          <DialogueLine line={entry.line} />
          <DialogueLine line={entry.lineAfter} />
        </div>
        <div className="relative h-full items-start top-2 right-1">
          <ReportModal
            lineNumber={entry.line.number}
            episodeId={entry.moment.episodeId}
          />
        </div>
        <div
          className="
          h-full min-w-120 max-w-150 py-2 pl-2 mr-5 flex flex-col justify-center items-center gap-2 shrink-0 overflow-hidden border-(--golden) border-l-[0.3rem]
          "
        >
          <div className="flex">
            <p className="font-bold text-(--golden)">Temporada:</p>
            <p>&nbsp;{entry.moment.seasonName}</p>
          </div>
          <div className="flex">
            <p className="font-bold text-(--golden)">Episódio:</p>
            <p>
              &nbsp;{entry.moment.episodeName} - #{entry.moment.episodeNumber}
            </p>
            <p className="font-bold ml-3 text-(--golden)">Momento:</p>
            <p>
              &nbsp;
              {timeStringFormatter(Math.trunc(entry.moment.timestamp / 1000))}
            </p>
          </div>
          <YoutubePreview
            videoId={entry.moment.videoId}
            timestamp={entry.moment.timestamp}
          />
        </div>
      </div>
    </div>
  );
}
