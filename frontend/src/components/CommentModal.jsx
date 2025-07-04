import { useData } from "./PostProvider";
import { Trash } from "lucide-react";

export default function CommentModal() {
  const {
    handleCloseCommentsModal,
    commentsModalSong,
    songComments,
    handleDeleteComment,
    setNewCommentText,
    newCommentText,
    handleSubmitComment,
    user,
  } = useData();

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl w-full max-w-2xl p-8 text-white transition-all duration-300">
          <button
            onClick={handleCloseCommentsModal}
            className="absolute top-4 right-5 text-gray-400 hover:text-red-500 transition-colors duration-200 text-xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-6 text-purple-400">
            {commentsModalSong.title}
            <span className="text-gray-400"> — Comments</span>
          </h2>
          <div className="max-h-96 overflow-y-auto space-y-3 mb-5 pr-1 custom-scrollbar">
            {songComments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
              songComments.map((c) => (
                <div
                  key={c._id}
                  className="bg-gray-800/60 border border-gray-700/50 p-4 rounded-xl flex justify-between items-start hover:border-purple-500/30 transition-all duration-200"
                >
                  <div>
                    <p className="text-base">
                      <span className="font-semibold text-purple-400">
                        {c.user.name}
                      </span>
                      : <span className="text-gray-300">{c.text}</span>
                    </p>
                  </div>
                  {c.user._id === user.user._id && (
                    <button
                      className="text-red-500 hover:text-red-400 transition-colors duration-200"
                      onClick={() => handleDeleteComment(c._id)}
                      title="Delete"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-200 mb-4 resize-none"
            rows={4}
          ></textarea>
          <button
            onClick={handleSubmitComment}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base font-medium py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </>
  );
}
