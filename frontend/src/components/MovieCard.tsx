interface MovieCardProps {
  title: string,
  imageUrl: string,
  overview: string,
}

export default function MovieCard({title, imageUrl, overview}: MovieCardProps) {
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img src={imageUrl} alt={title} className="w-full h-64 object-cover"/>
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-gray-700 text-base">{overview}</p>
        </div>
      </div>
  );
};

;
