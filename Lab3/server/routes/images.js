const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { sampleSize } = require('lodash');
const fetch = require('node-fetch');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  res.json({ message: 'Files uploaded successfully', files: req.files });
});

router.get('/random-images', (req, res) => {
  const files = fs.readdirSync('./uploads/');
  const randomFiles = sampleSize(files, 3);
  const urls = randomFiles.map(file => `http://localhost:5000/${file}`);
  res.json(urls);
});

router.post('/upload-dog', async (req, res) => {
  const { imageUrl } = req.body;
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  const filename = `dog-${Date.now()}.jpg`;
  fs.writeFileSync(`./uploads/${filename}`, buffer);
  res.json({ message: 'Dog image saved', file: filename });
});

module.exports = router;