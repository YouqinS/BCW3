function uploadOrNot() {
  if (document.querySelector("input[type=file]").files[0]){
    let input = document.querySelector("input[type=file]");
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        display(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  } else if (document.querySelector("input[type=text]").value){
    display(document.querySelector("input[type=text]").value);
  }
}

function display(res) {
  let img = document.createElement("IMG");
  img.src=res;
  document.querySelector("#result").appendChild(img);
}