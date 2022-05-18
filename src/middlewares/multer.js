const multer = require("multer")
const path = require("path")
const {onFailed} = require("../helpers/response")

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image")
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const fileName = `${file.fieldname}-${suffix}${path.extname(file.originalname)}`
    cb(null, fileName)
  }
})

const limits = {
  fileSize: 2e6
}

const imageFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname)
  const allowedExt = /jpg|png/
  if(!allowedExt.test(extName)) return cb("INVALID_EXTENTION", false)
  return cb(null, true)
}

const data = multer({
  storage: imageStorage,
  limits,
  fileFilter: imageFilter
})

const upload = multer(data).single("image")
const imageUpload = async(req, res, next) => {
  await upload(req, res, (error) => {
    if(error) {
      if(error == "INVALID_EXTENTION") return onFailed(res, 500, "ONLY ALLOWED EXTENTION JPG OR PNG")
      if(error.code === "LIMIT_FILE_SIZE") return onFailed(res, 500, "Image size too large, allowed size is 2MB")
      if(error.code === "ENOENT") return onFailed(res, 500, "No such file")
      return onFailed(res, 500, "Internal Sever Errors")
    }
    next()
  })
}

module.exports = {imageUpload}