import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";
import CommentModal from "../components/CommentModal";
import ViewPlaylist from "../components/ViewPlaylist";
import Audio from "../components/Audio";
import PlaylistModal from "../components/PlaylistModal";

import { useData } from "../components/PostProvider";

export default function ExplorePage() {
  const { currentSong, showPlaylistModal, viewingPlaylist, commentsModalSong } =
    useData();

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text ">
        Explore Songs
      </h2>
      <SongCard />
      <PlaylistCard />
      {commentsModalSong && <CommentModal />}
      {viewingPlaylist && <ViewPlaylist />}
      {currentSong && <Audio />}
      {showPlaylistModal && <PlaylistModal />}
    </div>
  );
}
