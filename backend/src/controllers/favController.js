const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addFavorite = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("User not found", 404));

  if (!user.favorites.includes(req.params.id)) {
    user.favorites.push(req.params.id);
    await user.save();
    console.log(user);
  }

  res.status(200).json({ status: true, message: "Song added to favorites" });
});

exports.removeFavorite = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError("User not found", 404));

  user.favorites = user.favorites.filter(
    (songId) => songId && songId.toString() !== req.params.id
  );
  console.log(user.favorites);
  await user.save();

  res
    .status(200)
    .json({ status: true, message: "Song removed from favorites" });
});

exports.getFavorites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("favorites");
  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: true,
    results: user.favorites.length,
    data: user.favorites,
  });
});
