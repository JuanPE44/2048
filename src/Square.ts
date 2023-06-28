import { Board } from "./Board";

export class Square {
  id;
  board;
  x;
  y;
  SIZE;
  SIZE_BOARD;
  element;
  squareNumber;
  container;
  number;
  constructor(
    id: number,
    board: Board,
    x: number,
    y: number,
    SIZE: number,
    SIZE_BOARD: number,
    container: HTMLDivElement
  ) {
    this.id = id;
    this.board = board;
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
    this.element.id = this.id.toString();
    this.element.style.width = `${this.SIZE}px`;
    this.element.style.height = `${this.SIZE}px`;
    this.squareNumber.innerHTML = this.number.toString();
    this.squareNumber.classList.add("square-2", "square-number");
    this.element.classList.add("square");
    this.element.appendChild(this.squareNumber);
    this.container?.appendChild(this.element);
  }

  updateSquareElement(number: number) {
    if (this.number !== number) {
      this.squareNumber.classList.remove(
        `square-${this.number}`,
        "square-animated"
      );
      void this.squareNumber.offsetWidth;
      this.squareNumber.classList.add(`square-${number}`, "square-animated");
      this.squareNumber.innerHTML = number.toString();
      this.element.style.zIndex = `${number}`;
    }
  }

  moveTo(x: number, y: number, SIZE: number, number: number) {
    const { borderX, borderY } = this.getBorder(x, y);
    this.element.style.transform = `translate(${x * SIZE + borderX}px, ${
      y * SIZE + borderY
    }px)`;
    this.updateSquareElement(number);
    this.number = number;
    this.x = x;
    this.y = y;
  }

  moveSquareAnt(x: number, y: number, SIZE: number, squareAnt: Square | null) {
    console.log(squareAnt?.element.id);
    if (!squareAnt) return;
    if (!this.squareExistInContainer(squareAnt.element.id)) return;
    const { borderX, borderY } = this.getBorder(x, y);
    squareAnt!.element.style.transform = `translate(${x * SIZE + borderX}px, ${
      y * SIZE + borderY
    }px)`;
    squareAnt.element.id = "";
    setTimeout(() => {
      squareAnt.element.style.display = "none";
      this.board.containerSquares.removeChild(squareAnt.element);
    }, 50);
  }

  squareExistInContainer(id: string) {
    if (id === "") return false;
    const squares = document.querySelectorAll(".square");
    const ids = [...squares].map((s) => s.id);
    console.log({ id, ids });
    return ids.includes(id);
  }

  getBorder(x: number, y: number) {
    return { borderX: 10 * x, borderY: 10 * y };
  }
}
