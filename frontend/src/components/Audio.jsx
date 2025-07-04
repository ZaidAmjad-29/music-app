import { useData } from "./PostProvider";
import { Music } from "lucide-react";

export default function Audio() {
  const { currentSong } = useData();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 shadow-2xl px-6 py-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-3 text-white">
        <div className="bg-purple-600/20 p-2 rounded-full flex items-center justify-center">
          <Music className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="text-xl font-bold text-purple-300 line-clamp-1">
            {currentSong.title}
          </p>
          <p className="text-lg text-gray-400 line-clamp-1">
            {currentSong.artist}
          </p>
        </div>
      </div>
      <audio
        controls
        autoPlay
        src={`http://localhost:4000${currentSong.audioFile}`}
        className="w-64 md:w-80 lg:w-[28rem] rounded overflow-hidden bg-gray-800/30"
      ></audio>
    </div>
  );
}
