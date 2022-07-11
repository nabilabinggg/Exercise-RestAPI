const express = require("express");
const router = express.Router();
const { Video} = require("../models/video");

//GET ALL DATA VIDEOS
router.get("/", (req, res) => {
  Video.find()
    .then((videos) => res.send(videos))
    .catch((error) => {
      res.status(500).send("Something went Wrong!");
    });
});

//GET DATA VIDEOS BY ID
router.get("/:videoId", async (req, res) => {
  const video = await Video.findById(req.params.videoId);
  if(!video) res.status(404).send("Video not found")
  res.send(video)
});

module.exports = router;
