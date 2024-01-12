//[1] %%%%%%% option box %%%%%%%%%%%%%%%%%%%%%
//random background variables
let randomBackgroundVa = true;
let randomBackgroundInterval;

//[1-1] %%%%%%% toggle option box %%%%%%%%%%%%%%%%%%%%%
let optionBox = document.querySelector(".option-box");
// console.log(optionBox);
let optionIcon = document.querySelector(".option-icon");
// console.log(optionIcon);
optionIcon.addEventListener("click", () => {
  optionBox.classList.toggle("open");
  optionIcon.classList.toggle("fa-spin");
});

//[1-2] %%%%%%% switch colors %%%%%%%%%%%%%%%%%%%%%%%%
let listLi = document.querySelectorAll(".color-list li");
// console.log(listLi);
listLi.forEach((li) => {
  //   console.log(li);
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    let colors = e.target.parentElement.querySelectorAll(".active");
    setActiveClass(colors, e.target);
  });
});

//[1-3] %%%%%%% localstorage color %%%%%%%%%%%%%%%%%%
let mainColor = localStorage.getItem("color-option");
// console.log(mainColor);
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  let colorsLi = document.querySelectorAll(".color-list li");
  setActiveClassForElementInLocalStoreg(colorsLi, "color", mainColor);
}

//[1-4] %%%%%%% localstorage background %%%%%%%%%%%%%%%
let randomBackgroundSpan = document.querySelectorAll(".random-background span");
let bacgroundOption = localStorage.getItem("bacground-option");
// console.log(bacgroundOption);
if (bacgroundOption !== null) {
  randomBackgroundSpan.forEach((el) => {
    el.classList.remove("active");
    if (bacgroundOption === "true") {
      randomBackgroundVa = true;
      document.querySelector(".yes").classList.add("active");
    } else {
      randomBackgroundVa = false;
      document.querySelector(".no").classList.add("active");
    }
  });
}
//[1-5] %%%%%%% switch random background %%%%%%%%%%%%%
// console.log(randomBackgroundSpan);
randomBackgroundSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    let bacgroundSpans = e.target.parentElement.querySelectorAll(".active");
    setActiveClass(bacgroundSpans, e.target);
    if (e.target.dataset.background === "yes") {
      // console.log("yes");
      randomBackgroundVa = true;
      // console.log(randomBackgroundVa);
      randomBackground();
      localStorage.setItem("bacground-option", true);
    } else {
      // console.log("no");
      randomBackgroundVa = false;
      // console.log(randomBackgroundVa);
      clearInterval(randomBackgroundInterval);
      localStorage.setItem("bacground-option", false);
    }
  });
});

//[1-6] %%%%%%% change background image url %%%%%%%%%%
function randomBackground() {
  if (randomBackgroundVa === true) {
    randomBackgroundInterval = setInterval(() => {
      let landingPage = document.getElementById("landing-page");
      // console.log(landingPage);
      let arrayItems = [];
      arrayItems[0] = "image/slide_01.jpg";
      arrayItems[1] = "image/slide_02.jpg";
      arrayItems[2] = "image/slide_03.jpg";
      let randomImageIndex = Math.floor(Math.random() * arrayItems.length);
      // console.log(randomImageIndex);
      landingPage.style.backgroundImage =
        'url("' + arrayItems[randomImageIndex] + '")';
    }, 500);
  }
}
randomBackground();
//[1-7] %%%%%%% mode optins %%%%%%%%%%%%%%%%%%%%%%%%%%
let modeButton = document.querySelectorAll(".mode-option span");
let body = document.body;
let storedMode = localStorage.getItem("mode-option");

function applyStyles(
  bgColor,
  textColor,
  liColor,
  pColor,
  imageUrl,
  colorArray
) {
  body.style.backgroundColor = bgColor;
  document.querySelector(".about-us .info-box p").style.color = textColor;
  document.querySelector(".contact form textarea").style.color = textColor;
  document.querySelector(
    ".contact form input:not([type='submit'])"
  ).style.color = textColor;

  let lis = document.querySelectorAll(".about-us .info-box ul li");
  lis.forEach((li) => {
    li.style.color = liColor;
  });

  let p = document.querySelectorAll(
    ".our-products .products .product-box .content .description p"
  );
  p.forEach((paragraph) => {
    paragraph.style.color = pColor;
  });

  document.querySelector(".contact").style.backgroundImage = `url(${imageUrl})`;

  let colorList = document.querySelectorAll(".color-list li");
  for (let i = 0; i < colorArray.length; i++) {
    colorList[i].dataset.color = colorArray[i];
  }
}

function updateOptionColors(colors) {
  let optionItems = document.querySelectorAll(
    ".option-box .option-container .options li"
  );

  optionItems.forEach((item, index) => {
    item.style.backgroundColor = colors[index];
  });
}

