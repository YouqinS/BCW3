//client code: send requests
//server code: to upload file, handle client requests, respond with responses




const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.port ||3000; //const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:false}));  //??
app.use(bodyParser.json());
app.use('/', express.static(__dirname)+'/public');


//MULTER CONFIG: to get file photos to temp server storage
const multerConfig ={

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next) {
      next(null, './public/photo');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }

  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
    if(!file){
      next();
    }

    // only permit image mimetypes
    const image = file.mimetype.startsWith('image/');
    if(image){
      console.log('photo uploaded');
      next(null, true);
    }else{
      console.log("file not supported")
      //TODO:  A better message response to user on failure.
      return next();
    }
  }

};



/* ROUTES
**********/
app.get('/', function(req, res){
  res.render('index.html');
});

app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
      //Here is where I could add functions to then get the url of the new photo
      //And relocate that to a cloud storage solution with a callback containing its new url
      //then ideally loading that into your database solution.   Use case - user uploading an avatar...
      res.send('Complete! Check out your public/photo-storage folder.  Please note that files not encoded with an image mimetype are rejected. <a href="index.html">try again</a>');
    }

);

// RUN SERVER
app.listen(port,function(){
  console.log(`Server listening on port ${port}`);
});








// var upload = multer({ dest: 'uploads/' });
//
//
// app.post('/public', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// });
//
// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// });
//
// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// });





//In case you need to handle a text-only multipart form, you should use the .none() method:

/*    var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/profile', upload.none(), function (req, res, next) {
  // req.body contains the text fields
})*/
