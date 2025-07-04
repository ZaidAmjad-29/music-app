import { useParams } from "react-router-dom";
import { useData } from "../components/PostProvider";
import { useState, useRef } from "react";
import { Play, StopCircle } from "lucide-react";

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const { user } = useData();
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRef = useRef(null);

  const playlist = user?.playlists?.find((pl) => pl._id === id);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Playlist not found.
      </div>
    );
  }

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
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
        {playlist.name}
      </h2>
      <p className="text-gray-400 mb-8">
        {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlist.songs.map((song) => (
          <div
            key={song._id}
            className="group relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-700/40 shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30"
          >
            <div className="relative w-full h-40 overflow-hidden">
              <img
                src={`http://localhost:4000${song.coverImage}`}
                alt={song.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h4 className="font-medium text-white line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
                {song.title}
              </h4>
              <p className="text-sm text-gray-400 line-clamp-1">{song.artist}</p>

              <button
                onClick={() => handlePlay(song)}
                className="mt-2 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-colors duration-300 shadow-md"
              >
                {playingSongId === song._id ? (
                  <StopCircle className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