if (storedMode !== null) {
  modeButton.forEach((el) => {
    el.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
  });

  if (storedMode === "dark") {
    dark();
    document.querySelector(".mode-option .no").classList.add("active");
  } else {
    light();
    document.querySelector(".mode-option .yes").classList.add("active");
  }
}

function dark() {
  applyStyles("black", "#fff", "#fff", "#fff", "../image/mapdark.jpg", [
    "#ffcdaa",
    "#ff6e80",
    "#ff8357",
    "#f9aa75",
    "#e69695",
  ]);
  updateOptionColors(["#ffcdaa", "#ff6e80", "#ff8357", "#f9aa75", "#e69695"]);
  localStorage.setItem("mode-option", "dark");
  if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    let colorsLi = document.querySelectorAll(".color-list li");
    setActiveClassForElementInLocalStoreg(colorsLi, "color", mainColor);
  }
}
function light() {
  applyStyles(
    "white",
    "#4a4a4a",
    "#4a4a4a",
    "#4a4a4a",
    "../image/maplight.jpg",
    ["#b24202", "#297272", "#6d6875", "#9e6752", "#01757a"]
  );
  updateOptionColors(["#b24202", "#297272", "#6d6875", "#9e6752", "#01757a"]);
  localStorage.setItem("mode-option", "light");
}

// handle mode option
modeButton.forEach((span) => {
  span.addEventListener("click", (e) => {
    let modeSpans = e.target.parentElement.querySelectorAll(".active");
    setActiveClass(modeSpans, e.target);
    if (e.target.dataset.mode === "dark") {
      dark();
    } else {
      light();
    }
  });
});
//[1-8] %%%%%%% reset options %%%%%%%%%%
document
  .querySelector(".option-box .reset-option")
  .addEventListener("click", function () {
    localStorage.removeItem("color-option");
    localStorage.removeItem("bacground-option");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("mode-option");

    window.location.reload();
  });
