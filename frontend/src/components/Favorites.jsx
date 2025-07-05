import { useData } from "./PostProvider";
import { Trash2, Play, StopCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function Favorites() {
  const { favorites, removeFavorite } = useData();
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (song) => {
    if (playingSongId === song._id) {
      audioRef.current.pause();
      setPlayingSongId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(`http://localhost:4000${song.audioFile}`);
      audioRef.current = newAudio;
      newAudio.play();
      setPlayingSongId(song._id);

      newAudio.onended = () => {
        setPlayingSongId(null);
      };
    }
  };

  return (
    <>
      {favorites.length === 0 && (
        <div className="flex items-center justify-center min-h-screen text-gray-400 text-2xl">
          No Favorites yet.
        </div>
      )}
      <div className="min-h-screen p-6 ">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Your Favorites
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((song) => (
            <div
              key={song._id}
              className="group bg-gray-900/70 backdrop-blur-md border border-gray-700/40 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30 flex flex-col"
            >
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={`http://localhost:4000${song.coverImage}`}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white truncate mb-1 group-hover:text-purple-300 transition-colors duration-300">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 truncate mb-4">
                  {song.artist}
                </p>

                <div className="flex items-center justify-between gap-2 mt-auto">
                  <button
                    onClick={() => handlePlay(song)}
                    className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors duration-300 shadow-md w-9 h-9"
                  >
                    {playingSongId === song._id ? (
                      <StopCircle className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => removeFavorite(song._id)}
                    className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors duration-200 shadow-md w-9 h-9"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
