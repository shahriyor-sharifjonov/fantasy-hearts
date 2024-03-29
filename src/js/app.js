import * as functions from "./modules/functions.js";
import Swiper, { Navigation, Pagination } from 'swiper';
import $ from 'jquery';
import ApexCharts from 'apexcharts';

functions.isWebp();

const swiper = new Swiper();

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
  const showcase = document.querySelector('.leaderboard__showcase .leaderboard__stars');

  const getRandomNumber = (max = 100, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)
  
  const starCreator = () => {
    const starSize = getRandomNumber(6, 3) + "px";
    const starTop = getRandomNumber() + "%";
    const starLeft = getRandomNumber() + "%";
    const starDuration = getRandomNumber(8000, 3000) + "ms";
    const star = document.createElement("span");
    star.classList.add("star");
    star.style.height = starSize;
    star.style.width = starSize;
    star.style.top = starTop;
    star.style.left = starLeft;
    star.style.animationDuration = starDuration;
    showcase.insertAdjacentElement("beforeend", star);
  };

  // const starNum = getRandomNumber(max, min);
  const starNum = window.innerWidth / 3;

  for (let i = 0; i < starNum; i++) {
    starCreator();
  }
}

const generateFlyingStars = () => {
  const showcase = document.querySelector('.leaderboard__showcase');

  const getRandomNumber = (max = 100, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)
  const starDuration = 500;
  
  const starCreator = () => {
    const starTop = getRandomNumber() + "%";
    const starLeft = getRandomNumber() + "%";
    const star = document.createElement("span");
    star.classList.add("flying-star");
    star.style.top = starTop;
    star.style.left = starLeft;
    star.style.animationDuration = starDuration + "ms";
    showcase.insertAdjacentElement("beforeend", star);
    setTimeout(() => {
      star.remove();
    }, 500);
  };

  setInterval(() => {
    starCreator()
    starCreator()
  }, 595); // 700 (15%)
}

const initSliders = () => {
  new Swiper(".about__swiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
  });
}

const accordion = () => {
  $(document).ready(function() {
    $(".accordion > .accordion__button").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
          .siblings(".accordion__content")
          .slideUp(200);
      } else {
        $(".accordion > .accordion__button").removeClass("active");
        $(this).addClass("active");
        $(".accordion__content").slideUp(200);
        $(this)
          .siblings(".accordion__content")
          .slideDown(200);
      }
    });
  });
}

const showPassword = () => {
  const inputs = document.querySelectorAll('.input-password');
  inputs.forEach(input => {
    const parent = input.parentElement;
    const button = parent.querySelector('button');
    let isHidden = true;
    button.addEventListener('click', () => {
      isHidden = !isHidden;
      isHidden ? input.setAttribute('type', 'password') : input.setAttribute('type', 'text')
    })
  })
}

const customSelect = () => {
  var x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    if(!x[i].querySelector('.select-selected')){
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }
  
  function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);
}


const registerCurrency = () => {
  const selects = document.querySelectorAll('#registerCurrency .select-items div');
  const result = document.querySelector('#registerCurrencyResult');
  selects.forEach(select => {
    select.addEventListener('click', () => {
      if(select.innerHTML === 'Расчетный счет (ООО, ИП, самозанятый)'){
        result.innerHTML = '';
        result.innerHTML = `
          <p class="auth__step-span">Введите реквизиты для получения средств:</p>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="ФИО Получателя" required class="input">  
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Номер счета" required class="input">  
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Банк получателя" required class="input">  
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="БИК" required class="input">  
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Корр. счет" required class="input">  
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        `;
      } else if(select.innerHTML === 'Банковская карта') {
        result.innerHTML = '';
        result.innerHTML = `
          <p class="auth__step-span">Введите реквизиты для получения средств:</p>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Номер карты" required class="input">
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Месяц/Год" required class="input">
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Имя Фамилия владельца" required class="input">
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        `;
      } else {
        result.innerHTML = '';
        result.innerHTML = `
          <p class="auth__step-span">Введите реквизиты для получения средств:</p>
          <div class="auth__step-item">
            <div class="auth__step-input">
              <input type="text" placeholder="Номер кошелька" required class="input">  
              <svg class="auth__step-success-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#24B09C"/>
                <path d="M6 10L9 13L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="auth__step-error-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF3D3D"/>
                <path d="M6 6L14 14M14 6L6 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        `;
      }
    })
  })
}

