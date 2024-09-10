class Chef {
  constructor() {
    this.x = 300;
    this.y = 50;
    this.h = 130;
    this.w = 100;
    this.directionY = 0;
    this.directionX = 0;

    this.node = document.createElement("img");
    this.node.src = "./images/cat-chef.png";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  movesRight() {
    this.x += 50;
    this.node.style.left = `${this.x}px`;
    console.log("entra en move");
  }

  movesLeft() {
    this.x -= 50;
    this.node.style.left = `${this.x}px`;
    console.log("entra en move");
  }

  movesDown() {
    this.y += 50;
    this.node.style.top = `${this.y}px`;
    console.log("entra en move");
  }

  movesUp() {
    this.y -= 50;
    this.node.style.top = `${this.y}px`;
    console.log("entra en move");
  }

  move() {
    //update position of player
    this.x += this.directionX;
    this.y += this.directionY;

    /*// Limit player to stay inside the game-box
    if (this.x < 50) {
      this.x = 50;
    }

    if (this.y < 50) {
      this.y = 50;
    }

    if (this.x > (gameBoxNode.offsetWidth - this.w - 50)) {
      this.x = (gameBoxNode.offsetWidth - this.w - 50);
    }

    if (this.y > gameBoxNode.offsetHeight - this.h - 50) {
      this.y = gameBoxNode.offsetHeight - this.h - 50;
    }*/
    // medir zona game-box menos mostrador y cambiar 30 por esas medidas

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
}
