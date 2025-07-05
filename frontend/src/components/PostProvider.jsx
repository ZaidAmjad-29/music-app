import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import useDebounce from "../services/hook";
import api from "../services/api";
import toast from "react-hot-toast";

const PostContext = createContext();

function PostProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);
  const [songsInPlaylist, setSongsInPlaylist] = useState([]);

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
  const [playlistImage, setPlaylistImage] = useState(null);

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
  const [coverImage, setCoverImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
        // console.log(res.data);
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove favorite");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const songsRes = await api.get("/songs");
        const playlistsRes = await api.get("/playlists");

        setSongs(songsRes.data.data);
        setPlaylists(playlistsRes.data.data);
        setIsLoading(false);
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
      const res = await api.get(`/playlist/${playlistId}`);
      console.log(res.data.data);
      setSongsInPlaylist(res.data.data);

      toast.success("Added to playlist.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      setShowPlaylistModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add song to playlist");
    }
  };
  const fetchFavoriteSongs = async () => {
    const res = await api.get("/favorites");
    setFavorites(res.data.data);
  };

  const addToFavorites = async (songId) => {
    try {
      await api.post(`/favorite/${songId}`);

      toast.success("Added to favorites.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      await fetchFavoriteSongs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to favorites");
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

  const handleViewPlaylist = async (playlist) => {
    try {
      const res = await api.get(`/playlist/${playlist._id}`);
      setSongsInPlaylist(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load playlist");
    }
    setViewingPlaylist(playlist);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeSignin = (e) => {
    setSignInForm({ ...signInform, [e.target.name]: e.target.value });
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
      toast.success("Profile updated.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error("Failed to update profile");
    }
  };

  const fetchSongs = async () => {
    const res = await api.get("/songs");
    setSongs(res.data.data);

    console.log(songs);
  };

  const handleSubmitSong = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      toast.error("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("audioFile", audioFile);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      const res = await api.post("/song", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Song uploaded successfully.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      await fetchSongs();
      // const userRes = await api.get("/me");
      // setUser(userRes.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const fetchAllPlaylists = async () => {
    const res = await api.get("/playlists");
    console.log(res.data);
    setPlaylists(res.data.data);
  };

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

      toast.success("Playlist created!.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      setShowPlaylists((prev) => [...prev, response.data.data]);
      setNewPlaylistName("");
      setPlaylistImage();

      const res = await api.get("/me");
      setShowPlaylists(res.data.data.user.playlists);
      await fetchAllPlaylists();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create playlist");
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
        songsInPlaylist,
        isLoading,
        // newPlaylistName,
        playlistImage,
        setNewPlaylistName,
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
        // setNewPlaylistName,
        setNewPassword,
        setPlaylistImage,
        setStatusMessage,
        setEmail,
        setMessage,
        setNewCommentText,
        setViewingPlaylist,
        setSearchTerm,
        setShowPlaylistModal,
        setCoverImage,
        handlePlay,
        openAddToPlaylistModal,
        handleSubmit,
        addSongToPlaylist,
        addToFavorites,
        createPlaylist,
        removeFavorite,
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
