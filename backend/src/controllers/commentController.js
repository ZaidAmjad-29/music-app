const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");

exports.addComment = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const { id } = req.params;
  const userId = req.user._id;
  const comment = await Comment.create({ text, user: userId, song: id });
  await comment.populate("user", "name");
  console.log(comment);

  res.status(201).json({
    status: true,
    message: "comment added to song",
    data: comment,
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ song: req.params.id }).populate("user");
  if (!comments) return next(new AppError("No comments found", 404));

  res.status(200).json({
    status: true,
    data: comments,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  console.log("first", comment);
  if (!comment) return next(new AppError("Comment not found", 404));

  if (comment.user.toString() !== req.user._id.toString()) {
    return next(new AppError("You can only delete your own comments", 403));
  }

  await comment.deleteOne();

  console.log("second", comment);

  res.status(200).json({
    status: true,
    message: "Comment deleted successfully",
  });
});
