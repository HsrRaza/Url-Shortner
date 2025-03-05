const express = require("express")
const {connectToMongoDB} = require("./connect")

const urlRoute = require('./routes/url.routes')


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then( () => console.log("MongoDb Connected"))


app.use("/url", urlRoute)

app.listen(PORT,() => console.log( `Server started at PORT ${PORT}`))