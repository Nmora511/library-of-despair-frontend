"use client";
import { useEffect, useState } from "react";
import SearchEntry from "@/components/searchEntry";
import { SearchEntryData } from "@/types/apiTypes";

// MOCKED DATA
const testData: Array<SearchEntryData> = [
  {
    lineBefore: {
      speakers: [{ name: "Cellbit", id: "mestre" }],
      text: "É o melhor relacionamento familiar que eu já vi.",
    },
    line: {
      speakers: [{ name: "Thiago", id: "thiago_fritz" }],
      text: "Relacionamento baseado em violência não é muito bom não meu querido, calma lá.",
    },
    lineAfter: {
      speakers: [{ name: "Cristopher", id: "cristopher" }],
      text: "Nunca bater no meu filho.",
    },
    moment: {
      videoId: "23z-tCHgMGI",
      time: 2494,
      episodeName: "Equipe Kelvin",
      episodeNumber: 1,
      seasonName: "O Segredo na Floresta",
      thumbnailUrl:
        "https://static.wikia.nocookie.net/ordemparanormal/images/c/c5/O_Segredo_na_Floresta_Ep_1.jpg/revision/latest/scale-to-width-down/1000?cb=20230121021836&path-prefix=pt-br",
    },
    score: 1,
  },
  {
    lineBefore: {
      speakers: [{ name: "Daniel", id: "daniel_hartmann" }],
      text: "Bom, eu acredito que essa névoa...",
    },
    line: {
      speakers: [{ name: "Luba", id: "luba" }],
      text: "bom eu vou repetir o que o mestre falou...",
    },
    lineAfter: {
      speakers: [{ name: "Daniel", id: "daniel_hartmann" }],
      text: "Essa névoa indica que a membrana tá mais enfraquecida aqui",
    },
    moment: {
      videoId: "uplnCYc0fDg",
      time: 1694,
      episodeName: "Episódio 1",
      episodeNumber: 1,
      seasonName: "Ordem Paranormal RPG",
      thumbnailUrl: "",
    },
    score: 1.0,
  },
  {
    lineBefore: {
      speakers: [{ name: "Liz", id: "elizabeth_webber" }],
      text: "Por que que você saiu da escola?",
    },
    line: {
      speakers: [{ name: "Alex", id: "alexsander_kothe" }],
      text: "me demitiram.",
    },
    lineAfter: {
      speakers: [{ name: "Alex", id: "alexsander_kothe" }],
      text: "Eu...",
    },
    moment: {
      videoId: "uplnCYc0fDg",
      time: 10968,
      episodeName: "Episódio 1",
      episodeNumber: 1,
      seasonName: "Ordem Paranormal RPG",
      thumbnailUrl: "",
    },
    score: 0.49017094017094015,
  },
  {
    lineBefore: {
      speakers: [{ name: "Mestre", id: "mestre" }],
      text: "ele mencionou que tinha um bombeiro do lado de fora da escola, sim.",
    },
    line: {
      speakers: [{ name: "Luba", id: "luba" }],
      text: "eu fui falar com ele. (mestre: tá, você chega..)",
    },
    lineAfter: {
      speakers: [{ name: "Rakin", id: "rakin" }],
      text: "Eu quero ir lá, junto com o Daniel depois.",
    },
    moment: {
      videoId: "uplnCYc0fDg",
      time: 2718,
      episodeName: "Episódio 1",
      episodeNumber: 1,
      seasonName: "Ordem Paranormal RPG",
      thumbnailUrl: "",
    },
    score: 1.0,
  },
  {
    lineBefore: {
      speakers: [{ name: "Luba", id: "luba" }],
      text: "Ok.",
    },
    line: {
      speakers: [{ name: "Gabi", id: "gabi" }],
      text: "mestre, eu tenho uma pergunta.",
    },
    lineAfter: { speakers: [{ name: "Luís", id: "luis" }], text: "Opa." },
    moment: {
      videoId: "uplnCYc0fDg",
      time: 20427,
      episodeName: "Episódio 1",
      episodeNumber: 1,
      seasonName: "Ordem Paranormal RPG",
      thumbnailUrl: "",
    },
    score: 1.0,
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchEntries, setSearchEntries] = useState<Array<SearchEntryData>>(
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // test log
    console.log(searchText);
    setSearchEntries(testData);
  };

  return (
    <main className="flex flex-col flex-1 items-center font-sans w-full h-full">
      <section className="flex items-center justify-center gap-4 w-full h-full mt-6">
        <input
          className="bg-zinc-50 text-background rounded-lg w-[85%] h-10 border-yellow-700 border-[0.3rem]"
          onChange={handleChange}
          placeholder="Digite sua Pesquisa"
          type="search"
        ></input>
        <button className="bg-yellow-700 p-4 font-bold rounded-xl">
          Pesquisar
        </button>
      </section>
      <div className="flex flex-col gap-3 h-full w-[92%] text-xl text-start">
        <h1 className="w-full border-b border-foreground font-bold">
          Respostas
        </h1>
        {searchEntries.map((item, index) => (
          <SearchEntry entry={item} key={index} />
        ))}
      </div>
    </main>
  );
}
