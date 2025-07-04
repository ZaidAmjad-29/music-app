const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");
const jwt = require("../middlewares/requestFilter");
const upload = require("../utils/multer");

router.post(
  "/playlist",
  jwt.checkRequest,
  upload.single("playlistImage"),
  playlistController.createPlaylist
);
router.get("/playlists", jwt.checkRequest, playlistController.getAllPlaylists);
router.get(
  "/playlist/:id",
  jwt.checkRequest,
  playlistController.getPlaylistById
);
router.post(
  "/playlist/:id",
  jwt.checkRequest,
  playlistController.addSongToPlaylist
);
router.patch(
  "/playlist/:id",
  jwt.checkRequest,
  playlistController.removeSongFromPlaylist
);
router.get(
  "/user-playlists",
  jwt.checkRequest,
  playlistController.getUserPlaylists
);

module.exports = router;
