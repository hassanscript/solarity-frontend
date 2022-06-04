// var sceneWrapperEl = document.getElementById('sceneWrapper');

// var loadingScreenEl = document.getElementById('loadingScreen');
// var loadingTextEl = document.getElementById('loadingText');
// var loadingBarEl = document.getElementById('loadingBar');

var models = [];
var modelsNumber;
var modelsLoaded = 0;
//builds loading screen when scene is not loaded
export function build_loadingScreen() {
  var loadingTextEl = document.getElementById("loadingText");
  var loadingBarEl = document.getElementById("loadingBar");
  var loadingTextEl = document.getElementById("loadingText");
  loadingTextEl.innerHTML = "LOADING SCENE";
  var loadingBarItemEL = document.createElement("div");
  loadingBarEl.appendChild(loadingBarItemEL);
  loadingBarItemEL.classList.add("moving_item");
  loadingBarItemEL.setAttribute("id", "loadingBar_moving_item");

}
//updates loading screen based on models actually loaded
export function update_loadingScreen() {
  models = document.querySelectorAll('[model-info]');
  modelsNumber = models.length;
  var sceneWrapperEl = document.getElementById("sceneWrapper");
  var loadingTextEl = document.getElementById("loadingText");
  var loadingBarEl = document.getElementById("loadingBar");
  var loadingScreenEl = document.getElementById("loadingScreen");
  var loading_videoEl = document.getElementById("background_video");
  var movingItemEL = document.getElementById("loadingBar_moving_item");


  // var loading_videoEl = document.getElementById('background_video');
  setTimeout(function () {
    if(modelsLoaded != 0)
      localStorage.setItem('modelLoaded', "true");
    modelsLoaded = 0;
    models = [];
    modelsNumber = undefined;
    if (!!sceneWrapperEl) sceneWrapperEl.removeAttribute("style");
    if (!!loadingScreenEl) loadingScreenEl.style.display = "none";
    if(!!loading_videoEl) {
      loading_videoEl.remove();
    }
  }, 10000);
  modelsLoaded++;
  if (modelsLoaded == 1) {
    //remove the old bar item when the first model is loaded
    if(!!movingItemEL) {
      movingItemEL.remove();
    }
  }
  if (loadingTextEl)
    loadingTextEl.innerHTML =
      "LOADING MODELS " +
      Math.round((modelsLoaded * 100) / modelsNumber) +
      " %";
  var loadingBarItemEL = document.createElement("div");
  if (!!loadingBarEl) {
    loadingBarEl.appendChild(loadingBarItemEL);
    loadingBarItemEL.style.maxWidth = 80 / modelsNumber + "vw";
    loadingBarItemEL.style.display = "inline-block";
    loadingBarItemEL.style.height = "14px";
    loadingBarItemEL.style.backgroundColor = "#AA88FF";
    loadingBarItemEL.style.width = "auto";
    loadingBarItemEL.style.display = "flexbox";
    loadingBarItemEL.style.flexGrow = 1;
    loadingBarItemEL.style.opacity = 0.6;
  }
  
  if (modelsLoaded == modelsNumber) {
    modelsLoaded = 0;
    models = [];
    modelsNumber = undefined;
    localStorage.setItem('modelLoaded', "true");
    if (!!sceneWrapperEl) sceneWrapperEl.removeAttribute("style");
    if (!!loadingScreenEl) loadingScreenEl.style.display = "none";
    if(!!loading_videoEl) {
      loading_videoEl.remove();
    }
  }
}
//checks if model has loaded before building all of the dinamic content
/*
export function start_loadingScreen_listeners() {
  modelsLoaded = 0;
  models = document.getElementsByClassName("model");
  modelsNumber = models.length;console.log('modelsNumber', modelsNumber);
  for (var i = 0; i < modelsNumber; i++) {
    models[i].addEventListener("model-loaded", update_loadingScreen);
  }
}
*/