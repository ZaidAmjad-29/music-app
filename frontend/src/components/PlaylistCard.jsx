import { useData } from "./PostProvider";

export default function PlaylistCard() {
  const { playlists, handleViewPlaylist } = useData();
  // console.log(playlists);
  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-10 bg-gradient-to-r from-white to-purple-300 bg-clip-text ">
          More of what you like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              onClick={() => handleViewPlaylist(playlist)}
              className="group relative bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/40 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer"
            >
              {/* Playlist Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={`http://localhost:4000${playlist.coverImage}`}
                  alt={playlist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              </div>

              {/* Playlist info */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Songs by {playlist.user.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
