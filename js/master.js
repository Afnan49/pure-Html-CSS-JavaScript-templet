//random background variables
let randomBackgroundVa = true;
let randomBackgroundInterval;

//[1] %%%%%%% toggle option box %%%%%%%%%%%%%%%%%%%%%
let optionBox = document.querySelector(".option-box");
// console.log(optionBox);
let optionIcon = document.querySelector(".option-icon");
// console.log(optionIcon);
optionIcon.addEventListener("click", () => {
  //=========< toogle class fa-spin for rotation on self >==========================
  optionBox.classList.toggle("open");
  //=========< toogle class open on main option box >===============================
  optionIcon.classList.toggle("fa-spin");
});

//[2] %%%%%%% switch colors %%%%%%%%%%%%%%%%%%%%%%%%
let listLi = document.querySelectorAll(".color-list li");
// console.log(listLi);
//===========< loop on all list items >=============================================
listLi.forEach((li) => {
  //   console.log(li);
  //===========< click event for each item >========================================
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //===========< set color in localstorage >======================================
    localStorage.setItem("color-option", e.target.dataset.color);
    //===========< toggle active class >============================================
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

//[3] %%%%%%% localstorage color %%%%%%%%%%%%%%%%%%
//===========< check if there is localstorage color option>=========================
let mainColor = localStorage.getItem("color-option");
// console.log(mainColor);
if (mainColor !== null) {
  //===========< save the color which in localstorage >=============================
  document.documentElement.style.setProperty("--main-color", mainColor);
  //===========< save active class >================================================
  document.querySelectorAll(".color-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}

//[4] %%%%%%% localstorage background %%%%%%%%%%%%%%%
//===========< check if there is localstorage background option>=====================
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
//[5] %%%%%%% switch random background %%%%%%%%%%%%%
// console.log(randomBackgroundSpan);
randomBackgroundSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");

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

//[6] %%%%%%% change background image url %%%%%%%%%%
function randomBackground() {
  if (randomBackgroundVa === true) {
    randomBackgroundInterval = setInterval(() => {
      //===========< select landing page element >=======================================
      let landingPage = document.getElementById("landing-page");
      // console.log(landingPage);

      //===========< get array of images >===============================================
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
//[7] %%%%%%% animated progress %%%%%%%%%%%%%%%%%%%%%
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
//[8] %%%%%%% product details %%%%%%%%%%%%%%%%%%%%%
let images = document.querySelectorAll(
  ".our-products .products .product-box img"
);

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    //access group data custome
    let productImgBox = img.closest(".product-box");
    let group = productImgBox.dataset.group;
    // console.log(group);
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
    //============================================================================================
    // //main img
    // let mainImg = document.createElement("img");
    // mainImg.classList.add("main-img");
    // mainImg.src = img.src;
    // overLayOutBox.appendChild(mainImg);
    // //more imges div
    // let moreImagesContent = document.createElement("div");
    // moreImagesContent.classList.add("more-imgs-content");
    // overLayOutBox.appendChild(moreImagesContent);
    // //get group img function
    // function getGroupImg(group) {
    //   if (group === "group1") {
    //     return [
    //       "./image/1-1.jpg",
    //       "./image/1-2.jpg",
    //       "./image/1-3.jpg",
    //       "./image/1-4.jpg",
    //     ];
    //   } else if (group === "group2") {
    //     return [
    //       "./image/2-1.jpg",
    //       "./image/2-2.jpg",
    //       "./image/2-1.jpg",
    //       "./image/2-2.jpg",
    //     ];
    //   } else if (group === "group3") {
    //     return [
    //       "./image/3-1.jpg",
    //       "./image/3-2.jpg",
    //       "./image/3-1.jpg",
    //       "./image/3-2.jpg",
    //     ];
    //   } else if (group === "group4") {
    //     return [
    //       "./image/6-1.jpg",
    //       "./image/6-2.jpg",
    //       "./image/6-1.jpg",
    //       "./image/6-2.jpg",
    //     ];
    //   } else if (group === "group5") {
    //     return [
    //       "./image/5-1.jpg",
    //       "./image/5-2.jpg",
    //       "./image/5-3.jpg",
    //       "./image/5-4.jpg",
    //     ];
    //   } else if (group === "group6") {
    //     return [
    //       "./image/6-3.jpg",
    //       "./image/6-4.jpg",
    //       "./image/6-3.jpg",
    //       "./image/6-4.jpg",
    //     ];
    //   }
    // }
    // let groupImges = getGroupImg(group);
    // groupImges.forEach((img) => {
    //   let imgEle = document.createElement("img");
    //   imgEle.src = img;
    //   moreImagesContent.appendChild(imgEle);
    // });

    // ====================================================================================
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
//[8] %%%%%%% descount toggle %%%%%%%%%%%%%%%%%%%%%
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

//[9] %%%%%%% bullets smoth scroll %%%%%%%%%%%%%%%%%%%%%
let allBullets = document.querySelectorAll(".nav-bullets .bullets");
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
//[10] %%%%%%% bullets optins %%%%%%%%%%%%%%%%%%%%%%%%%%%
let bulletsButton = document.querySelectorAll(".show-bullets span");
let buttletsContainer = document.querySelector(".nav-bullets");
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
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.bullets === "block") {
      buttletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      buttletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
  });
});
// reset options
document
  .querySelector(".option-box .reset-option")
  .addEventListener("click", function () {
    localStorage.removeItem("color-option");
    localStorage.removeItem("bacground-option");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("mode-option");

    window.location.reload();
  });
//[11] %%%%%%% mode optins %%%%%%%%%%%%%%%%%%%%%%%%%%%
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
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.dataset.mode === "dark") {
      dark();
    } else {
      light();
    }
  });
});
//[12] %%%%%%% toglee menu %%%%%%%%%%%%%%%%%%%%%%%%%%%
//==============< button click effect >====================================================
var toggleButton = document.querySelector("#landing-page .header .toggle-menu");
var links = document.querySelector("#landing-page .header .links");
var menuActive = document.querySelector("#landing-page .header .toggle-menu");
toggleButton.addEventListener("click", (e) => {
  //==============< stop propagation for button >==========================================
  e.stopPropagation();
  links.classList.toggle("open");
  menuActive.classList.toggle("menu-active");
});
//==============< document click effect >==================================================
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== links) {
    //chek of the menu is opend
    if (links.classList.contains("open")) {
      // console.log("menu is opend");
      links.classList.toggle("open");
      menuActive.classList.toggle("menu-active");
    }
  }
});
//==============< stop propagation for linkes >==========================================
links.addEventListener("click", (e) => {
  e.stopPropagation();
});
