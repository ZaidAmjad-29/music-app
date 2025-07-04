const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Playlist name is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  playlistImage: {
    type: String,
    default: "/public/playlistImage/defaultPlaylistImage.png",
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);
