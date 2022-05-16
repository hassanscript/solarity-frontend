import axios from "axios";
import { update_scrollbar, intersected, intersectedCleared } from "./utils";
const urlBase = "https://solarity-server.herokuapp.com/api";
const apiCaller = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
  },
});
var twitter_array;
apiCaller
  .get("/test/tweets/SolanaMoneyBoys")
  .then((data) => {
    twitter_array = data.data.data;
  })
  .catch((err) => {
    twitter_array = [
      { created_at: "no data", full_text: "no data" },
      { created_at: "no data", full_text: "no data" },
      { created_at: "no data", full_text: "no data" },
      { created_at: "no data", full_text: "no data" },
      { created_at: "no data", full_text: "no data" },
      { created_at: "no data", full_text: "no data" },
    ];
  });
//twitter
const TWITTER_TO_DISPLAY = 4;
var twitter_start_index = 0;
var twitter_itemEL_array = [];
function build_twitter() {
  var twitter_containerEl = document.getElementById("twitter");

  for (let twitter_item of twitter_array) {
    var twitter_itemEL = document.createElement("a-plane");
    twitter_containerEl.appendChild(twitter_itemEL);
    twitter_itemEL.setAttribute("raycaster-listen");
    twitter_itemEL.classList.add("clickable");
    twitter_itemEL.classList.add("nocollision");
    twitter_itemEL.classList.add("twitter_item");
    twitter_itemEL.setAttribute("width", 2.8);
    twitter_itemEL.setAttribute("height", 0.7);
    twitter_itemEL.setAttribute("color", "#AA44BB");
    twitter_itemEL.setAttribute("material", "shader: flat; repeat: 1 1");
    twitter_itemEL.setAttribute("src", "#tweet-img");

    var twitter_item_dateEL = document.createElement("a-text");
    twitter_itemEL.appendChild(twitter_item_dateEL);
    twitter_item_dateEL.setAttribute("value", twitter_item.created_at);
    twitter_item_dateEL.setAttribute("wrap-count", 80);
    twitter_item_dateEL.setAttribute("baseline", "top");
    twitter_item_dateEL.setAttribute("x-offset", -0.15);
    twitter_item_dateEL.setAttribute("width", 2.7);
    twitter_item_dateEL.setAttribute("align", "right");
    twitter_item_dateEL.setAttribute("position", { x: 1.4, y: -0.27, z: 0.01 });
    twitter_item_dateEL.setAttribute("color", "#AAEEFF");

    var twitter_item_textEL = document.createElement("a-text");
    twitter_itemEL.appendChild(twitter_item_textEL);
    twitter_item_textEL.setAttribute("value", twitter_item.full_text);
    twitter_item_textEL.setAttribute("wrap-count", 60);
    twitter_item_textEL.setAttribute("baseline", "top");
    twitter_item_textEL.setAttribute("x-offset", 0.05);
    twitter_item_textEL.setAttribute("width", 2.7);
    twitter_item_textEL.setAttribute("position", { x: -1.4, y: 0.3, z: 0.01 });
  }
  twitter_itemEL_array = document.getElementsByClassName("twitter_item");
  build_twitter_listeners();
  update_scrollbar(
    0,
    TWITTER_TO_DISPLAY,
    twitter_itemEL_array,
    { x: 0, y: 1.1 },
    { x: 0, y: -0.8 }
  );
}
function scroll_twitter_up() {
  if (twitter_start_index > 0) {
    update_scrollbar(
      (twitter_start_index -= 1),
      TWITTER_TO_DISPLAY,
      twitter_itemEL_array,
      { x: 0, y: 1.1 },
      { x: 0, y: -0.8 }
    );
  } else {
    update_scrollbar(
      (twitter_start_index = Math.max(
        twitter_itemEL_array.length - TWITTER_TO_DISPLAY,
        0
      )),
      TWITTER_TO_DISPLAY,
      twitter_itemEL_array,
      { x: 0, y: 1.1 },
      { x: 0, y: -0.8 }
    );
  }
}
function scroll_twitter_down() {
  if (
    twitter_start_index + TWITTER_TO_DISPLAY - 1 <
    twitter_itemEL_array.length - 1
  ) {
    update_scrollbar(
      (twitter_start_index += 1),
      TWITTER_TO_DISPLAY,
      twitter_itemEL_array,
      { x: 0, y: 1.1 },
      { x: 0, y: -0.8 }
    );
  } else {
    update_scrollbar(
      (twitter_start_index = 0),
      TWITTER_TO_DISPLAY,
      twitter_itemEL_array,
      { x: 0, y: 1.1 },
      { x: 0, y: -0.8 }
    );
  }
}

function build_twitter_listeners() {
  document
    .getElementById("scroll_twitter_up")
    .addEventListener("click", scroll_twitter_up);
  document
    .getElementById("scroll_twitter_down")
    .addEventListener("click", scroll_twitter_down);
  document
    .getElementById("scroll_twitter_up")
    .addEventListener("raycaster-intersected", intersected, false);
  document
    .getElementById("scroll_twitter_up")
    .addEventListener(
      "raycaster-intersected-cleared",
      intersectedCleared,
      false
    );
  document
    .getElementById("scroll_twitter_down")
    .addEventListener("raycaster-intersected", intersected, false);
  document
    .getElementById("scroll_twitter_down")
    .addEventListener(
      "raycaster-intersected-cleared",
      intersectedCleared,
      false
    );
}

//nft
var nft;
apiCaller
  .get("/daos/solana_money_boys")
  .then((data) => {
    nft = data.data.dao;
  })
  .catch((err) => {
    nft = {
      floorPrice: "no data",
      image: "assets/images/nft_placeholder.jpeg",
    };
  });
function build_nft() {
  var nft_containerEl = document.getElementById("nft");
  var nft_item_amountEL = document.createElement("a-text");
  nft_containerEl.appendChild(nft_item_amountEL);
  nft_item_amountEL.setAttribute("value", nft.floorPrice);
  nft_item_amountEL.setAttribute("wrap-count", 15);
  nft_item_amountEL.setAttribute("baseline", "top");
  nft_item_amountEL.setAttribute("x-offset", 0.05);
  nft_item_amountEL.setAttribute("width", 3);
  nft_item_amountEL.setAttribute("align", "center");
  nft_item_amountEL.setAttribute("position", { x: 0, y: -1.45, z: 0.01 });
  nft_item_amountEL.setAttribute("color", "#AAEEFF");

  var nft_item_imageEL = document.createElement("a-image");
  nft_containerEl.appendChild(nft_item_imageEL);
  nft_item_imageEL.setAttribute("src", nft.image);
  nft_item_imageEL.setAttribute("width", 3);
  nft_item_imageEL.setAttribute("height", 3);
  nft_item_imageEL.setAttribute("position", { x: 0, y: 0.25, z: 0.01 });
  build_nft_listeners();
}

function build_nft_listeners() {}

var gif_img_index = 0;
var gif_img_array = ["#gif-img1", "#gif-img2", "#gif-img3", "#gif-img4"];
function startGif() {
  document
    .getElementById("big_screen_img")
    .setAttribute("src", gif_img_array[gif_img_index]);
  if (gif_img_index < gif_img_array.length - 1) gif_img_index++;
  else gif_img_index = 0;
}

export function start_screens() {
  build_twitter();
  build_nft();
  return window.setInterval(function () {
    startGif();
  }, 500);
}
