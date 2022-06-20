const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
const path = require("path")
const { onFailed } = require("../helpers/response")

// const {
//   CLOUD_NAME,
//   CLOUD_KEY,
//   CLOUD_SECRET,
// } = process.env;

// let storage;


const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'dizzy/uploads',
  }
})

// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/image")
//   },
//   filename: (req, file, cb) => {
//     const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
//     const fileName = `${file.fieldname}-${suffix}${path.extname(file.originalname)}`
//     cb(null, fileName)
//   }
// })

const limits = {
  fileSize: 2e6
}

const imageFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname)
  const allowedExt = /jpg|png/
  if (!allowedExt.test(extName)) return cb("INVALID_EXTENTION", false)
  return cb(null, true)
}

exports.imageUpload = (key) => {
  const upload = multer({
    storage: cloudinaryStorage,
    limits,
    fileFilter: imageFilter
  }).single(key)

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        if (err === "INVALID_EXTENTION") return onFailed(res, 500, "ONLY ALLOWED EXTENTION JPG OR PNG", err)
        if (err === "LIMIT_FILE_SZIE") return onFailed(res, 500, "Image size too large, allowed size is 2MB", err)
        return onFailed(res, 500, "Internal Sever Errors", err)
      }
      next()
    })
  }
}
