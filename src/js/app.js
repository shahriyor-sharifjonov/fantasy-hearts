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

const generateStars = () => {
  const showcase = document.querySelector('.leaderboard__showcase');

  const getRandomNumber = (max = 100, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)
  
  const starCreator = () => {
    const starSize = getRandomNumber(10, 3) + "px";
    const starTop = getRandomNumber() + "%";
    const starLeft = getRandomNumber() + "%";
    const starDuration = getRandomNumber(10000, 3000) + "ms";
    const star = document.createElement("span");
    star.classList.add("star");
    star.style.height = starSize;
    star.style.width = starSize;
    star.style.top = starTop;
    star.style.left = starLeft;
    star.style.animationDuration = starDuration;
    showcase.insertAdjacentElement("beforeend", star);
  };

  const min = Math.round(window.innerWidth / 100)
  const max = Math.round(window.innerWidth / 50)

  const starNum = getRandomNumber(max, min);

  for (let i = 0; i < starNum; i++) {
    starCreator();
  }
}

const generateFlyingStars = () => {
  const showcase = document.querySelector('.leaderboard__showcase');

  const getRandomNumber = (max = 100, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)
  
  const starCreator = () => {
    const starTop = getRandomNumber() + "%";
    const starLeft = getRandomNumber() + "%";
    const starDuration = getRandomNumber(10000, 3000) + "ms";
    const star = document.createElement("span");
    star.classList.add("flying-star");
    star.style.top = starTop;
    star.style.left = starLeft;
    star.style.animationDuration = starDuration;
    showcase.insertAdjacentElement("beforeend", star);
  };

  const starNum = getRandomNumber(6, 2);

  for (let i = 0; i < starNum; i++) {
    starCreator();
  }
}

window.onload = () => {
  getHeader();
  headerMenu();
  generateStars();
  generateFlyingStars();
}