require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./src/config/db")
const mainRoute = require("./src/routes/index")
const cloudConfig = require("./src/config/cloudinary")
const PORT = process.env.PORT || 5000


db.connect()
  .then(() => {
    console.log("DB Connected!")
    // parse application/x-www-form-urlencoded
    //Create app express
    const app = express()
    app.use(express.urlencoded({
      extended: false
    }))
    // parse application/RAW JSON
    app.use(express.json())
    // Morgan
    if (process.env.MORGAN_PACKAGE !== "production") {
      const morgan = require("morgan")
      app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
    }

    //Cloudinary
    app.use(cloudConfig)
    app.use(express.static("public"));
    // Route

    //CORS
    // install CORS
    const corsOptions = {
      origin: ['http://192.168.43.191:3000', 'http://localhost:3000', 'https://dizzycoffeeshop.netlify.app'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
      allowedHeader: ['Content-Type', 'x-access-token']
    }
    app.use(cors(corsOptions))

    // app.use(function (req, res, next) {
    //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //   res.setHeader('Access-Control-Allow-Headers', 'x-access-token,content-type');
    //   res.setHeader('Access-Control-Allow-Credentials', true);

    //   next();
    // });
    app.use("/api", mainRoute)
    //Error Handling When URL is Wrong
    app.use((req, res) => {
      res.status(403).send({
        message: "URL is wrong!"
      })
    })
    app.listen(PORT, () => console.log(`Port listening on port ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })

//Running app express