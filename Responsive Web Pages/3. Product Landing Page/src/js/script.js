window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    document.getElementById("header__menu").style.opacity = "0.8";
  } else {
    document.getElementById("header__menu").style.opacity = "1";
  }
}


//Dropdown menu on mobile version

(function() {
 
  let hamburger = {
    navBtn: document.getElementById("navbtn"),
    navMenu: document.getElementById("nav-menu"),
 
    toggle: function(e) {
      this.navBtn.classList.toggle("change");
      this.navMenu.classList.toggle("closed");
    }
  };

  hamburger.navBtn.addEventListener("click", (e) => { hamburger.toggle(e); });
  hamburger.navMenu.addEventListener("click", (e) => { hamburger.toggle(e); });
}());