const registerRequest = () => {
  const items = document.querySelectorAll('.popup__request');
  items.forEach(el => {
    const selects = el.querySelectorAll('.select-items div');
    const result = el.querySelector('.registerRequestResult')
    selects.forEach(select => {
      select.addEventListener('click', () => {
        if(select.innerHTML === 'ФИО'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новые данные ФИО">
            </div>
          `
        } else if(select.innerHTML === 'Телефон'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый телефон">
            </div>
          `
        } else if(select.innerHTML === 'Email'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Email">
            </div>
          `
        } else if(select.innerHTML === 'Telegram'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Telegram">
            </div>
          `
        } else if(select.innerHTML === 'Пароль'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Пароль">
            </div>
          `
        } else if(select.innerHTML === 'Страна проживания'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Страна проживания">
            </div>
          `
        } else if(select.innerHTML === 'Индекс'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Индекс">
            </div>
          `
        } else if(select.innerHTML === 'Город'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Город">
            </div>
          `
        } else if(select.innerHTML === 'Адрес'){
          result.innerHTML = ''
          result.innerHTML = `
            <div class="auth__step-input">
              <input type="text" class="input enable-submit" data-button="#popup-button-request" placeholder="Введите новый Адрес">
            </div>
          `
        }
        enableSubmit()
      })
    })
  })
  
}

const registerDeleteRequest = () => {
  let reqs = document.querySelectorAll('.popup__request');
  reqs.forEach(req => {
    const btn = req.querySelector('.popup__request-left button')
    btn.addEventListener('click', () => {
      req.remove()
      reqs = document.querySelectorAll('.popup__request');
      reqs.forEach((el, index) => {
        const num = el.querySelector('.popup__request-left span')
        num.innerHTML=`Запрос №${index+=1}`
      })
    })
  })
}

const registerAddRequest = () => {
  let requests = document.querySelector('.popup__requests');
  let requestItems = document.querySelectorAll('.popup__request');
  const updateEls = () => {
    requests = document.querySelector('.popup__requests');
    requestItems = document.querySelectorAll('.popup__request');
  }
  const btn = document.querySelector('.popup__add');
  btn.addEventListener('click', () => {
    updateEls()
    const num = requestItems.length+1;
    const newReq = document.createElement('div');
    newReq.classList.add('popup__request')
    newReq.innerHTML = `
      <div class="popup__request-left">
        <span>Запрос №${num}</span>
        <button type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.4">
          <path d="M5 7H19" stroke="#0E322F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M18 7V18C18 19.105 17.105 20 16 20H8C6.895 20 6 19.105 6 18V7" stroke="#0E322F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M15 3.75H9" stroke="#0E322F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M10 11V16" stroke="#0E322F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M14 11V16" stroke="#0E322F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
          </svg>
        </button>
      </div>
      <div class="popup__request-content"> 
        <div class="custom-select registerRequest">
          <select>
            <option value="0">Выберите тип данных</option>
            <option value="1">ФИО</option>
            <option value="2">Телефон</option>
            <option value="3">Email</option>
            <option value="4">Telegram</option>
            <option value="5">Пароль</option>
            <option value="6">Страна проживания</option>
            <option value="7">Индекс</option>
            <option value="8">Город</option>
            <option value="9">Адрес</option>
          </select>
      </div>
    `
    requests.append(newReq)
    customSelect()
    const content = newReq.querySelector('.popup__request-content')
    const requestResult = document.createElement('div')
    requestResult.classList.add('registerRequestResult')
    content.append(requestResult)
    registerRequest()
    registerDeleteRequest()
  })
}

if(document.querySelector('.scroll-detect')){
  document.querySelector('.scroll-detect').addEventListener('scroll', () => {
    const content = document.querySelector('.scroll-detect')
    const list = document.querySelector('.scroll-detect-class')
    if ((content.scrollTop + content.offsetHeight) >= content.scrollHeight){
      list.classList.add('scrolled')
    }else{
      list.classList.remove('scrolled')
    }
  })
}

const registerSteps = () => {
  const register = document.querySelector('#register');
  const next = register.querySelector('.auth__next');
  const prev = register.querySelector('.auth__prev');
  const cancel = register.querySelector('.auth__cancel');
  const login = register.querySelector('.auth__button');
  const footer = register.querySelector('.auth__footer-left');
  const content = register.querySelector('.auth__content');
  let active = register.querySelector('.auth__step.active');
  let nextEl = active.nextElementSibling;
  let prevEl = active.previousElementSibling;

  next.addEventListener('click', () => {
    active = register.querySelector('.auth__step.active');
    nextEl = active.nextElementSibling;

    const end = () => {
      next.classList.add('inactive');
      if(!register.querySelector('.auth__submit')){
        const submitBtn = document.createElement('button');
        const sogl = document.createElement('p');
  
        submitBtn.classList.add('auth__submit');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.innerHTML = 'Отправить заявку';
  
        sogl.classList.add('auth__sogl');
        sogl.innerHTML = `
          Нажимая на кнопку вы автоматически соглашаетесь с <a href="#!">Условиями сайта</a> и <a href="#!">Политикой конфиденциальности</a>
        `
  
        footer.prepend(submitBtn);
        content.append(sogl);
      }
    }

    if (nextEl) {
      active.classList.remove('active');
      nextEl.classList.add('active');
      active = register.querySelector('.auth__step.active');
      nextEl = active.nextElementSibling;
      if(nextEl){
        cancel.classList.add('inactive');
        login.classList.add('inactive');
        prev.classList.remove('inactive');
      }
      if (!nextEl) {
        end();
      }
    } else {
      end();
    }
  })

  prev.addEventListener('click', () => {
    active = register.querySelector('.auth__step.active');
    prevEl = active.previousElementSibling;

    const end = () => {
      login.classList.remove('inactive');
      cancel.classList.remove('inactive');
      prev.classList.add('inactive');
    }

    if (prevEl) {
      active.classList.remove('active');
      prevEl.classList.add('active');
      active = register.querySelector('.auth__step.active');
      prevEl = active.previousElementSibling;
      if(!active.classList.contains('auth__step_4')){
        if(register.querySelector('.auth__sogl')){
          register.querySelector('.auth__sogl').remove();
          register.querySelector('.auth__submit').remove();
          next.classList.remove('inactive');
        }
      }
      if(!prevEl){
        end();
      }
    } else {
      end();
    }
  })

}

