import { useData } from "./PostProvider";
import { Play, ListPlus, Heart, MessageCircle, Music } from "lucide-react";
import Loader from "./Loader";

export default function SongCard() {
  const {
    songs,
    handlePlay,
    openAddToPlaylistModal,
    addToFavorites,
    handleOpenCommentsModal,
    // isLoading,
  } = useData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
      {/* {isLoading && <Loader />} */}

      {songs.map((song, idx) => (
        <div
          key={idx}
          className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 p-4 flex flex-col hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
        >
          <div className="relative mb-4 overflow-hidden rounded-xl">
            <img
              src={`http://localhost:4000${song.coverImage}`}
              alt={song.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex-1 mb-4">
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors duration-200">
              {song.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3 line-clamp-1">
              {song.artist}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handlePlay(song)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm py-2.5 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Play Now
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => openAddToPlaylistModal(song)}
                className="flex items-center justify-center gap-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 text-xs py-2 rounded-lg transition-all duration-200 border border-green-600/20 hover:border-green-600/40"
                title="Add to Playlist"
              >
                <ListPlus className="w-4 h-4" />
              </button>

              <button
                onClick={() => addToFavorites(song._id)}
                className="flex items-center justify-center gap-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 text-xs py-2 rounded-lg transition-all duration-200 border border-red-600/20 hover:border-red-600/40"
                title="Add to Favorites"
              >
                <Heart className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenCommentsModal(song)}
                className="flex items-center justify-center gap-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 text-xs py-2 rounded-lg transition-all duration-200 border border-blue-600/20 hover:border-blue-600/40"
                title="Comments"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Music className="w-4 h-4 text-purple-400" />
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
