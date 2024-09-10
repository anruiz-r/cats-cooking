class Food {
  constructor(name, points, img) {

    this.h = 70;
    this.w = 70;

    this.name = name;
    this.points = points;
    this.cooked = false;
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
  constructor(name, points, img, x, y) {
    super(name, points, img);
    this.x = x;
    this.y = y;

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    gameBoxNode.append(this.node);
  }
}

