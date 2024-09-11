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
audio.volume = 0.3;
audio.playbackRate = 1;

// botones
const startButtonNode = document.querySelector("#start-button");
const resetButtonNode = document.querySelector("#reset-button");
const muteButtonNode = document.querySelector("#mute-button");


//* VARIABLES GLOBALES DEL JUEGO

//character and food objects
let chefObj = null;

let fishOrder = new Food("fish", 10, "./images/fish.png");
let chickenOrder = new Food("chicken", 5, "./images/chicken.png");
let milkOrder = new Food("milk", -5, "./images/milk.png");
let saladOrder = new Food("salad", -5, "./images/salad.png");

//ingredients
let fishObj = null;
let chickenObj = null;
let milkObj = null;
let saladObj = null;


//objects functionality
let ingredientsArr = [];
let hand = null; 
let menuArr = [fishOrder, chickenOrder, milkOrder, saladOrder]; 
let ordersArr =[];
let ordersFrecuency = 800;



//stats
let score = 0;
const duration = 120; //120 seconds
let remainingTime = duration;
let timer = null;

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

function placeIngredients() {
//cleaning game-box of ingredients and reseting ingredients array
  ingredientsArr.forEach((eachIngredient) => {
  gameBoxNode.removeChild(eachIngredient.node);
  });
  ingredientsArr = [];
//placing new ingredients of every type
  fishObj = new Ingredient("fish", 10,"./images/fish.png");
  console.log(fishObj);

  chickenObj = new Ingredient("chicken", 5, "./images/chicken.png");
  console.log(chickenObj);

  milkObj = new Ingredient("milk", -5, "./images/milk.png");
  console.log(milkObj);

  saladObj = new Ingredient("salad", -5, "./images/salad.png");
  console.log(saladObj);

  ingredientsArr.push(fishObj, chickenObj, milkObj, saladObj);

  console.log("ingredientes", ingredientsArr);
  }


function takeFood() {
  
  ingredientsArr.forEach((eachIngredient) => {
    if (
      chefObj.x < eachIngredient.x + eachIngredient.w &&
      chefObj.x + chefObj.w > eachIngredient.x &&
      chefObj.y < eachIngredient.y + eachIngredient.h &&
      chefObj.y + chefObj.h > eachIngredient.y
    ) {
      console.log("ingredientsArr antes de coger algo", ingredientsArr)
        handBoxNode.innerHTML = "";
        hand = eachIngredient;
        const handNode = document.createElement("img");
        handNode.src = hand.img;
        handNode.style.width = `${hand.w}px`;
        handNode.style.height = `${hand.h}px`;
        handBoxNode.appendChild(handNode);

        ingredientsArr.splice((indexOf.eachIngredient),1);
        gameBoxNode.removeChild(eachIngredient.node);
        placeIngredients();
        console.log("ingredientsArr despues de coger algo", ingredientsArr)
      console.log("entra en funcion coger");
    }
  });
}




  function deliverOrder() {

    if (chefObj.x === 4 ) {
      const deliveredFood = hand;
      console.log("array mano", hand);
      if (deliveredFood.name === ordersArr[0].name) {
        score += deliveredFood.points;
        orderDelivered();
      } else {
        score -= 20;
      }
      ordersArr.shift();
      newOrder();
    }
    handBoxNode.innerHTML = "";
    handArr = [];
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
  audio.playbackRate = 1;
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
  ingredientsArr = [];
  hand = null;
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
      case " ":
       deliverOrder();
        console.log("espacio");
        break;
    }
  }
);


//*BONUS

function musicSpeed() {
  if (remainingTime < 30) {
    audio.playbackRate = 1.3;
  } else if (remainingTime < 20) {
    audio.playbackRate = 1.5;
  } else if (remainingTime < 10) {
    audio.playbackRate = 2.3;
  } else if (remainingTime < 5) {
    audio.playbackRate = 2.8;
  }
}


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
//Acelerar musica cuando queda poco tiempo

