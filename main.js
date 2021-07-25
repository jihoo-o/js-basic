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

const navbarMenu = document.querySelector('.navbar__menu');
const contactBtn = document.querySelector('.home__contact');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const skills = document.querySelector('#skills');
const work = document.querySelector('#work');
const testimonials = document.querySelector('#testimonials');
const contact = document.querySelector('#contact');
function onBtnClick(event) {
  const link = event.target.dataset.link;
  console.log(link);
  if (link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  if (link === '#home') {
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }
}
navbarMenu.addEventListener('click', onBtnClick);
contactBtn.addEventListener('click', onBtnClick);