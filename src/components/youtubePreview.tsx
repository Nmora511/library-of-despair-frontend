import { useState } from "react";

interface YoutubePreviewProps {
  videoId: string;
  timestamp: number;
}

export default function YoutubePreview({
  videoId,
  timestamp,
}: YoutubePreviewProps): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const embedUrl = `https://youtube.com/embed/${videoId}?start=${Math.trunc(timestamp / 1000)}`;
  const [prevVideo, setPrevVideo] = useState({ videoId, timestamp });

  if (videoId !== prevVideo.videoId || timestamp !== prevVideo.timestamp) {
    setIsLoaded(false);
    setPrevVideo({ videoId, timestamp });
  }

  return (
    <div className="flex-1 h-auto max-h-full min-h-0 max-w-full min-w-0 aspect-video bg-black rounded-xl cursor-pointer">
      {!isLoaded && (
        <div className="h-full w-full flex items-center justify-center rounded-xl  bg-zinc-800 z-10">
          <div className="w-8 h-8 border-4 border-t-(--golden) border-neutral-700 rounded-full animate-spin"></div>
        </div>
      )}

      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => {
          setIsLoaded(true);
        }}
        className={`border-none w-full h-full rounded-xl transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      ></iframe>
    </div>
  );
}
