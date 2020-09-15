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
