"use client";
import { useEffect, useState } from "react";
import SearchEntry from "@/components/searchEntry";
import { SearchEntryData } from "@/types/apiTypes";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { AxiosResponse } from "axios";
import api from "@/utils/api";

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

const testData2: Array<SearchEntryData> = [
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
];
export default function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchEntries, setSearchEntries] = useState<Array<SearchEntryData>>(
    [],
  );
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  const startSearchQuery = () => {
    setIsSearchLoading(true);
    api
      .get(`/search?query=${searchText}`)
      .then((response: AxiosResponse<SearchEntryData[]>) => {
        setIsSearchLoading(false);
        setSearchEntries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    if (searchText == "") {
      setSearchEntries([]);
      return;
    }

    startSearchQuery();
    // // test log
    // if (counter % 2 == 0) {
    //   setSearchEntries(testData2);
    // } else {
    //   setSearchEntries([]);
    // }
    // setCounter(counter + 1);
  };
  return (
    <main className="flex flex-col flex-1 gap-2 items-center font-sans w-full h-full">
      <section className="flex items-center justify-center gap-4 w-[92%] h-full mt-6">
        {/*TEMPORARY SUBSTITUTE FOR LOGO*/}
        <div>
          <Image
            height={50}
            width={50}
            alt="mascara do desespero icon"
            src={"/mascara_desespero.webp"}
            loading="eager"
          />
        </div>
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          onChange={handleChange}
        />
        {/*<button className="bg-yellow-700 p-4 font-bold rounded-xl">
          Pesquisar
        </button>*/}
      </section>
      <div className="flex flex-col gap-3 h-full w-[92%] text-xl text-start">
        <h1 className="w-full border-b border-foreground font-bold">
          Respostas
        </h1>
        {isSearchLoading ? (
          <p>Loading...</p>
        ) : (
          searchEntries.map((item, index) => (
            <SearchEntry entry={item} key={index} />
          ))
        )}
      </div>
    </main>
  );
}
