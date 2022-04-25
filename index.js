require("dotenv").config()
const express = require("express")
// const bodyParser = require("body-parser")
const morgan = require("morgan")
const db = require("./src/config/db")
const mainRoute = require("./src/routes/index")
const PORT = 5000

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


db.connect()
  .then(() => {
    console.log("DB Connected!")
    // Route
    app.use("/api", mainRoute)
    //Error Handling When URL is Wrong
    app.use((req, res) => {
      res.status(404).send({
        message: "URL is wrong!"
      })
    })
    app.listen(PORT, () => console.log(`Port listening on port ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
  })

//Running app express