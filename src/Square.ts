export class Square {
  x;
  y;
  SIZE;
  SIZE_BOARD;
  element;
  squareNumber;
  container;
  number;
  constructor(
    x: number,
    y: number,
    SIZE: number,
    SIZE_BOARD: number,
    container: HTMLDivElement
  ) {
    this.x = x;
    this.y = y;
    this.SIZE = SIZE;
    this.SIZE_BOARD = SIZE_BOARD;
    this.number = 2;
    this.element = document.createElement("div");
    this.squareNumber = document.createElement("div");
    this.container = container;
    this.createSquare();
    this.moveTo(x, y, SIZE, 2);
  }

  createSquare() {
    this.squareNumber.innerHTML = this.number.toString();
    this.squareNumber.classList.add("square-2", "square-number");
    this.element.classList.add("square");
    this.element.appendChild(this.squareNumber);
    this.container?.appendChild(this.element);
  }

  moveTo(x: number, y: number, SIZE: number, number: number) {
    const { borderX, borderY } = this.getBorder(x, y);
    this.element.style.transform = `translate(${x * SIZE + borderX}px, ${
      y * SIZE + borderY
    }px)`;
    this.squareNumber.classList.add(`square-${number}`);
    this.squareNumber.innerHTML = number.toString();
    this.x = x;
    this.y = y;
  }

  getBorder(x: number, y: number) {
    return { borderX: 10 * x, borderY: 10 * y };
  }
}
