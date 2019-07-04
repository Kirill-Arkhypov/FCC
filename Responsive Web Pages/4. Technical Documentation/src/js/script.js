let navlinks = document.getElementById("navlinks"),
    links = navlinks.querySelectorAll("a");

links.forEach( i => {
  i.addEventListener("click", toggler);
});

function toggler() {
  document.getElementById("navbar").classList.toggle("closed");
}

function myFunction(x) {
  x.classList.toggle("change");
  document.getElementById("navbar").classList.toggle("closed");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// (function menuToggle() {

//     document.querySelector('.burger-menu__input').addEventListener('click', () => {
//         const nav = document.querySelector('.navbar__links');
//         if (!nav.classList.contains('show')) {
//             nav.classList.add('show');
//         } else {
//             nav.classList.remove('show');
//         }
//     });
// })();

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// let button = document.getElementById('hamburger-menu'),
//     span = button.getElementsByTagName('span')[0];

// button.onclick =  function() {
//   span.classList.toggle('hamburger-menu-button-close');
// };

// $('#hamburger-menu').on('click', toggleOnClass);

// function toggleOnClass(event) {
//   var toggleElementId = '#' + $(this).data('toggle'),
//   element = $(toggleElementId);

//   element.toggleClass('on');

// }

// // close hamburger menu after click a
// $( '.menu li a' ).on("click", function(){
//   $('#hamburger-menu').click();
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// (function() {
 
//   let hamburger = {
//     navToggle: document.querySelector('.nav-toggle'),
//     nav: document.querySelector('nav'),
 
//     doToggle: function(e) {
//       e.preventDefault();
//       this.navToggle.classList.toggle('expanded');
//       this.nav.classList.toggle('expanded');
//     }
//   };

//   hamburger.navToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });
//   hamburger.nav.addEventListener('click', function(e) { hamburger.doToggle(e); });
// }());
