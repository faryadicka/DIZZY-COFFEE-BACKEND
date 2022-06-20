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
    //CORS
    // install CORS
    const corsOptions = {
      origin: '*'
    }
    app.use(cors(corsOptions))
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