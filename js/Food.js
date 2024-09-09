class Food {
  constructor(name, points, position, img) {
    this.x = position;
    this.y = 0;
    this.h = 50;
    this.w = 50;

    this.name = name;
    this.points = points;
    this.cooked = false;

    this.node = document.createElement("img");
    this.node.src = `${img}`;
    gameBoxNode.append(this.node);
    this.node.style.margin = `${10}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
}
