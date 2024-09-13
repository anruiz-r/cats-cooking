//* NODOS

// pantallas
const startScreenNode = document.getElementById("start-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameoverScreenNode = document.getElementById("gameover-screen");
const howToPlayCardNode = document.getElementById("how-to-play");

// game box
const gameBoxNode = document.querySelector("#game-box");
const ordersBoxNode = document.querySelector("#orders-box");
const handBoxNode = document.querySelector("#hand-box");
let deliveryAreaNode = document.querySelector("#delivery-area");
const foodHandBoxNode = document.querySelector("#hand-box img");
const timeNode = document.getElementById("time");
const pointsNode = document.querySelector("#points-marker p");

//game over box
const gameoverImg = document.querySelector("#gameover-screen img");
const gameoverH1 = document.querySelector("#gameover-screen h1");
const finalScoreNode = document.querySelector("#gameover-screen p");

// botones
const startButtonNode = document.querySelector("#start-button");
const startButtonContinueNode = document.querySelector("#start-button2");
const resetButtonNode = document.querySelector("#reset-button");
const muteButtonNode = document.querySelector("#mute-button");

//* VARIABLES GLOBALES DEL JUEGO

//character and food objects
let chefObj = null;

let fishOrder = new Food("fish", 10, "./images/fish.png");
let chickenOrder = new Food("chicken", 5, "./images/chicken.png");
let milkOrder = new Food("milk", -5, "./images/milk.png");

//ingredients
let fishObj = null;
let chickenObj = null;
let milkObj = null;
let saladObj = null;

//objects functionality
let clientsArr = [];
let ingredientsArr = [];
let hand = null;
let menuArr = [fishOrder, chickenOrder, milkOrder];
let ordersArr = [];
let ordersFrecuency = 800;
let clientsFrecuency = 2000;

//audio
const audio = document.querySelector("#soundtrack");
audio.volume = 0.3;
audio.playbackRate = 1;
const scoreUpSound = new Audio("./audio/coin-scoreUp.mp3");
scoreUp.volume = 0.4;
const scoreDownSound = new Audio("./audio/scoreDownMeow.mp3");
scoreUp.volume = 0.4;
const takeSound = new Audio("./audio/takeSound.mp3");
scoreUp.volume = 0.4;

//stats
let score = 0;
const duration = 120; //120 seconds
let remainingTime = duration;
let timer = null;

//intervals
let playInterval = null;
let ordersInterval = null;
let clientsInterval = null;

//* FUNCIONES GLOBALES DEL JUEGO

//NEW GAME

//Timer
function startTime() {
  timer = setInterval(() => {
    remainingTime--;
    formatTime();
    if (remainingTime < 0) {
      gameover();
      clearInterval(timer);
    }
  }, 1000);
}

function formatTime() {
  //Show time in "minutes:seconds" format
  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");

  timeNode.innerText = `${minutes}:${seconds}`;
}

function updatePoints() {
  //Update points marker to match variable score
  pointsNode.innerText = score;
}

function howToPlay() {
  startScreenNode.style.display = "none";
  howToPlayCardNode.style.display = "flex";
}

function startGame() {
  //Timer on
  timeNode.innerText = duration;
  formatTime();
  startTime();

  //Screen switch
  howToPlayCardNode.style.display = "none";
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //character and food objects ready
  chefObj = new Chef();

  placeIngredients();

  //INTERVALS
  playInterval = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  ordersInterval = setInterval(() => {
    newOrder();
  }, ordersFrecuency);

  //Music on
  audio.play();
  audio.loop = true;
}

function gameLoop() {
  //Checking 60 times per second
  chefObj.moveLimits();
  takeFood();
  updatePoints();
  musicSpeed();
}

//Game funcionalities

function placeIngredients() {
  //cleaning game-box of ingredients and reseting ingredients array
  ingredientsArr.forEach((eachIngredient) => {
    gameBoxNode.removeChild(eachIngredient.node);
  });
  ingredientsArr = [];
  //placing new ingredients of every type
  fishObj = new Ingredient("fish", 20, "./images/fish.png");

  chickenObj = new Ingredient("chicken", 15, "./images/chicken.png");

  milkObj = new Ingredient("milk", 5, "./images/milk.png");

  saladObj = new Ingredient("salad", -20, "./images/salad.png");

  ingredientsArr.push(fishObj, chickenObj, milkObj, saladObj);
}

function takeFood() {
  //checks if ingredients are in chef´s way and has empty hands
  ingredientsArr.forEach((eachIngredient, index) => {
    if (
      chefObj.x < eachIngredient.x + eachIngredient.w &&
      chefObj.x + chefObj.w > eachIngredient.x &&
      chefObj.y < eachIngredient.y + eachIngredient.h &&
      chefObj.y + chefObj.h > eachIngredient.y &&
      hand === null
    ) {
      handBoxNode.innerHTML = "";
      hand = eachIngredient;
      const handNode = document.createElement("img");
      handNode.src = hand.img;
      handNode.style.width = `${hand.w}px`;
      handNode.style.height = `${hand.h}px`;
      handBoxNode.appendChild(handNode);

      takeFoodAnimation();

      ingredientsArr.splice(index, 1);
      gameBoxNode.removeChild(eachIngredient.node);
      //wait 1.5s to place the new ingredient so there is always 4 types
      setTimeout(() => {
        let newIngredient = new Ingredient(
          eachIngredient.name,
          eachIngredient.points,
          eachIngredient.img
        );
        ingredientsArr.push(newIngredient);
      }, 1500);
    }
  });
}

function deliverOrder() {
  //check if chef is in delivery area
  if (
    chefObj.x > deliveryAreaNode.offsetLeft - chefObj.w &&
    chefObj.x < deliveryAreaNode.offsetLeft + deliveryAreaNode.offsetWidth &&
    chefObj.y > deliveryAreaNode.offsetTop - chefObj.h &&
    chefObj.y < deliveryAreaNode.offsetTop + deliveryAreaNode.offsetHeight
  ) {
    console.log("entra condicion deliver");
    const deliveredFood = hand;
    if (deliveredFood && deliveredFood.name === ordersArr[0].name) {
      score += deliveredFood.points; //right order delivered, get points
      scoreUp();
    } else {
      score -= 5; //we failed, lose points
      scoreDown();
    }
    ordersArr.shift(); //first order
    ordersBoxNode.removeChild(ordersBoxNode.children[0]);
  }
  handBoxNode.innerHTML = "";
  hand = null;
}

function newOrder() {
  if (ordersArr.length < 5) {
    const randomOrderIndex = Math.floor(Math.random() * menuArr.length);
    let newOrderObj = menuArr[randomOrderIndex];
    ordersArr.push(newOrderObj);

    const orderNode = document.createElement("img");
    orderNode.src = newOrderObj.img;
    orderNode.style.width = `${newOrderObj.w}px`;
    orderNode.style.height = `${newOrderObj.h}px`;
    ordersBoxNode.appendChild(orderNode);
  }
}

function resultScreen() {
  finalScoreNode.innerText = `SCORE: ${score} points`;
  if (score >= 100) {
    gameoverH1.innerText = "Well done!";
    gameoverImg.src = "./images/wellDoneCat.png";
  } else {
    gameoverH1.innerText = "GAME OVER";
    gameoverImg.src = "./images/start-img-chef.png";
  }
}

// ENDS GAME

function gameover() {
  resultScreen();
  //screens switch
  gameScreenNode.style.display = "none";
  gameoverScreenNode.style.display = "flex";
  //cleaning intervals
  clearInterval(playInterval);
  clearInterval(ordersInterval);
  clearInterval(timer);
  //time reset
  remainingTime = duration;
  formatTime();
  //music stops and reset
  audio.pause();
  audio.currentTime = 0;
  audio.playbackRate = 1;
}

function resetGame() {
  //screens switch
  gameoverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";
  //cleaning game-box
  gameBoxNode.innerHTML = `<div id="delivery-area"></div>`;
  deliveryAreaNode = document.querySelector("#delivery-area");
  ordersBoxNode.innerHTML = "";
  handBoxNode.innerHTML = "";
  //play elements reset
  chefObj = null;
  fishObj = null;
  chickenObj = null;
  milkObj = null;
  saladObj = null;
  score = 0;
  ordersArr = [];
  ingredientsArr = [];
  hand = null;
  //reset audio muted
  audio.muted = false;
  takeSound.muted = false;
  scoreDownSound.muted = false;
  scoreUpSound.muted = false;
}

//* EVENT LISTENERS

startButtonNode.addEventListener("click", howToPlay);
startButtonContinueNode.addEventListener("click", startGame);
resetButtonNode.addEventListener("click", resetGame);
muteButtonNode.addEventListener("click", muteSoundtrack);

// Event listener para el teclado
document.addEventListener("keydown", (event) => {
  const key = event.key;
  event.preventDefault();

  switch (key) {
    case "ArrowLeft":
      chefObj.movesLeft();
      break;
    case "ArrowUp":
      chefObj.movesUp();
      break;
    case "ArrowRight":
      chefObj.movesRight();
      break;
    case "ArrowDown":
      chefObj.movesDown();
      break;
    case " ":
      deliverOrder();
      break;
  }
});

//*BONUS

function muteSoundtrack() {
  if (audio.muted === false) {
    audio.muted = true;
    scoreUpSound.muted = true;
    scoreDownSound.muted = true;
    takeSound.muted = true;
  } else {
    audio.muted = false;
    scoreUpSound.muted = false;
    scoreDownSound.muted = false;
    takeSound.muted = false;
  }
}

function musicSpeed() {
  if (remainingTime < 30) {
    audio.playbackRate = 1.3;
  } else if (remainingTime < 20) {
    audio.playbackRate = 1.5;
  } else if (remainingTime < 10) {
    audio.playbackRate = 2;
  } else if (remainingTime < 5) {
    audio.playbackRate = 3;
  }
}

function takeFoodAnimation() {
  takeSound.play();
  handBoxNode.style.transitionProperty = "width, height";
  handBoxNode.style.transitionDuration = "0.5s";
  handBoxNode.style.width = "75px";
  handBoxNode.style.height = "75px";
  //Back to initial CSS
  setTimeout(() => {
    handBoxNode.style.width = "70px";
    handBoxNode.style.height = "70px";
  }, 1000);
}

function scoreUp() {
  scoreUpSound.play(); //sound to show you earned points
  pointsNode.style.transitionProperty = "fontSize";
  pointsNode.style.transitionDuration = "1s";
  pointsNode.style.fontSize = "4.5rem";
  //Back to initial CSS
  setTimeout(() => {
    pointsNode.style.fontSize = "3.5rem";
  }, 1000);
}

function scoreDown() {
  scoreDownSound.play(); //sad cat because his food is not good
  pointsNode.style.transitionProperty = "fontSize, color";
  pointsNode.style.transitionDuration = "1s";
  pointsNode.style.fontSize = "4.5rem";
  pointsNode.style.color = "#ff5100";
  //Back to initial CSS
  setTimeout(() => {
    pointsNode.style.fontSize = "3.5rem";
    pointsNode.style.color = "orange";
  }, 1000);
}
