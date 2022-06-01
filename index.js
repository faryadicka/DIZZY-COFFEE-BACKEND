require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const db = require("./src/config/db")
const mainRoute = require("./src/routes/index")
const PORT = 5000


db.connect()
  .then(() => {
    console.log("DB Connected!")
    //Create app express
    const app = express()
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({
      extended: false
    }))
    // parse application/RAW JSON
    app.use(express.json())
    // Morgan
    app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
    app.use(cors())
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