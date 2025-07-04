import { useData } from "./PostProvider";

export default function UploadSong() {
  const {
    title,
    setTitle,
    artist,
    setArtist,
    genre,
    setGenre,
    setAudioFile,
    setCoverImage, 
    handleSubmitSong,
  } = useData();

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6 text-purple-300">Upload a Song</h2>
      <form onSubmit={handleSubmitSong} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded p-3 focus:outline-none focus:border-purple-500 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded p-3 focus:outline-none focus:border-purple-500 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded p-3 focus:outline-none focus:border-purple-500 placeholder-gray-500"
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          className="bg-gray-800 border border-gray-700 rounded p-3 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="bg-gray-800 border border-gray-700 rounded p-3 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
