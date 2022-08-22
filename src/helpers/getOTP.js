const { client } = require("../configs/redis");

const setOTPRedis = () => {
  let confirmOTP = Math.random() * 1000000;
  client.set("OTP", parseInt(confirmOTP));
  client.expire("OTP", 10000)
};

const getOTPRedis = () => {
  return client.get("OTP");
};

module.exports = { getOTPRedis, setOTPRedis };