import { useParams } from "react-router-dom";
import { useData } from "../components/PostProvider";

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const { user } = useData();

  const playlist = user.playlists.find((pl) => pl._id === id);

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{playlist.name}</h2>
      <p className="text-gray-500 mb-4">{playlist.songs.length} songs</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {playlist.songs.map((song) => (
          <div key={song._id} className="border rounded p-2">
            <img
              src={`http://localhost:4000${song.coverImage}`}
              alt={song.title}
              className="w-32 h-32 object-cover mb-1"
            />
            <h4 className="font-medium">{song.title}</h4>
            <p className="text-sm text-gray-500">{song.artist}</p>
            <audio controls src={`http://localhost:4000${song.audioFile}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
