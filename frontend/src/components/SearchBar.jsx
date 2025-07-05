import { useData } from "../components/PostProvider";
import { useState } from "react";
import Loader from "./Loader";

export default function SearchBar() {
  const { query, setQuery, isFetching, results, debouncedSearch } = useData();
  const [audioInstance, setAudioInstance] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = (song) => {
    if (audioInstance) {
      audioInstance.pause();
    }

    const newAudio = new Audio(`http://localhost:4000${song.audioFile}`);
    newAudio.play();
    setAudioInstance(newAudio);
    setPlayingId(song._id);

    newAudio.onended = () => {
      setPlayingId(null);
      setAudioInstance(null);
    };
  };

  const handleStop = () => {
    if (audioInstance) {
      audioInstance.pause();
      setAudioInstance(null);
      setPlayingId(null);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Search Songs
        </h1>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or artist..."
          className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition mb-8"
        />

        {isFetching && <Loader />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((track) => (
            <div
              key={track._id}
              className="group relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-700/40 shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30"
            >
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={`http://localhost:4000${track.coverImage}`}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {playingId === track._id ? (
                  <button
                    onClick={handleStop}
                    className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-black/70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handlePlay(track)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-black/70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
                  {track.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-1">
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!isFetching && !debouncedSearch && results.length === 0 && (
          <p className="text-red-500 text-2xl mt-6 text-center">
            No songs found.
          </p>
        )}
      </div>
    </div>
  );
}
