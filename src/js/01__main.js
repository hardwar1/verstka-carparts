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
      clearBtn.addEventListener("click", () => {
        const inputMain = clearBtn
          .closest(".main-search__form")
          .querySelector("input");
        inputMain.value = "";
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

  // слайдеры

  function slider1On() {
    var swiper = new Swiper(".result-search__slider", {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: "auto",
      initialSlide: 1,
      loop: true,
      centeredSlides: true,

      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: "true",
      },
      navigation: {
        nextEl: ".result-search__swiper-button--next",
        prevEl: ".result-search__swiper-button--prev",
      },

      breakpoints: {
        992: {
          initialSlide: 2,
        },
      },
    });
  }

  var win = window,
    doc = document,
    docElem = doc.documentElement,
    x = win.innerWidth || docElem.clientWidth || body[0].clientWidth;

  function sliders(number) {
    if (x < 1500 && qOne(`.swiper${number}`)) {
      qOne(`.swiper${number}`)
        .querySelector("ul")
        .classList.add("swiper-wrapper");
    }

    var swiper2 = new Swiper(`.swiper${number}`, {
      speed: 400,
      spaceBetween: 0,
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },

      navigation: {
        nextEl: `.next${number}`,
        prevEl: `.prev${number}`,
      },
    });
  }

  slider1On();
  var swiper2, swiper3;
  sliders("2");
  sliders("3");

  const suggestionsByDescriptionlinks = qAll('#suggestions_by_description a');
  console.log(suggestionsByDescriptionlinks);
  for (const link of suggestionsByDescriptionlinks) {
    link.addEventListener("click", () => {sliders("2"); sliders("3");});
  }

  //quantity инпут с + и -
  if (qOne(".number-input__btn--plus")) {
    const quantityPlusBtn = qAll(".number-input__btn--plus"),
      quantityMinusBtn = qAll(".number-input__btn--minus");

    for (let i of quantityPlusBtn) {
      i.addEventListener("click", function () {
        let value = i.closest(".number-input").querySelector("input");
        if (Number(value.value) < value.getAttribute("max")) {
          value.value = Number(value.value) + 1;
        }
      });
    }

    for (let i of quantityMinusBtn) {
      i.addEventListener("click", function () {
        let value = i.closest(".number-input").querySelector("input");
        if (Number(value.value) > 1) {
          value.value = Number(value.value) - 1;
        }
      });
    }
  }

  //info в look-at-order
  const orderButton = qOne(".look-at-order__button"),
    orderInfoText = qOne(".look-at-order__info-text");
  if (orderButton) {
    orderButton.addEventListener("click", () => {
      orderInfoText.classList.toggle("show");
      orderButton.classList.toggle("active");
    });
  }

  //select
  const selectHeader = qAll(".select__header");
  if (selectHeader) {
    for (let item of selectHeader) {
      let select = item.closest(".select");
      let options = select.querySelectorAll("option");

      select.querySelector("span").innerText = options[0].innerText;

      for (let option of options) {
        option
          .closest(".select")
          .querySelector(
            "ul"
          ).innerHTML += `<li><button class="select__item" type="button">${option.innerText}</button></li>`;

        if (option.hasAttribute("selected")) {
          option.closest(".select").querySelector("span").innerText =
            option.innerText;
        }
      }

      let selectItem = select.querySelectorAll("li");
      for (let i = 0; i < selectItem.length; i++) {
        selectItem[i].addEventListener("click", () => {
          select.querySelector("select").value = selectItem[i].innerText;
          select.querySelector("span").innerText = selectItem[i].innerText;
          select.classList.remove("select--active");
        });
      }

    }

    const selects = qAll("select");
    for (const select of selects) {
      select.addEventListener("click", function(event){
        console.log(event);
        select.closest(".select").classList.toggle("select--active");

      });
    }
  }

  //checkbox
  const myCheckbox = qOne(".checkbox__box"),
    choiceSocial = qOne(".making-order__choice");

  myCheckbox.addEventListener("click", () =>
    choiceSocial.classList.toggle("show")
  );

  //info кнопки в корзине
  const makingOrderInfoBtns = qAll(".making-order__info-btn");

  if (makingOrderInfoBtns) {
    for (const btn of makingOrderInfoBtns) {
      btn.addEventListener("click", () =>
        btn
          .closest("div")
          .querySelector(".error-message")
          .classList.toggle("show")
      );
    }
  }

  //click по оверлею закрывает попап
  const delMessageBtn = qOne(".del-message__btn"),
  overlay = qOne(".overlay");
  
  function closePopap() {
    const popaps = qAll(".popap");
    for (const popap of popaps) {
      popap.classList.remove("popap--active");
    }
    overlay.classList.remove("overlay--active");
  }

  delMessageBtn.addEventListener("click", () => closePopap());
  overlay.addEventListener("click", () => closePopap());
});
