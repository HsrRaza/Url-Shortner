const express = require("express");
const {handleGenerateNewShortUrl} = require("../controllers/url.controller")


const router = express.Router();

router.post('/', handleGenerateNewShortUrl);


module.exports = router

