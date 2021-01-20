var express = require('express');
var router = express.Router();
const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');


AWS.config.loadFromPath(__dirname + "/../config/s3.json");
let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sopt-27-hk",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  })
})


router.post('/upload', upload.single("imgFile"), function(req, res, next){
  
  let imgFile = req.file;
  try {
    let imgFile = req.file;
    res.json(imgFile);

  } catch (error) {

    console.log(error)
  }
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/upload', function(req, res, next) {
  res.render('upload');
});


module.exports = router;
