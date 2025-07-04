import { useData } from "./PostProvider";

export default function UserPlaylists() {
  const { user } = useData();
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">Your Playlists</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {user.playlists?.map((playlist) => (
          <div key={playlist._id} className="border rounded p-3">
            <h4 className="font-bold mb-2">{playlist.name}</h4>
            {playlist.songs.length === 0 ? (
              <p className="text-gray-500 text-sm">No songs yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {playlist.songs.map((song, idx) => (
                  <div key={idx} className="border rounded p-1">
                    <img
                      src={`http://localhost:4000${song.coverImage}`}
                      alt={song.title}
                      className="w-full h-24 object-cover mb-1"
                    />
                    <h5 className="text-sm font-medium">{song.title}</h5>
                    <p className="text-xs text-gray-500">{song.artist}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
