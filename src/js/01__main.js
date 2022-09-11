"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  // открывание закрывание мобильного меню
  const jsMenu = qOne(".js-menu"),
    footerBurger = qOne(".footer__burger"),
    adaptiveMenu = qOne(".footer__adaptive-menu"),
    body = qOne("body");

  jsMenu.addEventListener("click", () => {
    adaptiveMenu.classList.toggle("active-js");
    body.classList.toggle("lock");
  });

  footerBurger.addEventListener("click", () => {
    adaptiveMenu.classList.remove("active-js");
    body.classList.remove("lock");
  });

  //скроллы хеадера и мобильного меню футера
  const header = qOne(".header"),
    footerNav = qOne(".footer__nav");
  let scrollTop,
    top = 0,
    scrollTop1,
    top1 = 0;

  window.addEventListener("scroll", function () {
    scrollTop = window.scrollY;
    scrollTop1 = window.scrollY;

    if (scrollTop > 100) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }

    if (top < scrollTop && top > 200 && !qOne(".active-js")) {
      header.classList.add("header--hide");
      top = scrollTop;
    } else {
      header.classList.remove("header--hide");
      top = scrollTop;
    }

    if (scrollTop1 < top1 && !qOne(".active-js")) {
      footerNav.classList.add("footer__nav--hide");
      top1 = scrollTop1;
    } else {
      footerNav.classList.remove("footer__nav--hide");
      top1 = scrollTop1;
    }
  });

  // в hero изменение положения инпута и фона
  const heroSearch = qOne(".hero__search"),
    heroMobileBg2 = qOne(".hero__mobile-bg2"),
    heroMobile = qOne(".hero__mobile");

  heroSearch.addEventListener("click", () => {
    heroMobile.classList.add("active-js");
    heroMobileBg2.classList.add("active-js");
  });

  //закрытие всех активных окошек и прочего по клику с клавиатуры
  document.addEventListener('keydown', (e) => {
    //key: 'Escape'
    if (e.key === 'Escape') {
      const activeJs = qAll('.active-js');

      for (let item of activeJs) {
        item.classList.remove("active-js");
      }

      body.classList.remove("lock");
    }
  })
});
