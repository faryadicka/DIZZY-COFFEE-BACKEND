const redis = require("redis");
const { URL_REDIS } = process.env;

const client = redis.createClient({
  url: URL_REDIS,
});

const redisConnection = async () => {
  try {
    client.on("connect", () => console.log("Client connected on redis ..."));
    client.on("ready", () => console.log("Redis client ready to use ..."));
    client.on("error", (err) => console.log("Error Message : ", err));
    await client.connect();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { client, redisConnection };