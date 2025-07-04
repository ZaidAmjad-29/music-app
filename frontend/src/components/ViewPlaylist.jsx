import { useState } from "react";
import { useData } from "./PostProvider";
import { X, PlayCircle, Square } from "lucide-react";

export default function ViewPlaylist() {
  const { setViewingPlaylist, viewingPlaylist, songsInPlaylist } = useData();
  const [playingId, setPlayingId] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);

  if (!songsInPlaylist) return null;

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700/40 shadow-2xl w-full max-w-lg overflow-y-auto max-h-[80vh] p-6 text-white">
        <button
          onClick={() => setViewingPlaylist(null)}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          {songsInPlaylist.name}
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          By: {songsInPlaylist.user.name || "Unknown"}
        </p>

        {songsInPlaylist.user.profileImage && (
          <img
            src={`http://localhost:4000${songsInPlaylist.user.profileImage}`}
            alt={songsInPlaylist.user.name}
            className="w-16 h-16 object-cover rounded-full mb-4 border border-gray-600"
          />
        )}

        <h3 className="font-semibold mb-3">Songs in this playlist</h3>

        <div className="space-y-3">
          {songsInPlaylist.songs.map((song) => (
            <div
              key={song._id}
              className="flex items-center gap-3 bg-gray-800/60 rounded-lg p-3 border border-gray-700/40 transition-all duration-300 hover:bg-gray-700/70"
            >
              <img
                src={`http://localhost:4000${song.coverImage}`}
                alt={song.title}
                className="w-14 h-14 object-cover rounded shadow"
              />
              <div className="flex-1">
                <p className="font-medium text-purple-300 line-clamp-1">
                  {song.title}
                </p>
                <p className="text-xs text-gray-400">{song.artist}</p>
              </div>

              {playingId === song._id ? (
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-md px-3 py-2 transition"
                >
                  <Square className="w-5 h-5 mr-1" /> Stop
                </button>
              ) : (
                <button
                  onClick={() => handlePlay(song)}
                  className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-md px-3 py-2 transition"
                >
                  <PlayCircle className="w-5 h-5 mr-1" /> Play
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
