//* NODOS

// pantallas
const startScreenNode = document.getElementById("start-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameoverScreenNode = document.getElementById("gameover-screen");

// game box
const gameBoxNode = document.querySelector("#game-box");
const ordersBoxNode = document.querySelector("#orders-box");
const handBoxNode = document.querySelector("#hand-box");
const timeNode = document.getElementById("time");
const pointsNode = document.querySelector("#points-marker p");
const audio = document.querySelector("#soundtrack");

// botones
const startButtonNode = document.querySelector("#start-button");
const resetButtonNode = document.querySelector("#reset-button");
const muteButtonNode = document.querySelector("#mute-button");


//* VARIABLES GLOBALES DEL JUEGO

//character and food objects
let chefObj = null;
let fishObj = null;
let chickenObj = null;
let milkObj = null;
let saladObj = null;



let fishOrder = new Food("fish", 10, "./images/fish.png");
let chickenOrder = new Food("chicken", 5, "./images/chicken.png");
let milkOrder = new Food("milk", -5, "./images/milk.png");
let saladOrder = new Food("salad", -5, "./images/salad.png");

//stats
let score = 0;
const duration = 120; //120 seconds
let remainingTime = duration;
let timer = null;

//objects functionality
let ordersFrecuency = 2000;
let handArr = null; 


let menuArr = [fishOrder, chickenOrder, milkOrder, saladOrder]; 
let ordersArr =[];

//intervals
let playInterval = null;
let ordersInterval = null;


//* FUNCIONES GLOBALES DEL JUEGO

//NEW GAME

//Timer
function startTime() {
  timer = setInterval(() => {
    remainingTime--;
    formatTime();
    if (remainingTime < 0) {
      gameover();
    }
  }, 1000);
}


function formatTime() {
  //Show time in "minutes:seconds" format
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");

  timeNode.innerText = `${minutes}:${seconds}`;
}

function muteSoundtrack() {
  if (audio.muted === false) {
    audio.muted = true;
  } else {
    audio.muted = false;
  }
}

function updatePoints() {
  //Update points marker to match variable score
  pointsNode.innerText = score;
}

function randomFoodPositionX() {
  let foodWidth = Math.floor(Math.random() * 800);
  return foodWidth;
  
}

function randomFoodPositionY() {
  let foodHeight = Math.floor(Math.random() * 600);
  return foodHeight;
}

function startGame() {
  //Timer on
  timeNode.innerText = duration;
  formatTime();
  startTime();

  //Screen switch
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //character and food objects ready
  chefObj = new Chef();
  console.log(chefObj);

  
  fishObj = new Ingredient("fish", 10,"./images/fish.png", randomFoodPositionX, randomFoodPositionY);
  console.log(fishObj);

  chickenObj = new Ingredient("chicken", 5, "./images/chicken.png", randomFoodPositionX, randomFoodPositionY);
  console.log(chickenObj);

  milkObj = new Ingredient("milk", -5, "./images/milk.png", randomFoodPositionX, randomFoodPositionY);
  console.log(milkObj);

  saladObj = new Ingredient("salad", -5, "./images/salad.png", randomFoodPositionX, randomFoodPositionY);
  console.log(saladObj);

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
  takeFood();
}


function gameLoop() {
  //Checking 60 times per second

  //deliverOrder(chefObj.x, chefObj.y);
 
  updatePoints();
}

function takeFood() {

  //cuando colisiona !!!! arreglar 
    handBoxNode.innerHTML = "";
    handArr = saladObj;
    const handNode = document.createElement("img");
    handNode.src = handArr.img;
    handNode.style.width = `${handArr.w}px`;
    handNode.style.height = `${handArr.h}px`;
    handBoxNode.appendChild(handNode);
    console.log("entra en funcion coger");
  }




//Game funcionalities 

/*function takeFood(chefX, chefY) {
  if (chefX === 300 && chefY === 50 && handArr.length < 1) {
    handArr.push(fishObj);
    console.log("array mano", handArr);
  }

  
}

function deliverOrder(chefX, chefY) {
  if (chefX === 900 && chefY === 500) {
    const deliveredFood = handArr.pop();
    console.log("array mano", handArr);
    if (deliveredFood.name === ordersArr[0].name) {
      score += deliveredFood.points;
      orderDelivered();
    } else {
      score -= 20;
    }
  }
}
function orderDelivered() {
  ordersArr.shift();
  newOrder();
}  
*/




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





  
//



// ENDS GAME

function gameover() {
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

  //music stops
  audio.pause();
}


function resetGame() {
 //screens switch
  gameoverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";

  //cleaning game-box
  gameBoxNode.innerHTML = "";
  ordersBoxNode.innerHTML = "";
  //play elements reset
  chefObj = null;
  fishObj = null;
  chickenObj = null;
  milkObj = null;
  saladObj = null;
  score = 0;
  ordersArr = [];
  handArr = [];
}


//* EVENT LISTENERS

startButtonNode.addEventListener("click", startGame);
resetButtonNode.addEventListener("click", resetGame);
muteButtonNode.addEventListener("click", muteSoundtrack);

// event listener para el teclado
document.addEventListener("keydown", (event) => {
  console.log("tecla funcionando")
  const key = event.key;

  event.preventDefault();

    // Update player's directionX and directionY based on the key pressed
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
      case "SpaceBar":
        takeFood();
        console.log("espacio");
        break;
    }
  }
);

//* PLANNING *//

//* START:

//* PARTIDA:
//clase personaje ✔
//Personaje (x, y, w, h) ✔
//Personaje tiene que poder coger cosas
//Personaje tiene que poder soltar cosas
//Inventario de cosas en la mano ✔
//clase alimentos x4: ✔
//clase pescado ✔
//clase pollo ✔
//clase leche ✔
//clase lechuga ✔
//propiedades alimentos ✔
// Cajas de ingredientes
// Pedidos (aparecen cada x segundos segun nivel)
//*Entrega:
//Pedidos deberian aparecer y desaparecer al ser entregados
//lechuga quita puntos
//
//Puntos
//Timer ✔
//funcion nuevos pedidos
//funcion detectar si se entrego un pedido(es igual? sumar puntos)
//funcion elimnar pedido entregado


//* GAME OVER:  ✔

//* BONUS
//Quitar puntos por pedidos incorrectos
//Cocinado
//Cortado
//Ranking
