const express = require("express")
const func = require("../controllers/url.js")
const router = express.Router()
router.route("/")
    .get(func.welcomeUser)
    .post(func.handleGenerateShortUrl)
router.route("/:shortId")
    .get(func.handleRedirection)

module.exports = router