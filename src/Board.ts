import { Square } from "./Square";
import { BoardArray, rowBoard, cellBoard } from "./types";

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
      const squareNumber = this.array[y][x].num;
      if (squareNumber === 0) {
        const c = new Square(
          x,
          y,
          this.SIZE_SQUARE,
          this.SIZE,
          this.containerSquares
        );
        this.array[y][x].num = 2;
        this.array[y][x].square = c;
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
        this.handleMoveX(true);
        break;
      case "ArrowUp":
        this.handleMoveY(false);
        break;
      case "ArrowLeft":
        this.handleMoveX(false);
        break;
      case "ArrowDown":
        this.handleMoveY(true);
    }
    this.addRandomSquare(this.SIZE);
  }

  handleMoveX(direction: boolean) {
    const newArray = this.array.map((row) => {
      const filteredRow = row.filter((n) => n.num > 0);
      const summedRow = direction
        ? this.sumRight(filteredRow)
        : this.sumLeft(filteredRow);
      const finalRow = summedRow.filter((n) => n.num > 0);
      const fillRow = this.fillRow(finalRow, direction);
      this.moveX(fillRow);
      return fillRow;
    });
    this.array = newArray;
  }

  fillRow(row: rowBoard, direction: boolean) {
    const newRow = row;
    for (let j = 0; j < this.SIZE; j++) {
      if (newRow.length < this.SIZE) {
        direction
          ? newRow.unshift({ num: 0, square: null })
          : newRow.push({ num: 0, square: null });
      }
    }
    return newRow;
  }

  moveX(row: rowBoard) {
    row.forEach((s, i) => {
      if (s.num <= 0) return;
      s.square!.moveTo(i, s.square!.y, this.SIZE_SQUARE, s.num);
    });
  }

  moveY(row: rowBoard) {
    row.forEach((s, i) => {
      if (s.num <= 0) return;
      s.square!.moveTo(s.square!.x, i, this.SIZE_SQUARE, s.num);
    });
  }

  handleMoveY(direction: boolean) {
    // true arriba, false abajo
    const arrayChanged = this.changeArrayDirecton(this.array);
    const newArray = arrayChanged.map((row) => {
      const filteredRow = row.filter((n) => n.num > 0);
      const summedRow = direction
        ? this.sumRight(filteredRow)
        : this.sumLeft(filteredRow);
      const finalRow = summedRow.filter((n) => n.num > 0);
      const fillRow = this.fillRow(finalRow, direction);
      this.moveY(fillRow);
      return fillRow;
    });
    this.array = this.changeArrayDirecton(newArray);
  }

  changeArrayDirecton(array: BoardArray) {
    let newArray: BoardArray = [];
    for (let i = 0; i < this.SIZE; i++) {
      newArray[i] = [];
      for (let j = 0; j < this.SIZE; j++) {
        newArray[i][j] = array[j][i];
      }
    }
    return newArray;
  }

  sumRight(array: rowBoard) {
    for (let i = array.length - 1; i > 0; i--) {
      if (i < 0) break;
      const cell = array[i];
      const cellAnt = array[i - 1];
      if (cell.num === cellAnt.num) {
        this.removeSquareElement(cellAnt, cell);
        cell.num += cellAnt.num;
        cellAnt.num = 0;
        cellAnt.square = null;
      }
    }
    return array;
  }

  sumLeft(array: rowBoard) {
    for (let i = 0; i < array.length; i++) {
      if (i >= array.length - 1) break;
      const cell = array[i];
      const cellNext = array[i + 1];
      if (cell.num === cellNext.num) {
        this.removeSquareElement(cellNext, cell);
        cell.num += cellNext.num;
        cellNext.num = 0;
        cellNext.square = null;
      }
    }
    return array;
  }

  removeSquareElement(cellNext: cellBoard, cell: cellBoard) {
    cellNext.square!.moveTo(
      cell.square!.x,
      cell.square!.y,
      this.SIZE_SQUARE,
      cellNext.num
    );
    this.containerSquares.removeChild(cellNext.square!.element);
  }
}
