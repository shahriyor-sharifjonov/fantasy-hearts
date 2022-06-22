import * as functions from "./modules/functions.js";

functions.isWebp();

// import Swiper, { Navigation, Pagination } from 'swiper';

// const swiper = new Swiper();

const getHeader = () => {
    var header = document.getElementById("header");

    var sticky = header.offsetTop;

    const fixHeader = () => {
        window.pageYOffset > sticky ? 
        header.classList.add("sticky") : 
        header.classList.remove("sticky")
    }

    fixHeader();

    window.addEventListener('scroll', fixHeader);
}

const headerMenu = () => {
  const headerButton = document.querySelector(".header__button");
  const headerMenu = document.querySelector(".header__menu");
  const headerLogo = document.querySelector('.header__logo');
  const headerLink = document.querySelectorAll('.header__link');

  let menuOpened = false;

  const menuToggle = () => {
    menuOpened = !menuOpened;
    headerButton.classList.toggle("open");
    headerMenu.classList.toggle("open");
    headerLogo.classList.toggle("m-open");
    document.body.classList.toggle('o-hidden');
  };
  
  headerButton.onclick = menuToggle;

  headerLink.forEach(el => {
    menuOpened 
      el.addEventListener('click', menuToggle)
  })
  
  window.onclick = (e) => {
    if (
      menuOpened &&
      !e.composedPath().includes(headerButton) &&
      !e.composedPath().includes(headerMenu)
    )
      menuToggle();
  };
}

window.onload = () => {
  getHeader();
  headerMenu();
}