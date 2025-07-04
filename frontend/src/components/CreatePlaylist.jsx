import api from "../services/api";
import { useData } from "../components/PostProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist() {
  const {
    // newPlaylistName,
    // setNewPlaylistName,
    // createPlaylist,
    showPlaylists,
    setShowPlaylists,
    // setPlaylistImage,
  } = useData();

  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState(null);

  const navigate = useNavigate();

  const createPlaylist = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newPlaylistName);
      if (playlistImage) {
        formData.append("playlistImage", playlistImage);
      }
      console.log(formData);

      const response = await api.post("/playlist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Playlist created!");
      setShowPlaylists((prev) => [...prev, response.data.data]);
      setNewPlaylistName("");
      setPlaylistImage();

      const res = await api.get("/me");
      setShowPlaylists(res.data.data.user.playlists);
    } catch (err) {
      console.error(err);
      alert("Failed to create playlist");
    }
  };

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
  console.log(showPlaylists);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Create & Manage Your Playlists
        </h1>

        <div className="flex items-center gap-2 mb-10">
          <input
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="New playlist name"
            className="flex-1 bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="file"
            accept="image/*"
            className="bg-green-500"
            onChange={(e) => setPlaylistImage(e.target.files[0])}
          />

          <button
            onClick={createPlaylist}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
          >
            Create
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          My Playlists
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {showPlaylists.map((playlist) => (
            <div
              key={playlist._id}
              onClick={() => handleClickPlaylist(playlist._id)}
              className="group relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-700/40 shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30 cursor-pointer"
            >
              {/* Placeholder cover image */}
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src={`http://localhost:4000${playlist.playlistImage}`}
                  alt={playlist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
                  {playlist.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {playlist.songs.length}{" "}
                  {playlist.songs.length === 1 ? "song" : "songs"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
