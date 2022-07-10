var FfmpegCommand = require("fluent-ffmpeg");
var open = require("open");

const convertToMp3 = async (videoFilePath, audioDestinationPath) => {
  return new Promise((resolve, reject) => {
    var command = new FfmpegCommand(videoFilePath);
    command.toFormat("mp3").save(audioDestinationPath);
  });
};

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/convert", async (req, res) => {
  await convertToMp3(
    `VIDEO/${req.query.videoFilePath}`,
    `MP3/${req.query.outputName}.mp3`
  );
  res.redirect("/terminate");
});

app.get("terminate", (req, res) => {
  res.sendStatus(200);
  process.abort();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

open("http://localhost:3000");
