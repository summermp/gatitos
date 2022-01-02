/* 1. Grab the input value */
// http://api.giphy.com/v1/gifs/search?q=cat&api_key=dc6zaTOxFJmzC
let mybtn3=document.querySelector('#mybtn3');
document.querySelector(".js-go").addEventListener('click',function(){
    var input = document.querySelector("input").value;
   if (input) {
      getData(input);
    }
    getData();
});

document.querySelector(".js-userinput").addEventListener('keyup',function(e){
    var input = document.querySelector("input").value;
  // if the key ENTER is pressed...
  if (e.which === 13) {
    if (input) {
      getData(input);
    }
    getData();
  }
});

/* 2. do the data stuff with the API */

function getData(busqueda="funny+cat") {
    // busqueda.replace(/\s*$/, '');
     var consulta = busqueda.split(' ').join('+')
    // var url = "https://api.giphy.com/v1/gifs/search?api_key=eVh615m328x57rg53NIJzW8vfOtvtn8d&q=funny+cats";
    var url = "http://api.giphy.com/v1/gifs/search?q="+consulta+"&api_key=dc6zaTOxFJmzC";
    console.log('se busco esto: ' + consulta);

    // AJAX Request
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open( 'GET', url );
    GiphyAJAXCall.send();
    
    GiphyAJAXCall.addEventListener('load',function(e){
        var data = e.target.response;
        pushToDOM(data);
    });
}
/* 3. Show me the GIFs */
function pushToDOM(input) {
    var response = JSON.parse(input);
     var f = document.querySelector(".img-container");
    clear(f); 

    var imageUrls = response.data;
    
  let idimg = 0;
  imageUrls.forEach(function (image) {
    var src = image.images.fixed_height.url;
    console.log(src.length+" gifs found");
    var container = document.querySelector(".img-container");
    container.innerHTML +=
      "<div class=\"img-cat\">" +
      "<span class=\"gusta\"><i class=\"fas" + " " + "fa-heart\"></i></span> " +
      "<img src =\"" + src + "\" class=\"container-image\" id=\""+idimg+"\" onclick=\"corazon(this)\"/>" +
      "<div class=\"adoptar\">"+
      "<span class=\"corazon\"><i class=\"far" + " " + "fa-heart\" "
      +"onclick=\"iCorazon(this)\"></i></span> " +
          "<span class=\"llevame\" onclick=\"detalle(this)\">Adóptame 🐾</span>" +
        "</div>"+ 
      "</div > ";
    
    idimg++;
  });

  function clear(item) {
       item.innerHTML = "";
  }  

}

//START GETING data
window.onload = function () {
  getData();
  // setTimeout(() => {
  //   playsound('/music/fondo.wav');
  // }, 250);
  modalinicio.style.display = "block";
};

let uno = '1';
function iCorazon(x) {
  let corazon = document.querySelector(".corazon");
    if (uno == '1') {
        x.classList.toggle("far");
        x.classList.remove("fas");
        uno = '0';
      } else {
        x.classList.toggle("fas");
      x.classList.remove("far");
      x.style.color = "red";
        // corazon.style.backgroundColor = "red";
        uno = '1';
    }
}

let adoptar = '1';
function detalle(detalle) {
  let currentcat = detalle.parentNode.previousSibling.src;
  // console.log(detalle.parentNode.previousSibling.src);
  let link=`https://wa.me/+51950435408?text=${encodeURIComponent('Quiero adoptar este gatito (=^･ω･^=)')}`;
  let descripcion = 'Hembra / esterilizada' + '<br/>' + '4 meses' + '<br/>' +
    '<a href="'+link+'" class=\"ico-wa\" target="_blank"><i class="fab fa-whatsapp"></i></a>';
  Swal.fire({
    title: 'Mimi',
    html: descripcion,
    imageUrl: currentcat,
    imageWidth: 400,
    showConfirmButton: false,
    imageHeight: 200,
  //   iconHtml: '<img src="https://picsum.photos/24/24">',
  // customClass: {
  //   icon: 'no-border'
  // },
    imageAlt: 'Custom image'
    // button:false
  });
  
  if (adoptar == '1') {
    let cat = document.querySelector("#idimg");
    // detalle.parentNode.previousSibling.style.border ='1px solid blue';
    detalle.parentNode.previousSibling.style.filter = 'grayscale(0)';
    adoptar = '0';
  } else {
    // detalle.parentNode.previousSibling.style.border ='1px solid green';
    detalle.parentNode.previousSibling.style.filter = 'grayscale(1)';
    adoptar = '1';
  }
}

