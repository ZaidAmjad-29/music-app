import { useData } from "./PostProvider";

export default function CommentModal() {
  const {
    handleCloseCommentsModal,
    commentsModalSong,
    songComments,
    handleDeleteComment,
    setNewCommentText,
    newCommentText,
    handleSubmitComment,
  } = useData();
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
          <button
            onClick={handleCloseCommentsModal}
            className="absolute top-2 right-3 text-gray-600 text-lg"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-2">
            {commentsModalSong.title} - Comments
          </h2>
          <div className="max-h-60 overflow-y-auto space-y-2 mb-3">
            {songComments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
              songComments.map((c) => (
                <div
                  key={c._id}
                  className="bg-gray-100 p-2 rounded flex justify-between items-start"
                >
                  <div>
                    <p className="text-sm">
                      <strong>{c.user.name}</strong>: {c.text}
                    </p>
                  </div>
                  <button
                    className="text-red-500 text-xs hover:underline"
                    onClick={() => handleDeleteComment(c._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border p-2 rounded text-sm mb-2"
          ></textarea>
          <button
            onClick={handleSubmitComment}
            className="bg-green-500 text-white px-3 py-1 rounded w-full text-sm"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </>
  );
}
