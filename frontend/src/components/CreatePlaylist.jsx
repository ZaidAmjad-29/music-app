import api from "../services/api";
import { useData } from "../components/PostProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist() {
  const {
    newPlaylistName,
    setNewPlaylistName,
    createPlaylist,
    showPlaylists,
    setShowPlaylists,
  } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await api.get("/me");
        setShowPlaylists(res.data.data.user.playlists);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylists();
  }, []);

  const handleClickPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <>
      <div className="mb-4">
        <input
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name"
          className="border p-1 mr-2"
        />
        <button
          onClick={createPlaylist}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Create
        </button>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Playlists</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {showPlaylists.map((playlist) => (
            <div
              key={playlist._id}
              className="border rounded p-3 cursor-pointer hover:shadow-md transition"
              onClick={() => handleClickPlaylist(playlist._id)}
            >
              <h2 className="font-semibold">{playlist.name}</h2>
              <p className="text-gray-500">{playlist.songs.length} songs</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
