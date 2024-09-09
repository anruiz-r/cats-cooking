//* NODOS

// pantallas
const startScreenNode = document.getElementById("start-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameoverScreenNode = document.getElementById("gameover-screen");

// game box
const gameBoxNode = document.querySelector("#game-box");
const ordersBoxNode = document.querySelector("#orders-box");

// botones
const startButtonNode = document.querySelector("#start-button");
const resetButtonNode = document.querySelector("#reset-button");

//* VARIABLES GLOBALES DEL JUEGO
let chefObj = null;
let fishObj = null;
let chickenObj = null;
let milkObj = null;
let saladObj = null;

let score = 0;
let playInterval = null;
let ordersInterval = null;
let ordersFrecuency = 2000;

let handArr = []; //array de objetos
let ordersArr = []; // array de objetos

console.log(handArr);

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  console.log("comprobando si empieza el juego");
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  chefObj = new Chef();
  console.log(chefObj);

  fishObj = new Food("fish", 10, 300, "./images/fish.png");
  console.log(fishObj);

  chickenObj = new Food("chicken", 5, 370, "./images/chicken.png");
  console.log(chickenObj);

  milkObj = new Food("milk", -5, 440, "./images/milk.png");
  console.log(saladObj);

  saladObj = new Food("salad", -5, 510, "./images/salad.png");
  console.log(saladObj);

  //INTERVALOS

  playInterval = setInterval(() => {
    console.log("ejecuta intervalo de juego");
    gameLoop();
  }, Math.round(1000 / 60)); // 60 veces por segundo ¿ajustar?

  ordersInterval = setInterval(() => {
    if (ordersArr.length < 4) {
      newOrder();
    }
  }, ordersFrecuency);
}

function gameLoop() {
  //que cosas necesitamos que se comprueben cada x segundos y cuantos segundos seran

  takeFood(chefObj.x, chefObj.y);
  deliverOrder();
}

//funcion nuevos pedidos
//funcion detectar si se entrego un pedido(es igual? sumar puntos)
//funcion elimnar pedido entregado

function gameover() {
  console.log("comprobando si acaba el juego");

  //hay que limpiar intervals

  gameScreenNode.style.display = "none";
  gameoverScreenNode.style.display = "flex";
}

function resetGame() {
  console.log("comprobando si reinicia el juego");
  gameoverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";
  gameBoxNode.innerHTML = "";
  chefObj = null;
  fishObj = null;
  chickenObj = null;
  milkObj = null;
  saladObj = null;
  score = 0;
  // limpiar caja de juego
  //reiniciar elementos de juego
}

function takeFood(chefX, chefY) {
  if (chefX === 300 && chefY === 50 && handArr.length < 1) {
    handArr.push(fishObj);
    console.log("array mano", handArr);
  }
}

function deliverOrder() {
  if (chefX === 300 && chefY === 50 && handArr.length < 1) {
    const deliveredFood = handArr.pop;
    console.log("array mano", handArr);
    if (deliverOrder.name === ordersArr[0].name) {
      score += deliverOrder.points;
      orderDelivered();
    } else if (deliverOrder.name !== ordersArr[0].name) {
      score -= 20;
    }
  }
}

function newOrder() {
  const randomOrder = Math.floor(Math.random() * 3);
  let newOrderObj;

  if (randomOrder === 0) {
    newOrderObj = new Food("fish", 10, 300,"./images/fish.png"); 
    ordersArr.push(newOrderObj);
  } else if (randomOrder === 1) {
    newOrderObj = new Food("chicken", 5, 370, "./images/chicken.png");
    ordersArr.push(newOrderObj);
  } else if (randomOrder === 2) {
    newOrderObj = new Food("milk", -5, 440, "./images/milk.png");
    ordersArr.push(newOrderObj);
  } else if (randomOrder === 3) {
    newOrderObj = new Food("salad", -5, 510, "./images/salad.png");
    ordersArr.push(newOrderObj);
  }
}

function orderDelivered() {
  ordersArr.shift;
  newOrder();
}

//* EVENT LISTENERS

startButtonNode.addEventListener("click", startGame);
resetButtonNode.addEventListener("click", resetGame());

//* PLANNING *//

//* START:

//* PARTIDA:
//clase personaje
//Personaje (x, y, w, h)
//Personaje tiene que poder coger cosas
//Personaje tiene que poder soltar cosas
//Inventario de cosas en la mano
//clase alimentos x4:
//clase pescado
//clase pollo
//clase leche
//clase lechuga
//propiedades alimentos ?
// Cajas de ingredientes
// Pedidos (aparecen cada x segundos segun nivel)
//*Entrega:
//Pedidos deberian aparecer y desaparecer al ser entregados
//lechuga quita puntos
//
//Puntos
//Timer

//* GAME OVER:

//* BONUS
//Quitar puntos por pedidos incorrectos
//Cocinado
//Cortado
//Ranking
