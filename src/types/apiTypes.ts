export type SearchEntryData = {
  lineBefore: DialogueLineData;
  line: DialogueLineData;
  lineAfter: DialogueLineData;
  moment: SeriesMoment;
  score: number;
};

export type DialogueLineData = {
  number: number;
  time: number;
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
  episodeId: string;
  seasonName: string;
  thumbnailUrl: string;
};

export type ReportedIssue = {
  episodeId: string;
  lineNumber: number;
  suggestion: string;
};
