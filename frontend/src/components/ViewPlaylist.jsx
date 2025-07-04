import { useData } from "./PostProvider";
import { X } from "lucide-react";

export default function ViewPlaylist() {
  const { setViewingPlaylist, viewingPlaylist } = useData();

  if (!viewingPlaylist) return null;

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
          {viewingPlaylist.name}
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          By: {viewingPlaylist.user.name || "Unknown"}
        </p>

        {viewingPlaylist.user.profileImage && (
          <img
            src={`http://localhost:4000${viewingPlaylist.user.profileImage}`}
            alt={viewingPlaylist.user.name}
            className="w-16 h-16 object-cover rounded-full mb-4 border border-gray-600"
          />
        )}

        <h3 className="font-semibold mb-3">Songs in this playlist</h3>

        <div className="space-y-3">
          {viewingPlaylist.songs.map((song) => (
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
              <audio
                controls
                className="w-28 md:w-32 lg:w-36"
                src={`http://localhost:4000${song.audioFile}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
