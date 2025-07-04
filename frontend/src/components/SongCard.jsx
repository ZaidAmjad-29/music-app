import { useData } from "./PostProvider";

export default function SongCard() {
  const {
    songs,
    handlePlay,
    openAddToPlaylistModal,
    addToFavorites,
    handleOpenCommentsModal,
  } = useData();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {songs.map((song) => (
        <div key={song._id} className="border rounded p-2">
          <img
            src={`http://localhost:4000${song.coverImage}`}
            alt={song.title}
            className="w-full h-40 object-cover mb-2"
          />
          <h3 className="font-semibold">{song.title}</h3>
          <p className="text-sm text-gray-500">{song.artist}</p>
          <div className="flex flex-col gap-1 mt-2">
            <button
              onClick={() => handlePlay(song)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Play
            </button>
            <button
              onClick={() => openAddToPlaylistModal(song)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Add to Playlist
            </button>
            <button
              onClick={() => addToFavorites(song._id)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Add to Favorites
            </button>
            <button
              onClick={() => handleOpenCommentsModal(song)}
              className="bg-gray-700 text-white px-2 py-1 rounded"
            >
              Comments
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