let gusta = '1';
function corazon(detalle) {
  if (gusta == '1') {
    let cat = document.querySelector("#idimg");
    // detalle.previousSibling.parentNode.style.color = 'black';
    // detalle.parentNode.firstChild.parentNode.nextSibling.classList.toggle("far");
    detalle.parentNode.firstChild.style.visibility = 'hidden';

    detalle.parentNode.lastChild.firstChild.firstChild.classList.toggle("far");
    detalle.parentNode.lastChild.firstChild.firstChild.classList.remove("fas");
    gusta = '0';
  } else {
    // detalle.previousSibling.parentNode.style.color = 'red';
    detalle.parentNode.lastChild.firstChild.firstChild.style.color = 'red';
    detalle.parentNode.lastChild.firstChild.firstChild.classList.toggle("fas");
    detalle.parentNode.lastChild.firstChild.firstChild.classList.remove("far");

    detalle.parentNode.firstChild.style.visibility = 'visible';
    setTimeout(() => {
      detalle.parentNode.firstChild.style.visibility = 'hidden';
    }, 1500);
    gusta = '1';
  }
}

mybtn3.addEventListener('click', function (e) {
  let soundcat = ['https://www.kessels.com/CatSounds/Nimbus.wav', 'http://ringelkater.de/Sounds/2geraeusche_tiere/katze_schnurrt.wav'];
  // soundcat.push('');
  
// let soundcat = 'https://assets.codepen.io/21542/howler-demo-bg-music.mp3';
// https://www.kessels.com/CatSounds/Nimbus.wav

console.log('audio');
playsound(soundcat);

let link=`https://wa.me/+51950435408?text=${encodeURIComponent('Quiero adoptar este gatito')}`;
let descripcion = '<span> WhatsApp</span> <br/> <a href="' + link + '" class=\"ico-wa\" target="_blank"><i class="fab fa-whatsapp"></i></a>';
Swal.fire({
    title: 'Contactenos!',
    text: 'WhatsApp!',
      showConfirmButton: false,
      html: descripcion,
    }
  );
});
  
function playsound(soundcat) {
    var sound = new Howl({
    src: soundcat,
    // src: ['sound.webm', 'sound.mp3', 'sound.wav'],
    autoplay: true,
    loop: false,
    volume: 0.5,
    onplay: function () {
      for (var i = 0; i < soundcat.length; i++) {
        console.log('Music ' + i);
      }  
      console.log('Playing...')
    },
    onend: function() {
      console.log('Finished!');
    }
});
}
  
function myFunction(x) {
  if (x.matches) { // If media query matches
    document.body.style.backgroundColor = "white";
  } else {
   document.body.style.backgroundColor = "white";
  }
}

var x = window.matchMedia("(max-width: 700px)")
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes 

  
//Get the button
var mybutton = document.getElementById("buttonscroll");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modalinicio = document.getElementById("myModalinicio");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementById("close1");
var span2 = document.getElementById("close2");
var span3 = document.getElementById("closeinicio");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

span2.onclick = function() {
  modal2.style.display = "none";
}

span3.onclick = function () {
  modalinicio.style.display = "none";
}

  //CAT LOVERS
  let collection = document.querySelectorAll(".img-collection");
  for (let idx = 0; idx < collection.length; idx++) {
    collection[idx].addEventListener('mouseover', (e) => {
      console.log('sound', idx);
      switch (idx) {
        case 0:
          playsound('http://ringelkater.de/Sounds/2geraeusche_tiere/katze_schnurrt.wav');
          break;
        case 1:
          playsound('https://www.kessels.com/CatSounds/kitten4.wav');
          break;
        case 2:
          playsound('https://www.kessels.com/CatSounds/cat2.wav');
          break;
        default:
          playsound('https://www.kessels.com/CatSounds/Nimbus.wav');
          break;
      }
    });
    collection[idx].addEventListener('mouseout', (e) => {
      console.log('sound stop');
    });

  }

  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modalinicio) {
    modalinicio.style.display = "none";
  }
}