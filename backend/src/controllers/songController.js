const Song = require("../models/songModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.uploadSong = catchAsync(async (req, res, next) => {
  const { title, artist, genre } = req.body;
  const userId = req.user._id;

  const audioFile = req.files.audioFile ? req.files.audioFile[0] : null;
  const coverImage = req.files.coverImage ? req.files.coverImage[0] : null;

  if (!audioFile) {
    return next(new AppError("Audio file is required", 400));
  }

  const audioFilePath = `/public/songs/${audioFile.filename}`;
  let coverImagePath = "";

  if (coverImage) {
    coverImagePath = `/public/coverImage/${coverImage.filename}`;
  } else {
    coverImagePath = "/public/songs/default_song_img.png";
  }

  const newSong = await Song.create({
    title,
    artist,
    genre,
    audioFile: audioFilePath,
    uploadedBy: userId,
    coverImage: coverImagePath,
  });

  const user = await User.findById(userId);
  user.uploadedSongs.push(newSong._id);
  await user.save();

  res.status(201).json({
    status: true,
    message: "Song uploaded successfully",
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
