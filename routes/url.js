const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  console.log("working");
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");
  console.log(baseUrl);

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      console.log("working post request");
      res.json("working post request from server");
      // let url = await Url.findOne({ longUrl });

      // if (url) {
      // res.json(url);
      // } else {
      // const shortUrl = baseUrl + "/a/" + urlCode;

      // url = new Url({
      //   longUrl,
      //   shortUrl,
      //   urlCode,
      //   date: new Date(),
      // });

      // await url.save();

      //   res.json(url);
      // }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
