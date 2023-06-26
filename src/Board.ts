import { Square } from "./Square";
import { BoardArray, rowBoard } from "./types";

export class Board {
  element;
  SIZE;
  SIZE_SQUARE;
  containerSquares;
  array: BoardArray;
  constructor(SIZE: number) {
    this.SIZE = SIZE;
    this.SIZE_SQUARE = 80;
    this.element = document.createElement("div");
    this.array = this.createBoardArray(SIZE);
    this.containerSquares = this.createContainerSquares();
    this.init();
  }

  createBoardArray(SIZE: number): BoardArray {
    const fragment = document.createDocumentFragment();
    const array = new Array(this.SIZE);
    for (let i = 0; i < SIZE; i++) {
      array[i] = [];
      for (let j = 0; j < this.SIZE; j++) {
        const cell = this.createCell();
        fragment.appendChild(cell);
        array[i][j] = { num: 0, square: null };
      }
    }
    this.createBoard(fragment, SIZE);
    return array;
  }

  createBoard(squares: DocumentFragment, SIZE: number) {
    this.element.appendChild(squares);
    this.element.classList.add("board");
    this.element.style.gridTemplateColumns = `repeat(${SIZE}, ${this.SIZE_SQUARE}px)`;
    this.element.style.gridTemplateRows = `repeat(${SIZE}, ${this.SIZE_SQUARE}px)`;
  }

  createContainerSquares() {
    const container = document.createElement("div");
    container.classList.add("container-squares");
    this.element.appendChild(container);
    return container;
  }

  createCell(): HTMLDivElement {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    return cell;
  }

  addRandomSquare(SIZE: number) {
    let max = SIZE * SIZE;
    for (let i = 0; i < max; i++) {
      const { x, y } = this.getRandomNumbers(SIZE);
      const squareNumber = this.array[x][y].num;
      if (squareNumber === 0) {
        const c = new Square(
          x,
          y,
          this.SIZE_SQUARE,
          this.SIZE,
          this.containerSquares
        );
        this.array[x][y].num = 2;
        this.array[x][y].square = c;
        break;
      }
    }
  }

  getRandomNumbers(SIZE: number): { x: number; y: number } {
    let x = Math.floor(Math.random() * SIZE);
    let y = Math.floor(Math.random() * SIZE);
    return { x, y };
  }

  init() {
    document.addEventListener("keydown", (e) => this.handleMove(e));
    this.addRandomSquare(this.SIZE);
    this.addRandomSquare(this.SIZE);
  }

  handleMove(e: KeyboardEvent) {
    const keyName = e.code;
    switch (keyName) {
      case "ArrowRight":
        this.handleMoveX(false);
        break;
      case "ArrowUp":
        this.handleMoveY(false);
        break;
      case "ArrowLeft":
        this.handleMoveX(true);
        break;
      case "ArrowDown":
        this.handleMoveY(true);
    }
    this.addRandomSquare(this.SIZE);
  }

  handleMoveY(direction: boolean) {
    // true derecha, false izquierda
    let newArray = [];
    for (let i = 0; i < this.SIZE; i++) {
      newArray.push(this.array[i].filter((n) => n.num > 0));
      newArray[i] = direction
        ? this.sumRight(newArray[i])
        : this.sumLeft(newArray[i]);
      newArray[i] = newArray[i].filter((n) => n.num > 0);
      for (let j = 0; j < this.SIZE; j++) {
        // rellena con ceros a la izquierda
        if (newArray[i].length < this.SIZE) {
          direction
            ? newArray[i].unshift({ num: 0, square: null })
            : newArray[i].push({ num: 0, square: null });
        }
      }
      newArray[i].forEach((c, i) => {
        if (c.num > 0) {
          c.square!.y = i;
          c.square!.moveTo(c.square!.x, i, this.SIZE_SQUARE, c.num);
        }
      });
    }
    this.array = newArray;
  }

  handleMoveX(direction: boolean) {
    // true arriba, false abajo

    let newArray = [];
    let array = [];
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        array.push(this.array[j][i]);
      }
      newArray.push(array);
      array = [];
    }

    for (let i = 0; i < this.SIZE; i++) {
      newArray[i] = direction
        ? this.sumLeft(newArray[i].filter((n) => n.num > 0))
        : this.sumRight(newArray[i].filter((n) => n.num > 0));
      newArray[i] = newArray[i].filter((n) => n.num > 0);

      for (let j = 0; j < this.SIZE; j++) {
        // rellena con ceros a la izquierda
        if (newArray[i].length < this.SIZE) {
          direction
            ? newArray[i].push({ num: 0, square: null })
            : newArray[i].unshift({ num: 0, square: null });
        }
      }
      newArray[i].forEach((c, i) => {
        if (c.num > 0) {
          c.square!.x = i;
          c.square!.moveTo(i, c.square!.y, this.SIZE_SQUARE, c.num);
        }
      });
    }

    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.array[i][j] = newArray[j][i];
      }
    }
  }

  sumRight(array: rowBoard) {
    for (let i = array.length - 1; i > 0; i--) {
      if (i >= 0) {
        if (array[i].num === array[i - 1].num) {
          array[i].num += array[i - 1].num;
          this.containerSquares.removeChild(array[i - 1].square!.element);
          array[i - 1].num = 0;
          array[i - 1].square = null;
        }
      }
    }

    return array;
  }

  sumLeft(array: rowBoard) {
    for (let i = 0; i < array.length; i++) {
      if (i < array.length - 1) {
        if (array[i].num === array[i + 1].num) {
          array[i].num += array[i + 1].num;
          this.containerSquares.removeChild(array[i + 1].square!.element);
          array[i + 1].num = 0;
          array[i + 1].square = null;
        }
      }
    }
    return array;
  }
}
