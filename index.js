/* 1. Grab the input value */
document.querySelector(".js-go").addEventListener('click',function(){
  var input = document.querySelector("input").value;
  console.log(input);
  pushToDOM(input);

});

document.querySelector(".js-userinput").addEventListener('keyup',function(e){

  var input = document.querySelector("input").value;
  console.log(input);
  // if the key ENTER is pressed...
  if(e.which === 13) {
    pushToDOM(input);
  }

});

/* 2. do the data stuff with the API */

var url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";

// AJAX Request
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

GiphyAJAXCall.addEventListener('load',function(e){
  var data = e.target.response;
  pushToDOM(data);
 });

/* 3. Show me the GIFs */

function pushToDOM(input) {
  var response=JSON.parse(input);
  var imageUrls = response.data;
  
  imageUrls.forEach(function (image) { 
    var imageUrl = image.images.fixed_height.url;
    // var imageUrl = image.images.fixed_height.url;
    // console.log(image.images.fixed_height);
    var response=JSON.parse(input);
    
    var container = document.querySelector(".js-container");

    container.innerHTML += "<img src=\"" + imageUrl + "\" class=\"container-image\">"+ 
    "<button>Adoptar :)</button>";

    
/*

  var imageURL = response.data[0].images.fixed_height.url;
  console.log(imageURL);

  var container = document.querySelector(".js-container");
  container.innerHTML = "<img src=\"https://media3.giphy.com/media/Z1kpfgtHmpWHS/200.gif\">";

*/



});
  // var container = document.querySelector(".js-container");
  // container.innerHTML = "<img src=\""+imageUrl+"\">";
}