// module imports
const express = require("express");

// file imports
const userRoutes = require("./userRoutes");
const songRoutes = require("./songRoutes");
const playlistRoutes = require("./playlistRoutes");
const favRoutes = require("./favouriteRoutes");
const commentRoutes = require("./commentRoutes");
const profileRoutes = require("./profileRoutes");

const router = express.Router();

router.use(userRoutes);
router.use(songRoutes);
router.use(playlistRoutes);
router.use(favRoutes);
router.use(commentRoutes);
router.use(profileRoutes);

module.exports = router;
