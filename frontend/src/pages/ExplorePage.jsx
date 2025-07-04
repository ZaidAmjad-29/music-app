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
      <h1 className="text-2xl font-bold mb-4">Explore Songs</h1> <SongCard />
      <PlaylistCard />
      {commentsModalSong && <CommentModal />}
      {viewingPlaylist && <ViewPlaylist />}
      {currentSong && <Audio />}
      {showPlaylistModal && <PlaylistModal />}
    </div>
  );
}
