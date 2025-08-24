"use strict";

(function () {
  if (navigator.platform.includes('Win')) {
    // Activate PerfectScrollbar on specific elements if on Windows
    ['.main-content', '.sidenav', '.navbar:not(.navbar-expand-lg) .navbar-collapse', '.fixed-plugin'].forEach(selector => {
      const element = document.querySelector(selector);
      if (element) new PerfectScrollbar(element);
    });
  }
})();

// Tooltip Initialization
const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];
tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Handle input focus and defocus styling
document.querySelectorAll('.input-group input.form-control').forEach(input => {
  input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
  input.addEventListener('blur', () => input.parentElement.classList.remove('focused'));
});

// Fixed Plugin
if (document.querySelector('.fixed-plugin')) {
  const fixedPlugin = document.querySelector('.fixed-plugin');
  const toggleFixedPlugin = () => fixedPlugin.classList.toggle('show');

  ['.fixed-plugin-button', '.fixed-plugin-button-nav'].forEach(selector => {
    const button = document.querySelector(selector);
    if (button) button.addEventListener('click', toggleFixedPlugin);
  });

  document.querySelectorAll('.fixed-plugin-close-button').forEach(button => {
    button.addEventListener('click', () => fixedPlugin.classList.remove('show'));
  });

  document.body.addEventListener('click', e => {
    if (!e.target.closest('.fixed-plugin .card, .fixed-plugin-button, .fixed-plugin-button-nav')) {
      fixedPlugin.classList.remove('show');
    }
  });

  const navbar = document.getElementById('navbarBlur');
  const buttonNavbarFixed = document.getElementById('navbarFixed');

  if (navbar && navbar.getAttribute('navbar-scroll') === 'true') {
    buttonNavbarFixed.setAttribute("checked", "true");
  }
}

// Tabs Navigation
document.querySelectorAll('.nav-pills').forEach(item => {
  const movingTab = document.createElement('div');
  const firstLi = item.querySelector('li:first-child .nav-link');

  if (firstLi) {
    movingTab.className = 'moving-tab position-absolute nav-link';
    movingTab.innerHTML = '-';
    item.appendChild(movingTab);

    updateMovingTab(item, movingTab);

    item.addEventListener('mouseover', event => {
      const li = event.target.closest('li');
      if (li) {
        updateMovingTab(item, movingTab, li);
      }
    });
  }
});

// Tabs Navigation Resize
window.addEventListener('resize', () => {
  document.querySelectorAll('.nav-pills').forEach(item => {
    const movingTab = item.querySelector('.moving-tab');
    if (movingTab) movingTab.remove();

    const newMovingTab = document.createElement('div');
    const activeTab = item.querySelector(".nav-link.active");
    if (activeTab) {
      newMovingTab.className = 'moving-tab position-absolute nav-link';
      newMovingTab.innerHTML = '-';
      item.appendChild(newMovingTab);
      updateMovingTab(item, newMovingTab, activeTab.parentElement);
    }
  });

  handleResponsiveSidebar();
});

function updateMovingTab(item, movingTab, li = item.querySelector('li:first-child')) {
  const index = [...item.children].indexOf(li) + 1;
  let offset = 0;

  if (item.classList.contains('flex-column')) {
    for (let j = 1; j < index; j++) {
      offset += item.querySelector(`li:nth-child(${j})`).offsetHeight;
    }
    movingTab.style.transform = `translate3d(0, ${offset}px, 0)`;
    movingTab.style.width = '100%';
  } else {
    for (let j = 1; j < index; j++) {
      offset += item.querySelector(`li:nth-child(${j})`).offsetWidth;
    }
    movingTab.style.transform = `translate3d(${offset}px, 0, 0)`;
    movingTab.style.width = `${item.querySelector(`li:nth-child(${index})`).offsetWidth}px`;
  }
}

// Set Sidebar Color
function sidebarColor(element) {
  const parent = element.parentElement;
  const color = element.getAttribute("data-color");

  [...parent.children].forEach(sibling => sibling.classList.remove('active'));
  element.classList.toggle('active');

  const sidebar = document.querySelector('.sidenav');
  if (sidebar) {
    sidebar.setAttribute("data-color", color);

    const sidenavCard = document.querySelector('#sidenavCard');
    if (sidenavCard) {
      sidenavCard.className = `card card-background shadow-none card-background-mask-${color}`;

      const sidenavCardIcon = document.querySelector('#sidenavCardIcon');
      sidenavCardIcon.className = `ni ni-diamond text-gradient text-lg top-0 text-${color}`;
    }
  }
}

// Set Navbar Fixed
function navbarFixed(el) {
  const navbar = document.getElementById('navbarBlur');
  const classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];

  if (navbar) {
    const isFixed = el.getAttribute("checked");

    navbar.classList.toggle(...classes);
    navbar.setAttribute('navbar-scroll', isFixed?'false' : 'true');
    navbarBlurOnScroll('navbarBlur');

    if (isFixed) {
      el.removeAttribute("checked");
    } else {
      el.setAttribute("checked", "true");
    }
  }
}

// Navbar Blur on Scroll
function navbarBlurOnScroll(id) {
  const navbar = document.getElementById(id);
  const isNavbarScrollActive = navbar?.getAttribute("navbar-scroll") === 'true';
  const scrollDistance = 5;
  const classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  const toggleClasses = ['shadow-none'];

  const toggleNavLinksColor = type => {
    document.querySelectorAll('.navbar-main .nav-link').forEach(link => link.classList.toggle('text-body', type === 'transparent'));
    document.querySelectorAll('.navbar-main .sidenav-toggler-line').forEach(line => line.classList.toggle('bg-dark', type === 'blur'));
  };

  const blurNavbar = () => {
    navbar?.classList.add(...classes);
    navbar?.classList.remove(...toggleClasses);
    toggleNavLinksColor('blur');
  };

  const transparentNavbar = () => {
    navbar?.classList.remove(...classes);
    navbar?.classList.add(...toggleClasses);
    toggleNavLinksColor('transparent');
  };

  window.onscroll = debounce(() => {
    window.scrollY > scrollDistance?blurNavbar() : transparentNavbar();
  }, 10);
}

// Debounce Function
function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

// Set Sidebar Type
function sidebarType(element) {
  const parent = element.parentElement;
  const color = element.getAttribute("data-class");

  [...parent.children].forEach(sibling => sibling.classList.remove('active'));
  element.classList.toggle('active');

  const sidebar = document.querySelector('.sidenav');
  if (sidebar) {
    parent.querySelectorAll('[data-class]').forEach(sibling => sidebar.classList.remove(sibling.getAttribute('data-class')));
    sidebar.classList.add(color);
  }
}

// Toggle Sidenav
['iconNavbarSidenav', 'iconSidenav'].forEach(id => {
  const icon = document.getElementById(id);
  if (icon) icon.addEventListener("click", toggleSidenav);
});

function toggleSidenav() {
  const body = document.body;
  const sidenav = document.getElementById('sidenav-main');
  const className = 'g-sidenav-pinned';

  body.classList.toggle(className);
  setTimeout(() => sidenav?.classList.toggle('bg-white', body.classList.contains(className)), 100);
  sidenav?.classList.toggle('bg-transparent', !body.classList.contains(className));
}

// Responsive Sidebar Type
window.addEventListener("resize", handleResponsiveSidebar);
window.addEventListener("load", handleResponsiveSidebar);

function handleResponsiveSidebar() {
  document.querySelectorAll('[onclick="sidebarType(this)"]').forEach(element => {
    element.classList.toggle('disabled', window.innerWidth < 1200);
  });
}
