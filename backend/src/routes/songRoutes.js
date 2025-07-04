const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");
const jwt = require("../middlewares/requestFilter");
const upload = require("../utils/audioMulter");

router.post(
  "/song",
  jwt.checkRequest,
  upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  songController.uploadSong
);

router.get("/songs", jwt.checkRequest, songController.getAllSongs);
router.get("/search",  jwt.checkRequest, songController.searchSongs);


module.exports = router;