const notification = () => {
  let menuOpened = false;
  const btn = document.querySelector('.theme__header-notification-btn');
  const menu = document.querySelector('.theme__header-notification-content');

  btn.addEventListener('click', () => {
    menuOpened = !menuOpened;
    btn.classList.toggle('active')
  });

  window.onclick = (e) => {
    if (menuOpened && e.target.classList.contains('theme__header-notification-close')){
      menuOpened = !menuOpened;
      btn.classList.toggle('active')
    }
    if (menuOpened && !e.composedPath().includes(btn) && !e.composedPath().includes(menu)){
      menuOpened = !menuOpened;
      btn.classList.toggle('active')
    } 
  }
}

const themeHeader = () => {
  if(document.querySelector('.theme__header-button')){
    const headerButton = document.querySelector(".theme__header-button");
    const headerMenu = document.querySelector(".theme__header-menu");
    const headerLink = document.querySelectorAll('.header__link');

    let menuOpened = false;

    const menuToggle = () => {
      menuOpened = !menuOpened;
      headerButton.classList.toggle("open");
      headerMenu.classList.toggle("open");
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
}

const setCharts = () => {
  var options = {
    series: [{
      name: "Регистрации",
      data: [12, 10, 25, 1, 3, 50, 19, 1, 45, 2]
    }],
    chart: {
      height: 237,
      type: 'line',
      foreColor: '#0E322F',
      zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: true,  
        zoomedArea: {
          fill: {
            color: '#55CEBA',
            opacity: 0.4
          },
          stroke: {
            color: '#55CEBA',
            opacity: 0.4,
            width: 1
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Регистрации',
      align: 'left'
    },
    grid: {
      show: true,
      borderColor: '#CCCCCC',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      }, 
      yaxis: {
        lines: {
          show: false
        }
      },
    },
    xaxis: {
      type: 'category',
      categories: ['фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя'],
      tickAmount: undefined,
      tickPlacement: 'start',
      position: 'left',
      labels: {
        show: true,
        style: {
          colors: ['#1D1D1D'],
          fontSize: '12px',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
      },
      tooltip: {
        enabled: false,
      },
    },
    colors: ['#55CEBA'],
    markers: {
      size: 5,
      colors: ['#55CEBA'],
      strokeWidth: 0,
      fillOpacity: 1,
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
      hover: {
        size: 6,
      }
    },
    stroke: {
      show: true,
      curve: 'straight',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,      
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: '14px',
        fontFamily: undefined
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        show: false,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: 'Size: '
      },
      marker: {
        show: true,
      },
      items: {
        display: 'flex',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.5
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

const setPopups = () => {
  const popups = document.querySelectorAll('.popup');
  const open = document.querySelectorAll('.popup-open');
  const close = document.querySelectorAll('.popup-close');
  open.forEach(btn => {
    btn.addEventListener('click', () => {
      popups.forEach(el => {
        el.classList.remove('active');
      })
      const target = btn.getAttribute('data-target');
      document.querySelector(target).classList.add('active');
    })
  })
  close.forEach(btn => {
    btn.addEventListener('click', () => {
      popups.forEach(el => {
        el.classList.remove('active');
      })
    })
  })
}

const enableSubmit = () => {
  const inputs = document.querySelectorAll('.enable-submit');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const target = input.getAttribute('data-button');
      const btn = document.querySelector(target);
      if(input.value.length > 0){
        btn.removeAttribute('disabled');
      }else{
        btn.setAttribute('disabled', 'true');
      }
    })
  })
}

window.onload = () => {
  customSelect();
  accordion();
  themeHeader();
  registerRequest();
  registerAddRequest();
  registerDeleteRequest();
  if(document.querySelector('.theme__header-notification-btn')){
    notification();
  }
  if(document.querySelector('#home')){
    getHeader();
    headerMenu();
    generateStars();
    generateFlyingStars();
    initSliders();
  }
  if(document.querySelector('.input-password')){
    showPassword();
  }
  if(document.querySelector('#register')){
    registerCurrency();
    registerSteps();
  }
  if(document.querySelector('#chart')){
    setCharts();
  }
  if(document.querySelector('.popup')){
    setPopups()
  }
  if(document.querySelector('.enable-submit')){
    enableSubmit()
  }
}


