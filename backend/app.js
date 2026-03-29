// configure express and middleware

//import packages
//create express app
//use middleware
//export app

//import express
const express = require("express")


//create express app
const app = express()

//import middleware packages
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth")

//use middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/user", authRoutes)


//http://localhost:8000/
app.get("/", (req, res) => {
    res.send("Server is running")
})

//import routes
// app.use

//export app
module.exports = app
