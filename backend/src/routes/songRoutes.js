const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");
const jwt = require("../middlewares/requestFilter");
const { uploadAudio } = require("../utils/audioMulter");

router.post(
  "/song",
  jwt.checkRequest,
  uploadAudio.single("audioFile"),
  songController.uploadSong
);

router.get("/songs", jwt.checkRequest, songController.getAllSongs);
router.get("/search",  jwt.checkRequest, songController.searchSongs);


module.exports = router;
