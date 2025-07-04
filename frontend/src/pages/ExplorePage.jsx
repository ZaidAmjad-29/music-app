import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";
import CommentModal from "../components/CommentModal";
import ViewPlaylist from "../components/ViewPlaylist";
import Audio from "../components/Audio";
import PlaylistModal from "../components/PlaylistModal";

import { Link } from "react-router-dom";
import { useData } from "../components/PostProvider";

export default function ExplorePage() {
  const { currentSong, showPlaylistModal, viewingPlaylist, commentsModalSong } =
    useData();

  return (
    <div className="p-4">
      <SearchBar />

      <Link to="/profile">Your Profile</Link>
      <Link to="/search"> Search Songs</Link>
      <SongCard />
      <PlaylistCard />

      {commentsModalSong && <CommentModal />}

      {viewingPlaylist && <ViewPlaylist />}

      {currentSong && <Audio />}

      {showPlaylistModal && <PlaylistModal />}
    </div>
  );
}
