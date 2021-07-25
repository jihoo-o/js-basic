'use strict';

// Make navbar transparent when it is on the page
const navbar = document.querySelector('#navbar');
function onDocumentScroll() {
  const navbarHeight = navbar.getBoundingClientRect().height;
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('scrolled');
  }else {
    navbar.classList.remove('scrolled');
  }
}
document.addEventListener('scroll', onDocumentScroll);