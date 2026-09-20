import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './public/images')
  },
  filename: function(req, file, cb){
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

import fs from "fs";

const uploadDir = "./public/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000,
  },
});

export const uplaod = upload;