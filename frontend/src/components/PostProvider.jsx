import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import useDebounce from "../services/hook";
import api from "../services/api";

const PostContext = createContext();

function PostProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);

  const [commentsModalSong, setCommentsModalSong] = useState(null);
  const [songComments, setSongComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  const [viewingPlaylist, setViewingPlaylist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [favorites, setFavorites] = useState([]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [signInform, setSignInForm] = useState({ email: "", password: "" });

  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const [showPlaylists, setShowPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editImage, setEditImage] = useState(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const debouncedSearch = useDebounce(query, 500);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  //   const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/forgot-password", { email });

      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to send reset email");
    }
  };

  useEffect(() => {
    const fetchMatchingSongs = async () => {
      if (!debouncedSearch.trim()) {
        setResults([]);
        return;
      }

      setIsFetching(true);
      try {
        const res = await api.get(`/search?query=${debouncedSearch}`);
        setResults(res.data.data);
      } catch (error) {
        console.error("Error searching songs:", error);
        setResults([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMatchingSongs();
  }, [debouncedSearch]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        console.log(res.data);
        setFavorites(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (songId) => {
    try {
      await api.delete(`/favorite/${songId}`);
      setFavorites((prev) => prev.filter((song) => song._id !== songId));
      alert("Removed from favorites");
    } catch (err) {
      console.error(err);
      alert("Failed to remove favorite");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsRes = await api.get("/songs");
        const playlistsRes = await api.get("/playlists");

        setSongs(songsRes.data.data);
        setPlaylists(playlistsRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        let res;
        if (debouncedSearchTerm.trim() === "") {
          res = await api.get("/songs");
        } else {
          res = await api.get(`/search?query=${debouncedSearchTerm}`);
        }
        setSongs(res.data.data);
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };
    fetchSongs();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  const openAddToPlaylistModal = async (song) => {
    setSelectedSongForPlaylist(song);
    try {
      const res = await api.get("/me");
      setMyPlaylists(res.data.data.user.playlists);
      setShowPlaylistModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const addSongToPlaylist = async (playlistId) => {
    try {
      await api.post(`/playlist/${playlistId}`, {
        songId: selectedSongForPlaylist._id,
      });
      alert("Song added to playlist!");
      setShowPlaylistModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add song to playlist");
    }
  };

  const addToFavorites = async (songId) => {
    try {
      await api.post(`/favorite/${songId}`);
      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to favorites");
    }
  };

  const handleOpenCommentsModal = async (song) => {
    setCommentsModalSong(song);
    try {
      const res = await api.get(`/comment/${song._id}`);
      setSongComments(res.data.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleCloseCommentsModal = () => {
    setCommentsModalSong(null);
    setSongComments([]);
    setNewCommentText("");
  };

  const handleSubmitComment = async () => {
    try {
      await api.post(`/comment/${commentsModalSong._id}`, {
        text: newCommentText,
      });
      const res = await api.get(`/comment/${commentsModalSong._id}`);
      setSongComments(res.data.data);
      setNewCommentText("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comment/${commentId}`);
      setSongComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleViewPlaylist = (playlist) => {
    setViewingPlaylist(playlist);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeSignin = (e) => {
    setSignInForm({ ...signInform, [e.target.name]: e.target.value });
  };

  const createPlaylist = async () => {
    try {
      const response = await api.post("/playlist", { name: newPlaylistName });
      alert("Playlist created!");
      setShowPlaylists((prev) => [...prev, response.data.data]);
      setNewPlaylistName("");

      const res = await api.get("/me");
      setPlaylists(res.data.data.user.playlists);
    } catch (err) {
      console.error(err);
      alert("Failed to create playlist");
    }
  };

  const handleEditClick = () => {
    setEditName(user.user.name);
    setEditBio(user.user.bio);
    setShowEditModal(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("bio", editBio);
      if (editImage) {
        formData.append("profileImage", editImage);
      }

      await api.patch("/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const res = await api.get("/me");
      setUser(res.data.data);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    }
  };

  const handleSubmitSong = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("audioFile", audioFile);
    // if (coverImage) formData.append("coverImage", coverImage);

    try {
      const res = await api.post("/song", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      alert("Song uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <PostContext.Provider
      value={{
        songs,
        playlists,
        currentSong,
        showPlaylistModal,
        myPlaylists,
        songComments,
        favorites,
        viewingPlaylist,
        searchTerm,
        commentsModalSong,
        newCommentText,
        email,
        message,
        form,
        signInform,
        newPassword,
        statusMessage,
        showPlaylists,
        newPlaylistName,
        user,
        showEditModal,
        editName,
        editBio,
        editImage,
        query,
        results,
        isFetching,
        title,
        artist,
        genre,
        audioFile,
        setAudioFile,
        setGenre,
        setArtist,
        setTitle,
        setQuery,
        setEditImage,
        setEditBio,
        setEditName,
        setShowEditModal,
        setUser,
        setShowPlaylists,
        setNewPlaylistName,
        setNewPassword,
        setStatusMessage,
        setEmail,
        setMessage,
        setNewCommentText,
        setViewingPlaylist,
        setSearchTerm,
        setShowPlaylistModal,
        handlePlay,
        openAddToPlaylistModal,
        handleSubmit,
        addSongToPlaylist,
        addToFavorites,
        removeFavorite,
        createPlaylist,
        handleOpenCommentsModal,
        handleCloseCommentsModal,
        handleSubmitComment,
        handleDeleteComment,
        handleViewPlaylist,
        handleChange,
        handleChangeSignin,
        handleEditClick,
        handleUpdateProfile,
        handleSubmitSong,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function useData() {
  const context = useContext(PostContext);
  return context;
}

export { PostProvider, useData };
