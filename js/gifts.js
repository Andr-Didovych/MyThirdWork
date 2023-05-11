const likesStr = "gift_likes";
let allGifts = [];
let giftsByCategory = [];

// function getUrl() {
//     let resault = `${window.location.protocol}//${window.location.host}/`;
//     return resault;
//   }

function setTheme(theme) {
  localStorage.setItem("theme", theme);
}

function getTheme() {
  let theme = localStorage.getItem("theme");
  if (theme == null) {
    setTheme("light");
    theme = localStorage.getItem("theme");
  }
  return theme;
}

function switchTheme() {
  let theme = getTheme();
  if (theme == "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

function redrawTheme() {
  switchTheme();
  let theme = getTheme();
  if (theme == "light") {
    document.body.className = "theme-light";
  } else {
    document.body.className = "theme-dark";
  }
}

function click_like(id, likes) {
  let store_likes = localStorage.getItem(`${likesStr}${id}`);
  if (store_likes == null) {
    store_likes = parseInt(likes) + 1;
    localStorage.setItem(`${likesStr}${id}`, store_likes.toString());
  } else {
    store_likes = parseInt(store_likes) + 1;
  }
  localStorage.setItem(`${likesStr}${id}`, store_likes.toString());
  let item = document.getElementById(`${likesStr}${id}`);
  item.innerHTML = `❤️ ${store_likes}`;
}

async function loadGifts() {
  let response = await fetch(`../data/gifts.json`);

  if (response.ok) {
    allGifts = await response.json();
    giftsByCategory = allGifts;
    allGifts.forEach((gift) => generateGift(gift));
  }
}

// Generate elements to show the gift
function generateGift(gift) {
  const giftContainer = document.getElementById("gifts_container");
  console.log(gift);
  const itemDiv = document.createElement("div");
  itemDiv.id = gift.id;
  itemDiv.setAttribute("class", "gifts");
  giftContainer.appendChild(itemDiv);

  const itemTitle = document.createElement("h2");
  itemTitle.setAttribute("class", "giftsTitle");
  itemTitle.innerText = gift.name;
  itemDiv.appendChild(itemTitle);

  const itemDiv2 = document.createElement("div");
  itemDiv2.setAttribute("class", "giftsImg");
  itemDiv.appendChild(itemDiv2);

  const itemImg = document.createElement("img");
  itemImg.src = gift.url;
  itemImg.alt = gift.name;
  itemImg.addEventListener("mouseover", () => {
    const header = document.getElementById("header");
    header.innerHTML = `Selected gift ${gift.name}`;
  });
  itemImg.addEventListener("mouseout", () => {
    const header = document.getElementById("header");
    header.innerHTML = ``;
  });
  itemImg.setAttribute("class", "giftsFoto");
  itemDiv2.appendChild(itemImg);

  const itemParagraph = document.createElement("p");
  itemParagraph.setAttribute("class", "giftsP");
  itemDiv.appendChild(itemParagraph);
  itemParagraph.innerText = gift.description;

  const itemBottomDiv = document.createElement("div");
  itemBottomDiv.setAttribute("class", "PriceLike");
  itemDiv.appendChild(itemBottomDiv);

  const itemPrice = document.createElement("p");
  itemPrice.setAttribute("class", "PriceP");
  itemBottomDiv.appendChild(itemPrice);
  itemPrice.innerText = gift.price;

  const likes = document.createElement("p");
  likes.classList.add("likes");
  itemBottomDiv.appendChild(likes);
  likes.setAttribute("id", `${likesStr}${gift.id}`);
  likes.setAttribute("onclick", `click_like(${gift.id}, ${gift.likes});`);
  const store_likes = parseInt(localStorage.getItem(`${likesStr}${gift.id}`));
  if (isNaN(store_likes)) {
    likes.textContent = `❤️ ${gift.likes}`;
  } else {
    likes.textContent = `❤️ ${store_likes}`;
  }

  const galleryLink = document.createElement("a");
  galleryLink.setAttribute("href", `./page.html?photo=${gift.id - 1}`);
  galleryLink.appendChild(itemImg);
  itemDiv2.appendChild(galleryLink);
}

async function resp_single(param) {
  let gift = 0;
  if (param != undefined) {
    gift = parseInt(param);
  }

  const gallery = document.getElementById("gallery1");
  const response1 = await fetch(`../data/gifts.json`);

  if (response1.ok) {
    allGifts = await response1.json();

    const galleryItem = document.createElement("div");
    galleryItem.id = allGifts[gift].id;
    galleryItem.setAttribute("class", "gallery-item");
    gallery.appendChild(galleryItem);

    const itemTitle = document.createElement("h2");
    itemTitle.setAttribute("class", "giftsTitle");
    itemTitle.innerHTML = `<a href="./page.html?photo=${gift}">${allGifts[gift].name}</a>`;
    galleryItem.appendChild(itemTitle);

    const itemDiv2 = document.createElement("div");
    itemDiv2.setAttribute("class", "giftsImg");
    galleryItem.appendChild(itemDiv2);

    const itemImg = document.createElement("img");
    itemImg.src = allGifts[gift].url;
    itemImg.alt = allGifts[gift].name;
    itemImg.setAttribute("class", "giftsFoto");
    itemDiv2.appendChild(itemImg);

    const itemParagraph = document.createElement("p");
    itemParagraph.setAttribute("class", "giftsP");
    galleryItem.appendChild(itemParagraph);
    itemParagraph.innerText = allGifts[gift].description;

    const itemBottomDiv = document.createElement("div");
    itemBottomDiv.setAttribute("class", "PriceLike");
    galleryItem.appendChild(itemBottomDiv);

    const itemPrice = document.createElement("p");
    itemPrice.setAttribute("class", "PriceP");
    itemBottomDiv.appendChild(itemPrice);
    itemPrice.innerText = allGifts[gift].price;

    const likes = document.createElement("p");
    likes.classList.add("likes");
    itemBottomDiv.appendChild(likes);
    likes.setAttribute("id", `${likesStr}${allGifts[gift].id}`);
    likes.setAttribute(
      "onclick",
      `click_like(${allGifts[gift].id}, ${allGifts[gift].likes});`
    );
    const store_likes = parseInt(
      localStorage.getItem(`${likesStr}${allGifts[gift].id}`)
    );
    if (isNaN(store_likes)) {
      likes.textContent = `❤️ ${allGifts[gift].likes}`;
    } else {
      likes.textContent = `❤️ ${store_likes}`;
    }

    //back
    if (gift > 0) {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");

      const image = document.createElement("img");
      image.src = "../img/back.png";
      image.alt = "Back";

      const galleryLink = document.createElement("a");
      galleryLink.setAttribute("href", `./page.html?photo=${gift - 1}`);
      galleryLink.appendChild(image);

      const caption = document.createElement("div");
      caption.classList.add("caption");
      caption.textContent = "Back";

      galleryItem.appendChild(galleryLink);
      galleryItem.appendChild(caption);
      gallery.appendChild(galleryItem);
    }

    //forward
    if (gift < allGifts.length - 1) {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");

      const image = document.createElement("img");
      image.src = "../img/forward.png";
      image.alt = "Forward";

      const galleryLink = document.createElement("a");
      galleryLink.setAttribute("href", `./page.html?photo=${gift + 1}`);
      galleryLink.appendChild(image);

      const caption = document.createElement("div");
      caption.classList.add("caption");
      caption.textContent = "Forward";

      galleryItem.appendChild(galleryLink);
      galleryItem.appendChild(caption);
      gallery.appendChild(galleryItem);
    }
  } else {
    console.log("Error: " + response1.status);
  }
}

function get_url_and_render() {
  var url = window.location.href;
  // console.log("url: " + url);
  var query = url.split("?")[1];
  // console.log("query: " + query);
  var param;
  if (query != undefined) {
    param = query.split("=")[1];
    if (param == undefined) {
      param = 0;
    }
  } else {
    param = 0;
  }
  // console.log("param: " + param);
  resp_single(param);
}

function filterGiftsByPrice() {
  const minPrice = parseFloat(document.getElementById("min_price").value);
  const maxPrice = parseFloat(document.getElementById("max_price").value);

  if (isNaN(minPrice) || isNaN(maxPrice) || minPrice > maxPrice) {
    return;
  }

  // let filteredGifts1 = [];
  // for (let gift in allGifts) {
  //   if (allGifts[gift].price >= minPrice && allGifts[gift].price <= maxPrice) {
  //     filteredGifts1.push(allGifts[gift]);
  //   }
  // }

  const filteredGifts = giftsByCategory.filter(
    (gift) => gift.price >= minPrice && gift.price <= maxPrice
  );

  clearGifts();
  filteredGifts.forEach((gift) => generateGift(gift));
}

function filterByCategory() {
  const category = document.getElementById("categories_selector").value;
  if (category == "all") {
    giftsByCategory = allGifts;
  } else {
    giftsByCategory = allGifts.filter((elem) => elem.category == category);
  }

  clearGifts();
  giftsByCategory.forEach((gift) => generateGift(gift));
}

function clearGifts() {
  const giftContainer = document.getElementById("gifts_container");
  giftContainer.innerHTML = "";
}
