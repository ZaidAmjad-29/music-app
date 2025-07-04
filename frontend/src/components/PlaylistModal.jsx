import { useData } from "./PostProvider";

export default function PlaylistModal() {
  const { myPlaylists, addSongToPlaylist, setShowPlaylistModal } = useData();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="font-bold mb-2">Select Playlist</h2>
        {myPlaylists.map((pl) => (
          <button
            key={pl._id}
            className="block w-full text-left py-1 border-b"
            onClick={() => addSongToPlaylist(pl._id)}
          >
            {pl.name}
          </button>
        ))}
        <button
          onClick={() => setShowPlaylistModal(false)}
          className="mt-2 text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
