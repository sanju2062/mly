const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;

// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "app.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/static/(.*)",
//       "dest": "/static/$1"
//     },
//     {
//       "src": "/a(.*)",
//       "dest": "/a$1"
//     },
//     {
//       "src": "/api/url(.*)",
//       "dest": "/api/url$1"
//     },
//     {
//       "src": "/(.*)",
//       "dest": "/"
//     }
//   ]
// }
