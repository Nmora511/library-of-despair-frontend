"use client";
import Image from "next/image";
import DialogueLine from "./dialogueLine";
import { SearchEntryData } from "@/types/apiTypes";
import YoutubePreview from "./youtubePreview";
import rawSpeakerIdMap from "@/lib/speaker-id-map.json";
import { timeStringFormatter } from "@/utils/stringFormatter";
import { useEffect, useState } from "react";
import { SpeakerIdMapItem } from "@/types/mapTypes";

const speakerIdMap = rawSpeakerIdMap as Record<string, SpeakerIdMapItem>;

export default function SearchEntry({ entry }: { entry: SearchEntryData }) {
  const defaultPhotoPath: string = "/speakers/unknown.png";
  const [filePath, setFilePath] = useState<string>(defaultPhotoPath);

  useEffect(() => {
    const speakerImageUrl = speakerIdMap[entry.line.speakers[0]?.id]?.imageUrl;

    if (
      speakerImageUrl === undefined ||
      speakerImageUrl === null ||
      speakerImageUrl === ""
    ) {
      return;
    }
    const path = "/speakers/" + speakerImageUrl;

    console.log("Tentando puxar: " + path);
    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setFilePath(path);
          console.log("Carregou: " + path);
        } else {
          setFilePath(defaultPhotoPath);
        }
      })
      .catch(() => setFilePath(defaultPhotoPath));
  }, [entry]);

  return (
    <div className="relative flex items-center w-full min-h-45 h-68 bg-background border-(--primary) border-[0.3rem] rounded-lg">
      <div className="relative h-full w-45 border-(--primary) border-r-[0.3rem] shrink-0 overflow-hidden">
        <Image
          className="object-cover"
          fill
          sizes="200px"
          src={filePath}
          alt="Foto Locutor"
        />
      </div>
      <div className="w-full h-full flex items-center justify-between">
        <div className="ml-5">
          <DialogueLine
            line={entry.lineBefore}
            episodeId={entry.moment.episodeId}
          />
          <DialogueLine
            line={entry.line}
            isMainLine={true}
            episodeId={entry.moment.episodeId}
          />
          <DialogueLine
            line={entry.lineAfter}
            episodeId={entry.moment.episodeId}
          />
        </div>
        <div
          className="
          h-full min-w-120 max-w-150 py-2 pl-2 mr-5 flex flex-col justify-center items-center gap-2 shrink-0 overflow-hidden border-(--primary) border-l-[0.3rem]
          "
        >
          <div className="flex">
            <p className="font-bold text-(--primary)">Temporada:</p>
            <p>&nbsp;{entry.moment.seasonName}</p>
          </div>
          <div className="flex">
            <p className="font-bold text-(--primary)">Episódio:</p>
            <p>
              &nbsp;{entry.moment.episodeName} - #{entry.moment.episodeNumber}
            </p>
            <p className="font-bold ml-3 text-(--primary)">Momento:</p>
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
