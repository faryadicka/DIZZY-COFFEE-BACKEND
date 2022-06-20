const cloudinary = require("cloudinary").v2

const cloudConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });
  next();
};

module.exports = cloudConfig;