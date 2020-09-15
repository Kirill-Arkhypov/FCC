window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    document.getElementById("navbar").style.backgroundColor = 'rgba(6, 22, 52, 0.5)';
  } else {
    document.getElementById("navbar").style.backgroundColor = 'rgba(6, 22, 52, 0)';
  }
}