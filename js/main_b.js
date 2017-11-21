'use strict';

// HTML contains element 'message'. This is used to show messages to users
// Select it and save it as a variable/object
const message = document.querySelector('#message');

// make function 'upload' which
const upload = (evt) => {
  // - prevents the form from sending
  evt.preventDefault();
  // - writes 'Upload in progress...' into 'message' element
  message.innerHTML = 'Upload in progress...';
  // - selects the file input field
  const input = document.querySelector('input[type="file"]');
  // - makes FormData -object and adds the file selected by the user into the object
  const data = new FormData();
  data.append('fileup', input.files[0]);
  // - send the file to the same url as in task a by using fetch -method
  // make an object for settings
  const settings = {
    method: 'POST',
    credentials: 'same-origin', // this might be needed for some servers
    body: data
  };
  fetch('http://10.114.34.133:8080/UploadTest_war/do', settings).then((response) => {
    return response.json();
  }).then((json) => {
    // - when file upload is complete, use server response to display uploaded image
    console.log(json);
    message.innerHTML = 'upload complete';
    document.querySelector('img').src = json.src;
  });
}; // function ends

// make an event listener which calls upload function when the form is submitted
document.querySelector('form').addEventListener('submit', upload);