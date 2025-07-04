const multer = require("multer");
const path = require("path");

// Storage setup
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/songs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const audioFileFilter = (req, file, cb) => {
  // Only accept audio mime types
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed!"), false);
  }
};

exports.uploadAudio = multer({
  storage: audioStorage,
  fileFilter: audioFileFilter,
});
