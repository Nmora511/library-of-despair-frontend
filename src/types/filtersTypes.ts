import episodeIdMap from "@/lib/episode-id-map.json";
import seasonIdMap from "@/lib/season-id-map.json";
import speakerIdMap from "@/lib/speaker-id-map.json";
import {
  EpisodeIdMapItem,
  SeasonIdMapItem,
  SpeakerIdMapItem,
} from "./mapTypes";

export enum FilterType {
  Season,
  Episode,
  Speaker,
}

export type Filter = {
  filterType: FilterType;
  value: string;
};

export const filterTypeToName: Record<FilterType, string> = {
  [FilterType.Episode]: "Episódio",
  [FilterType.Season]: "Temporada",
  [FilterType.Speaker]: "Locutor",
};

export const filterTypeToMap: {
  [FilterType.Season]: Record<string, SeasonIdMapItem>;
  [FilterType.Episode]: Record<string, EpisodeIdMapItem>;
  [FilterType.Speaker]: Record<string, SpeakerIdMapItem>;
} = {
  [FilterType.Episode]: episodeIdMap,
  [FilterType.Season]: seasonIdMap,
  [FilterType.Speaker]: speakerIdMap,
};
