'use strict';

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected byt the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted




const message = document.querySelector('#message');
const input = document.querySelector('input[type="file"]');
const submit = document.querySelector('input[type="submit"]');
const data = new FormData();
const form = document.querySelector('#uploadForm');

form.addEventListener('click', function(event){
  // - prevents the form from sending

  event.preventDefault();

  if(input.files.length === 0){
    //submit.disabled = true;
  }else {
    message.innerHTML = 'Upload in progress...';
    data.append('fileToUpload', input.files[0]);

    fetch('http://10.114.32.120/node/profile', {
      method: 'POST',
      body: data
    }).then(response => response.text().then(function(text) {
      message.innerHTML = text;
    }));
  }
});




/*


const input = document.querySelector('input[type="file"]');
// make FormData -object
const data = new FormData();
// add file to FormData -object.
// Note that 'files' is an FileList object. This means that you can upload multiple files.
data.append('fileToUpload', input.files[0]);
// make an object for settings
const settings = {
  method: 'POST',
  // credentials: 'same-origin', // this might be needed for some servers
  body: data
};
// initiate fetch. In this example the server responds with text.
// Response could also be json. Then you would use response.json()
fetch('https://10.114.32.120'/!*'url_to_server'*!/, settings).then((response) => {
  return response.json();
}).then((json) => {
  console.log(json);

 message.innerHTML=json;
});
*/



/*
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
});*/