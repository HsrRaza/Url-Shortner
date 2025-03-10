const express = require("express")
const path = require('path')

const { connectToMongoDB } = require("./connect")

const URL = require('./models/url.models')
const urlRoute = require('./routes/url.routes')


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDb Connected"))

    
    
    app.set("view engine", "ejs");
    app.set('views',path.resolve("./views"));
    
app.use(express.json());


app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home')
})

app.use("/url", urlRoute)


app.get('url/:shortId', async (req, res) => {
    const {shortId} = req.params;
   const entry =  await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
        }
    }
    });
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))