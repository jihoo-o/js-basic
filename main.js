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
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggle = document.querySelector('.navbar__toggle-btn');
navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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
  const target = event.target.nodeName === 'BUTTON' ? event.target :
                    event.target.parentNode;
  const clickedCategory = target.dataset.category;
  if (clickedCategory == null) {
    return;
  }
  projectDisplay.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      const classList = project.classList;
      if (clickedCategory === 'all' || clickedCategory === project.dataset.type) {
        classList.remove('invisible');
      } else {
        classList.add('invisible');
      }
    });
    projectDisplay.classList.remove('anim-out');
  }, 300);
  // Change button state
  const activeBtn = document.querySelector('.selected');
  activeBtn.classList.remove('selected');
  target.classList.add('selected');
});

// scrollspy
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
const options = { 
  root: null,
  rootMargin: '0px',
  threshold: 0.3 };
let selectedNavIndex = 0;
let selectedNavItem = navItems[selectedNavIndex];

function selectNavItem(selected) {
  if (selectedNavItem) {
    selectedNavItem.classList.remove('active');
  }
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function observerCallback(entries) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio && !entry.isIntersecting) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1 <= 0 ? 0 : index - 1;
      }
    }
  })
}

const io = new IntersectionObserver(observerCallback, options);
sections.forEach(section => io.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (window.scrollY + window.innerHeight ===
    document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  if (selector === '#home') {
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}