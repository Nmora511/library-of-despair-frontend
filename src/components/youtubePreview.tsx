interface YoutubePreviewProps {
  videoId: string;
  timestamp: number;
}

export default function YoutubePreview({
  videoId,
  timestamp,
}: YoutubePreviewProps): React.JSX.Element {
  console.log(timestamp);
  const embedUrl = `https://youtube.com/embed/${videoId}?start=${Math.trunc(timestamp / 1000)}`;

  return (
    <div className="flex-1 h-auto max-h-full min-h-0 max-w-full min-w-0 aspect-video bg-black rounded-xl cursor-pointer">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="border-none w-full h-full rounded-xl"
      ></iframe>
    </div>
  );
}
