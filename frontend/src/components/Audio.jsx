import { useData } from "./PostProvider";

export default function Audio() {
  const { currentSong } = useData();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex items-center justify-between">
      <div>
        <strong>{currentSong.title}</strong> - {currentSong.artist}
      </div>
      <audio
        controls
        autoPlay
        src={`http://localhost:4000${currentSong.audioFile}`}
      ></audio>
    </div>
  );
}
