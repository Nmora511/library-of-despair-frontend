"use client";
import Image from "next/image";
import DialogueLine from "./dialogueLine";
import { SearchEntryData } from "@/types/apiTypes";
import YoutubePreview from "./youtubePreview";
import { timeStringFormatter } from "@/utils/stringFormatter";
import { useEffect, useState } from "react";

export default function SearchEntry({ entry }: { entry: SearchEntryData }) {
  const [filePath, setFilePath] = useState<string>("/agatha.jpg");

  useEffect(() => {
    const path = `/${entry.line.speakers[0].id}.jpg`;

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
    <div className="flex items-center w-full min-h-45 h-68 bg-background border-yellow-700 border-[0.3rem] rounded-lg">
      <div className="relative h-full w-45 border-yellow-700 border-r-[0.3rem] shrink-0 overflow-hidden">
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
        <div
          className="
          h-full min-w-120 max-w-150 py-2 pl-2 mr-5 flex flex-col justify-center items-center gap-2 shrink-0 overflow-hidden border-yellow-700 border-l-[0.3rem]
          "
        >
          <div className="flex">
            <p className="font-bold text-yellow-700">Temporada:</p>
            <p>&nbsp;{entry.moment.seasonName}</p>
          </div>
          <div className="flex">
            <p className="font-bold text-yellow-700">Episódio:</p>
            <p>
              &nbsp;{entry.moment.episodeName} - #{entry.moment.episodeNumber}
            </p>
            <p className="font-bold ml-3 text-yellow-700">Momento:</p>
            <p>&nbsp;{timeStringFormatter(entry.moment.time)}</p>
          </div>
          <YoutubePreview
            videoId={entry.moment.videoId}
            time={entry.moment.time}
          />
        </div>
      </div>
    </div>
  );
}
