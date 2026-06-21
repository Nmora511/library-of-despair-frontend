"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import ToolTip from "./toolTip";
import { motion } from "framer-motion";
import { IoFunnelOutline } from "react-icons/io5";
import { useContext } from "react";
import { SearchFiltersContext } from "@/context/SearchFiltersContext";
import { FilterType } from "@/types/filtersTypes";
import rawSeasonIdMap from "@/lib/season-id-map.json";
import rawEpisodeIdMap from "@/lib/episode-id-map.json";
import rawSpeakerIdMap from "@/lib/speaker-id-map.json";
import {
  EpisodeIdMapItem,
  SeasonIdMapItem,
  SpeakerIdMapItem,
} from "@/types/mapTypes";

const MotionFunnelIcon = motion.create(IoFunnelOutline);

const seasonIdMap = rawSeasonIdMap as Record<string, SeasonIdMapItem>;
const episodeIdMap = rawEpisodeIdMap as Record<string, EpisodeIdMapItem>;
const speakerIdMap = rawSpeakerIdMap as Record<string, SpeakerIdMapItem>;

export default function FilterDropdown() {
  const context = useContext(SearchFiltersContext);
  if (!context) return null;

  const { searchFilters, setSearchFilters } = context;

  const currentSeasonFilter = searchFilters.find(
    (f) => f.filterType === FilterType.Season,
  );
  const currentEpisodeFilter = searchFilters.find(
    (f) => f.filterType === FilterType.Episode,
  );
  const currentSpeakerFilter = searchFilters.find(
    (f) => f.filterType === FilterType.Speaker,
  );

  const handleSelectFilter = (type: FilterType, value: string | null) => {
    const cleanedArray = searchFilters.filter((f) => f.filterType !== type);

    if (value) {
      setSearchFilters([...cleanedArray, { filterType: type, value }]);
      return;
    }

    setSearchFilters(cleanedArray);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-0">
          <ToolTip tooltipText="Filtros">
            <MotionFunnelIcon
              size="1.4rem"
              whileHover={{ scale: 1.3 }}
              className="stroke-40 mr-5 cursor-pointer"
            />
          </ToolTip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scale-[120%]" side="left">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Temporadas</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Command className="max-w-sm rounded-lg">
                  <CommandInput placeholder="Digite o nome da temporada..." />
                  <CommandList>
                    <CommandEmpty className="text-(--primary)">
                      Nenhum Resultado Encontrado.
                    </CommandEmpty>
                    {Object.keys(seasonIdMap).map((seasonId) => {
                      const isChecked = currentSeasonFilter?.value === seasonId;

                      return (
                        <CommandItem
                          key={seasonId}
                          value={seasonIdMap[seasonId].toLocaleLowerCase()}
                          data-checked={isChecked}
                          onSelect={() => {
                            const newValue = isChecked ? null : seasonId;
                            handleSelectFilter(FilterType.Season, newValue);

                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" }),
                            );
                          }}
                        >
                          <span>{seasonIdMap[seasonId]}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Episódios</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Command className="max-w-sm rounded-lg">
                  <CommandInput placeholder="Digite o nome do episódio..." />
                  <CommandList>
                    <CommandEmpty className="text-(--primary)">
                      Nenhum Resultado Encontrado.
                    </CommandEmpty>
                    {Object.keys(episodeIdMap).map((episodeId) => {
                      const isChecked =
                        currentEpisodeFilter?.value === episodeId;

                      return (
                        <CommandItem
                          key={episodeId}
                          value={episodeIdMap[
                            episodeId
                          ].name.toLocaleLowerCase()}
                          data-checked={isChecked}
                          onSelect={() => {
                            const newValue = isChecked ? null : episodeId;
                            handleSelectFilter(FilterType.Episode, newValue);

                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" }),
                            );
                          }}
                        >
                          <span>{episodeIdMap[episodeId].name}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Locutor</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Command className="max-w-sm rounded-lg">
                  <CommandInput placeholder="Digite o nome do locutor..." />
                  <CommandList>
                    <CommandEmpty className="text-(--primary)">
                      Nenhum Resultado Encontrado.
                    </CommandEmpty>
                    {Object.keys(speakerIdMap).map((speakerId) => {
                      const isChecked =
                        currentSpeakerFilter?.value === speakerId;

                      return (
                        <CommandItem
                          key={speakerId}
                          value={speakerIdMap[
                            speakerId
                          ].name.toLocaleLowerCase()}
                          data-checked={isChecked}
                          onSelect={() => {
                            const newValue = isChecked ? null : speakerId;
                            handleSelectFilter(FilterType.Speaker, newValue);

                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" }),
                            );
                          }}
                        >
                          <span>{speakerIdMap[speakerId].name}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
