import { useData } from "./PostProvider";

export default function PlaylistCard() {
  const { playlists, handleViewPlaylist } = useData();
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Playlists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="border rounded p-2 bg-gray-50">
            <h3 className="font-semibold">{playlist.name}</h3>
            <p className="text-sm text-gray-500">
              {playlist.songs.length} songs by {playlist.user.name || "Unknown"}
            </p>
            <button
              onClick={() => handleViewPlaylist(playlist)}
              className="bg-purple-500 text-white px-3 py-1 rounded mt-2"
            >
              View Playlist
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
