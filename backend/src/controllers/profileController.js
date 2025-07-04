const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const Song = require("../models/songModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select("-password");
  if (!user) return next(new AppError("User not found", 404));

  const songs = await Song.find({ userId: userId });

  const playlists = await Playlist.find({ userId: userId }).populate("songs");

  res.status(200).json({
    status: true,
    data: {
      user,
      songs,
      playlists,
    },
  });
});

exports.getLogedInUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
    .populate("uploadedSongs")
    .populate("playlists");
  // .populate("user");
  if (!user) return next(new AppError("User not found", 404));
  // console.log(user.uploadedSongs);
  const playlists = await Playlist.find({ userId: userId }).populate(
    "songs user"
  );

  res.status(200).json({
    status: true,
    data: {
      user,
      playlists,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const updateData = {
    name: req.body.name,
    bio: req.body.bio,
  };

  if (req.file) {
    updateData.profileImage = "/public/profiles/" + req.file.filename; // Adjust if using a
    // different folder
  }

  // console.log(updateData);

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});
