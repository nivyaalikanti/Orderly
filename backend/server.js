// start the server

//load environment variables from .env file
//start the server

//import the app
const app = require("./app")
const connectDatabase = require("./db")

//import dotenv 
const dotenv = require("dotenv")

//load environment variables from .env file
dotenv.config({path: "./config/config.env"})

//connect to database
connectDatabase()

//start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

