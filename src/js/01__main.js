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
    closeActiveJs();
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

    if (scrollTop1 < 80) {
      footerNav.classList.remove("footer__nav--hide");
    }
  });

  // в hero изменение положения инпута и фона
  const mainSearch = qOne(".main-search__search"),
    heroMobileBg2 = qOne(".hero__mobile-bg2"),
    heroMobile = qOne(".hero__mobile");

  if (heroMobile) {
    mainSearch.addEventListener("click", () => {
      heroMobile.classList.add("active-js");
      heroMobileBg2.classList.add("active-js");
    });
  }

  // потеря фокуса инпутом на главной
  const inputMain = qOne(".input--main");
  if (inputMain) {
    inputMain.addEventListener("focusout", function () {
      closeActiveJs();
    });


    let inputsMain = qAll(".input--main");

    for (const input of inputsMain) {
      input.addEventListener("input", function (evt) {
        if (input.value.length > 0) {
          let clearBtn = input
            .closest(".main-search__form")
            .querySelector("button");

          console.log(clearBtn);
          clearBtn.classList.add("show");
        } else {
          let clearBtn = input
            .closest(".main-search__form")
            .querySelector("button");

          clearBtn.classList.remove("show");
        }
      });
    }
  }

  // стирание в инпуте
  const mainSearchClears = qAll(".main-search__burger");
  if (mainSearchClears) {
    for (const clearBtn of mainSearchClears) {
      clearBtn.addEventListener("click", 
      ()=> {
       const inputMain = clearBtn.closest(".main-search__form")
        .querySelector("input");
        inputMain.value = '';
        clearBtn.classList.remove("show");
      });
    }
  }
  

  // закрытие всех активных окошек и прочего по клику с клавиатуры
  function closeActiveJs() {
    const activeJs = qAll(".active-js");

    for (let item of activeJs) {
      item.classList.remove("active-js");
    }
    body.classList.remove("lock");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeActiveJs();
    }
  });
});
