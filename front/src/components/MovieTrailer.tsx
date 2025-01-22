interface VideoProps {
  trailerKey: string;
}

export const MovieTrailer = ({trailerKey}: VideoProps) => {
  return (
      <iframe
          width="100%"
          height="800"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
      ></iframe>
  );
};

