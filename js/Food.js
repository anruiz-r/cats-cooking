class Food {
  constructor(name, points, img) {

    this.h = 70;
    this.w = 70;

    this.name = name;
    this.points = points;
    this.img = img;

    this.node = document.createElement("img");
    this.node.src = `${this.img}`;
    
   
    this.node.style.margin = `${10}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
  }
}

class Ingredient extends Food {
  constructor(name, points, img) {
    super(name, points, img);
    this.x = Math.floor(Math.random() * gameBoxNode.offsetWidth-30);
    this.y = Math.floor(Math.random() * gameBoxNode.offsetHeight-30);

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    gameBoxNode.append(this.node);
  }
}


class Client {
  constructor() {

    this.x = Math.floor(Math.random() * (gameBoxNode.offsetWidth- (this.w)));
    this.y = Math.floor(Math.random() * (gameBoxNode.offsetHeight- (this.h)));
    this.h = 150;
    this.w =200;


    this.node = document.createElement("img");
    this.node.src = `./images/cat-client.png`;


    this.node.style.margin = `${10}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";
    this.node.style.left = `+${this.x}px`;
    this.node.style.top = `+${this.y}px`;

    gameBoxNode.append(this.node);
  }

  
}