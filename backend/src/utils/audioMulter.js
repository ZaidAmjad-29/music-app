const multer = require("multer");
const path = require("path");


const AUDIO_MIME_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-wav", "audio/x-m4a"];
const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "audioFile") {
      cb(null, "src/public/songs");
    } else if (file.fieldname === "coverImage") {
      cb(null, "src/public/coverImage");
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "audioFile") {
    if (AUDIO_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid audio file type. Only mp3, wav, etc. are allowed."), false);
    }
  } else if (file.fieldname === "coverImage") {
    if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image file type. Only jpg, jpeg, png, webp are allowed."), false);
    }
  } else {
    cb(new Error("Invalid field name."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
