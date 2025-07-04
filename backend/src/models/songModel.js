const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Song must have a title"],
  },
  artist: {
    type: String,
    required: [true, "Song must have an artist"],
  },
  genre: String,
  audioFile: {
    type: String,
    required: [true, "Song must have an audio file"],
  },
  coverImage: {
    type: String,
    default: "/public/songs/default_song_img.png",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Song", songSchema);
