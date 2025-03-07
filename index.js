const express = require("express")
const { connectToMongoDB } = require("./connect")

const URL = require('./models/url.models')
const urlRoute = require('./routes/url.routes')


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDb Connected"))

app.use(express.json());

app.use("/url", urlRoute)


app.get('/:shortdId', async (req, res) => {
    const shortId = req.params.shortdId;
   const entry =  await URL.findByIdAndUpdate({
        shortId
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