'use strict';

// Make navbar transparent when it is on the page
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('scrolled');
  }else {
    navbar.classList.remove('scrolled');
  }
});

// Make home contents slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = (1 - window.scrollY / homeHeight);
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Handle click on "contact me" button on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  }else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Handle click on the work category buttons
const categories = document.querySelector('.work__categories');
const categoryBtns = document.querySelectorAll('.category__btn');
const projectDisplay = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');  
categories.addEventListener('click', (event) => {
  const clickedCategory = event.target.dataset.category || event.target.parentNode.dataset.category;
  if (clickedCategory == null) {
    return;
  }
  projects.forEach((project) => {
    const classList = project.classList;
    if (clickedCategory === 'all' || clickedCategory === project.dataset.type) {
      classList.remove('display-none');
    } else {
      classList.add('display-none');
    }
  });
  categoryBtns.forEach((btn) => {
    const classList = btn.classList;
    if (btn.dataset.category === clickedCategory) {
      classList.toggle('active', true);
    } else {
      classList.toggle('active', false);
    }
  });
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  if (selector === '#home') {
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }
}