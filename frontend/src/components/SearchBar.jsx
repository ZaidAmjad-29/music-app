import { useData } from "../components/PostProvider";

export default function SearchBar() {
  const { query, setQuery, isFetching, results, debouncedSearch } = useData();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Songs</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or artist..."
        className="w-full border p-2 rounded mb-4"
      />

      {isFetching && <p>Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((track) => (
          <div key={track._id} className="border rounded p-2">
            <img
              src={`http://localhost:4000${track.coverImage}`}
              alt={track.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-semibold">{track.title}</h3>
            <p className="text-sm text-gray-500">{track.artist}</p>
          </div>
        ))}
      </div>

      {debouncedSearch && !isFetching && results.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">No songs found.</p>
      )}
    </div>
  );
}
