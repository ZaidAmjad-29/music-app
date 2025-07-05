const Playlist = require("../models/playlistModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.createPlaylist = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user._id;
  let imagePath = "";
  if (req.file) {
    imagePath = `/public/playlistImage/${req.file.filename}`;
  } else {
    imagePath = "/public/playlistImage/defaultPlaylistImage.png";
  }

  const playlist = await Playlist.create({
    name,
    user: userId,
    playlistImage: imagePath,
  });

  const user = await User.findById(req.user._id);
  user.playlists.push(playlist._id);
  await user.save();

  res.status(201).json({
    status: true,
    message: "Playlist created successfully",
    data: playlist,
  });
});

exports.getAllPlaylists = catchAsync(async (req, res, next) => {
  const playlists = await Playlist.find().populate("songs").populate("user");
  if (!playlists) return next(new AppError("no playlist found", 404));

  res.status(200).json({
    status: true,
    data: playlists,
  });
});

exports.addSongToPlaylist = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) return next(new AppError("No playlist found", 404));

  const { songId } = req.body;

  if (playlist.songs.includes(songId)) {
    return next(new AppError("Song already in playlist", 400));
  }

  playlist.songs.push(songId);
  await playlist.save();

  const populatedPlaylist = await Playlist.findById(playlist._id).populate(
    "songs"
  );

  res.status(200).json({
    status: true,
    message: "Song successfully added to playlist",
    data: populatedPlaylist,
  });
});

exports.removeSongFromPlaylist = catchAsync(async (req, res, next) => {
  const { songId } = req.body;
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) return next(new AppError("No playlist found!", 404));

  playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);

  await playlist.save();

  res.status(200).json({
    status: true,
    message: "song deleted successfully",
  });
});

exports.getUserPlaylists = catchAsync(async (req, res, next) => {
  const playlists = await Playlist.find({ userId: req.user._id }).populate(
    "songs"
  );

  res.status(200).json({
    status: true,
    results: playlists.length,
    data: playlists,
  });
});

exports.getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id)
      .populate("songs")
      .populate("user", "name profileImage bio");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({
      status: "success",
      data: playlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch playlist" });
  }
};
