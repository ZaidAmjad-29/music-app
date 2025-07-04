import { useData } from "./PostProvider";

export default function PlaylistModal() {
  const { myPlaylists, addSongToPlaylist, setShowPlaylistModal } = useData();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl w-full max-w-sm p-6 text-white transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Select Playlist
        </h2>

        <div className="space-y-2">
          {myPlaylists.map((pl) => (
            <button
              key={pl._id}
              onClick={() => addSongToPlaylist(pl._id)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 border border-purple-500/20"
            >
              {pl.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowPlaylistModal(false)}
          className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-gray-200 font-medium py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30 border border-gray-500/20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