//[2] %%%%%%% Our best sales %%%%%%%%%%%%%%%%%%%%%
//[2-1] %%%%%%% animated progress %%%%%%%%%%%%%%%%%%%%%
let ourSeles = document.querySelector(".Our-best-sales");
// console.log(ourSeles);
window.onscroll = function () {
  //our sales offsettop
  let ourSelesOffsetTop = ourSeles.offsetTop;
  // console.log(ourSelesOffsetTop);
  //our sales offset height
  let ourSalesOffsetHeight = ourSeles.offsetHeight;
  // console.log(ourSalesOffsetHeight);
  //window height
  let windowHeight = this.innerHeight;
  // console.log(windowHeight);
  //window scroll top
  let windowScrollTop = this.scrollY;
  // console.log(windowScrollTop);

  if (
    windowScrollTop >
    ourSelesOffsetTop + ourSalesOffsetHeight - windowHeight
  ) {
    let ourBestSales = document.querySelectorAll(
      ".Our-best-sales-box .product-progress span"
    );
    ourBestSales.forEach((sales) => {
      sales.style.width = sales.dataset.progress;
      sales.textContent = sales.dataset.progress;
    });
  }
};
//[3] %%%%%%% Latest Products %%%%%%%%%%%%%%%%%%%%%
//[3-1] %%%%%%% product details %%%%%%%%%%%%%%%%%%%%%
let images = document.querySelectorAll(
  ".our-products .products .product-box img"
);

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    //overlay div
    let overLayOut = document.createElement("div");
    overLayOut.className = "layout";
    document.body.appendChild(overLayOut);
    //overlay content div
    let overLayOutBox = document.createElement("div");
    overLayOutBox.classList.add("layout-box");
    overLayOut.appendChild(overLayOutBox);
    //close span
    let closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    overLayOutBox.appendChild(closeButton);
    let closeButtonText = document.createTextNode("x");
    closeButton.appendChild(closeButtonText);
    //overlay img container
    let layOutImgContainer = document.createElement("div");
    layOutImgContainer.classList.add("layout-img-container");
    overLayOutBox.appendChild(layOutImgContainer);
    //overlay main img
    let overLayOutImg = document.createElement("img");
    overLayOutImg.classList.add("layout-img");
    overLayOutImg.src = img.src;
    layOutImgContainer.appendChild(overLayOutImg);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    document.querySelector(".layout").remove();
  }
});
//[4] %%%%%%% Our Best Offers %%%%%%%%%%%%%%%%%%%%%
//[4-1] %%%%%%% descount toggle %%%%%%%%%%%%%%%%%%%%%
//========< every product descount date >====
let descountDateSpanSpan = document.querySelectorAll(
  ".descount .descount-content .product .offer-date span"
);
descountDateSpanSpan.forEach((span) => {
  let date = new Date();
  date.setDate(date.getDate() + parseInt(span.dataset.day));
  span.textContent = date.toDateString();
});
//========< toggle descount optins >==========
let descount = document.querySelector(
  ".descount .descount-content .descount-title"
);
let descountDate = document.querySelector(
  ".descount .descount-content .descount-date "
);
let descountDetails = document.querySelector(
  ".descount .descount-content .descount-details "
);
let descountSpan = document.querySelectorAll(
  ".descount .descount-content .product .offer "
);
let descountDateSpan = document.querySelectorAll(
  ".descount .descount-content .product .offer-date"
);
let descountDetailsSpan = document.querySelectorAll(
  ".descount .descount-content .product .offer-details"
);
descount.addEventListener("click", () => {
  descountSpan.forEach((span) => {
    span.style.display = "flex";
  });
  descountDateSpan.forEach((span) => {
    span.style.display = "none";
  });
  descountDetailsSpan.forEach((span) => {
    span.style.display = "none";
  });
});
descountDate.addEventListener("click", () => {
  descountSpan.forEach((span) => {
    span.style.display = "none";
  });
  descountDateSpan.forEach((span) => {
    span.style.display = "block";
  });
  descountDetailsSpan.forEach((span) => {
    span.style.display = "none";
  });
});
descountDetails.addEventListener("click", () => {
  descountSpan.forEach((span) => {
    span.style.display = "none";
  });
  descountDateSpan.forEach((span) => {
    span.style.display = "none";
  });
  descountDetailsSpan.forEach((span) => {
    span.style.display = "block";
  });
});
//[5] %%%%%%% nav bullets %%%%%%%%%%%%%%%%%%%%%
//[5-1] %%%%%%% bullets smoth scroll %%%%%%%%%%%%%%%%%%%%%
let allBullets = document.querySelectorAll(".nav-bullets .bullets");
// console.log(allBullets)
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
    e.target.parentElement.querySelectorAll(".bullets").forEach((el) => {
      el.style.backgroundColor = "transparent";
    });
    e.target.style.backgroundColor = " var(--main-color)";
  });
});
//[5-2] %%%%%%% bullets optins %%%%%%%%%%%%%%%%%%%%%%%%%%%
let bulletsButton = document.querySelectorAll(".show-bullets span");
// console.log(bulletsButton);
let buttletsContainer = document.querySelector(".nav-bullets");
// console.log(buttletsContainer);
// bullets localstoreg
let localSBullets = localStorage.getItem("bullets-option");
if (localSBullets !== null) {
  bulletsButton.forEach((span) => {
    span.classList.remove("active");
    if (localSBullets === "block") {
      buttletsContainer.style.display = "block";
      document.querySelector(".show-bullets .yes").classList.add("active");
    } else {
      buttletsContainer.style.display = "none";
      document.querySelector(".show-bullets .no").classList.add("active");
    }
  });
}

//bullets option function
bulletsButton.forEach((span) => {
  span.addEventListener("click", (e) => {
    let bullets = e.target.parentElement.querySelectorAll(".active");
    setActiveClass(bullets, e.target);
    if (e.target.dataset.bullets === "block") {
      buttletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      buttletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
  });
});

//[6] %%%%%%% nav menu %%%%%%%%%%%%%%%%%%%%%%%%%%%
//[6-1] %%%%%%% toglee menu %%%%%%%%%%%%%%%%%%%%%%%%%%%
//==============< button click effect >====================================================
var toggleButton = document.querySelector("#landing-page .header .toggle-menu");
// console.log(toggleButton);
var links = document.querySelector("#landing-page .header .links");
// console.log(menuActive);
toggleButton.addEventListener("click", (e) => {
  //==============< stop propagation for button >==========================================
  e.stopPropagation();
  links.classList.toggle("open");
  toggleButton.classList.toggle("menu-active");
});
//==============< document click effect >==================================================
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== links) {
    //chek of the menu is opend
    if (links.classList.contains("open")) {
      // console.log("menu is opend");
      links.classList.toggle("open");
      toggleButton.classList.toggle("menu-active");
    }
  }
});
//==============< stop propagation for linkes >==========================================
links.addEventListener("click", (e) => {
  e.stopPropagation();
});

//
//
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$< functions >$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//==============< set active class functio >==============================================
function setActiveClass(elements, activeElement) {
  elements.forEach((el) => {
    el.classList.remove("active");
  });
  activeElement.classList.add("active");
}
//==============< set active class functio for localstoreg >==============================
function setActiveClassForElementInLocalStoreg(elements, data, option) {
  console.log(elements, data, option);
  elements.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset[data] === option) {
      el.classList.add("active");
    }
  });
}
