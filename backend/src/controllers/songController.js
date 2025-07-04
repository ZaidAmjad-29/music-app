const Song = require("../models/songModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.uploadSong = catchAsync(async (req, res, next) => {
  const { title, artist, genre } = req.body;
  const userId = req.user._id;

  if (!req.file) {
    return next(new AppError("audio file is required", 400));
  }

  const audioFilePath = `/public/songs/${req.file.filename}`;

  const newSong = await Song.create({
    title,
    artist,
    genre,
    audioFile: audioFilePath,
    uploadedBy: userId,
  });

  const user = await User.findById(req.user._id);
  user.uploadedSongs.push(newSong._id);
  await user.save();

  res.status(201).json({
    status: true,
    message: "Song uploaded successfully with default cover",
    data: newSong,
  });
});

exports.getAllSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find()
    .populate("uploadedBy", "name profileImage")
    .sort({ createdAt: -1 });

  if (!songs) return next(new AppError("no songs found", 400));

  res.status(200).json({
    status: true,
    results: songs.length,
    data: songs,
  });
});

exports.searchSongs = catchAsync(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ status: false, message: "Query is required" });
  }

  const songs = await Song.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { artist: { $regex: query, $options: "i" } },
      { genre: { $regex: query, $options: "i" } },
    ],
  }).populate("uploadedBy", "name profileImage");

  res.status(200).json({
    status: true,
    results: songs.length,
    data: songs,
  });
});
