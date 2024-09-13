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
    this.x = Math.floor(
      Math.random() * (gameBoxNode.offsetWidth - this.w - this.w) + this.w
    );
    this.y = Math.floor(
      Math.random() * (gameBoxNode.offsetHeight - this.h - this.h) + this.h
    );

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    gameBoxNode.append(this.node);
  }
}
