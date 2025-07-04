const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");
const jwt = require("../middlewares/requestFilter");

router.post("/playlist", jwt.checkRequest, playlistController.createPlaylist);
router.get("/playlists", jwt.checkRequest, playlistController.getAllPlaylists);
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
router.get("/user-playlists", jwt.checkRequest, playlistController.getUserPlaylists)

module.exports = router;
