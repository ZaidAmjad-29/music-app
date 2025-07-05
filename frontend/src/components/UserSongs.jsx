import { useState } from "react";
import { useData } from "./PostProvider";
import { PlayCircle, Square } from "lucide-react";

export default function UserSongs() {
  const { user } = useData();
  const [playingId, setPlayingId] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);

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
  console.log(user)

  return (
    <>
     {user.user.uploadedSongs.length === 0 && (
        <div className="flex items-center justify-center min-h-screen text-gray-400 text-2xl">
          No Songs uploaded yet.
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 text-white bg-gradient-to-r from-white to-purple-300 bg-clip-text">
        Uploaded Songs
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {user.user.uploadedSongs?.map((song) => (
          <div
            key={song._id}
            className="flex flex-col bg-gray-900/60 border border-gray-700/40 rounded-2xl p-4 shadow-xl backdrop-blur-lg transition-all hover:scale-105 hover:shadow-purple-500/30"
          >
            <img
              src={`http://localhost:4000${song.coverImage}`}
              alt={song.title}
              className="w-full h-40 object-cover rounded-lg mb-3 shadow-md"
            />
            <h4 className="text-lg font-semibold text-purple-300 mb-1 line-clamp-1 text-center sm:text-left">
              {song.title}
            </h4>
            <p className="text-sm text-gray-400 mb-3 truncate text-center sm:text-left">
              {song.artist}
            </p>

            <button
              onClick={() =>
                playingId === song._id ? handleStop() : handlePlay(song)
              }
              className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 mt-auto transition"
            >
              {playingId === song._id ? (
                <>
                  <Square className="w-5 h-5 mr-1" /> Stop
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 mr-1" /> Play
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
