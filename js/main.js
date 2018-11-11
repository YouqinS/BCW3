
const express = require('express'); //require the function from the express library   server?
const app = express(); //create a constant of object express()

app.get('/', (req, res) => { //call function get  //request from client, response from server
  res.send('Hello World')
});

app.listen(3000);

//const express = require('express');
const fileUpload = require('express-fileupload');
//const app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/tmp/sample.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});