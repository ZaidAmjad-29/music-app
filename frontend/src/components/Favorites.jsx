import { useData } from "./PostProvider";

export default function Favorites() {
  const { favorites, removeFavorite } = useData();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((song) => (
          <div key={song._id} className="border rounded p-2">
            <img
              src={`http://localhost:4000${song.coverImage}`}
              alt={song.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-500">{song.artist}</p>
            <button
              onClick={() => removeFavorite(song._id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
