import { useData } from "./PostProvider";
import { Trash2 } from "lucide-react";

export default function Favorites() {
  const { favorites, removeFavorite } = useData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((song) => (
          <div
            key={song._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 p-4 flex flex-col"
          >
            <img
              src={`http://localhost:4000${song.coverImage}`}
              alt={song.title}
              className="w-32 h-32 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold truncate mb-1">{song.title}</h3>
            <p className="text-sm text-gray-500 mb-3 truncate">{song.artist}</p>

            <audio
              controls
              src={`http://localhost:4000${song.audioFile}`}
              className="w-full mb-3"
            />

            <button
              onClick={() => removeFavorite(song._id)}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded transition-colors duration-200 mt-auto"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
