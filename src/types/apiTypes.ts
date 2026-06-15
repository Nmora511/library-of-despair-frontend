export type SearchEntryData = {
  lineBefore: DialogueLineData;
  line: DialogueLineData;
  lineAfter: DialogueLineData;
  moment: SeriesMoment;
  score: number;
};

export type DialogueLineData = {
  speakers: Array<Speaker>;
  text: string;
};

type Speaker = {
  name: string;
  id: string;
};

type SeriesMoment = {
  videoId: string;
  timestamp: number;
  episodeName: string;
  episodeNumber: number;
  seasonName: string;
  thumbnailUrl: string;
};
