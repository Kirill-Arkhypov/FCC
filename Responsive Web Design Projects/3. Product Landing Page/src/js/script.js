window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    document.getElementById("header__menu").style.opacity = "0.8";
  } else {
    document.getElementById("header__menu").style.opacity = "1";
  }
}


function myFunction(x) {
  x.classList.toggle("change");
  document.getElementById("nav-bar").classList.toggle("closed");
}
