import { useData } from "./PostProvider";

export default function UserSongs() {
  const { user } = useData();
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">Uploaded Songs</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {user.user.uploadedSongs?.map((song) => (
          <div key={song._id} className="border rounded p-2 flex flex-col">
            <img
              src={`http://localhost:4000${song.coverImage}`}
              alt={song.title}
              className="w-35 h-35 object-cover rounded mb-2"
            />
            <h4 className="font-medium">{song.title}</h4>
            <p className="text-sm text-gray-500">{song.artist}</p>
            <audio
              controls
              style={{ width: "120px" }}
              className="mt-2 w-full"
              src={`http://localhost:4000${song.audioFile}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
