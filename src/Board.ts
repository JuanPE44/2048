import { Game } from "./Game";
import { Square } from "./Square";
import { BoardArray, rowBoard, cellBoard } from "./types";

export class Board {
  game;
  element: HTMLDivElement | null;
  SIZE;
  SIZE_SQUARE;
  containerSquares;
  array: BoardArray;
  squareAnt: Square | null;
  idSquares;
  constructor(game: Game, SIZE: number) {
    this.game = game;
    this.SIZE = SIZE;
    this.SIZE_SQUARE = 70;
    this.squareAnt = null;
    this.idSquares = 0;
    this.element = document.querySelector(".board");
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
    this.element?.appendChild(squares);
    this.element!.style.gridTemplateColumns = `repeat(${SIZE}, ${this.SIZE_SQUARE}px)`;
    this.element!.style.gridTemplateRows = `repeat(${SIZE}, ${this.SIZE_SQUARE}px)`;
  }

  createContainerSquares() {
    const container = document.createElement("div");
    container.classList.add("container-squares");
    this.element?.appendChild(container);
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
      const cell = this.array[y][x];
      if (cell.num === 0) {
        this.idSquares++;
        const c = new Square(
          this.idSquares,
          this,
          x,
          y,
          this.SIZE_SQUARE,
          this.SIZE,
          this.containerSquares
        );
        cell.num = 2;
        cell.square = c;
        break;
      }
    }
  }

  getRandomNumbers(SIZE: number): { x: number; y: number } {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);
    return { x, y };
  }

  init() {
    let flag = false;
    document.addEventListener("keydown", (e) => {
      if (!flag) {
        flag = true;
        this.handleMove(e);
      }
      this.game.addColorArrows(e);
    });
    document.addEventListener("keyup", (e) => {
      flag = false;
      this.game.removeColorArrows(e);
    });

    this.game.arrowBottom?.addEventListener("click", () => {
      this.handleMoveY(true);
    });
    this.game.arrowLeft?.addEventListener("click", () => {
      this.handleMoveX(false);
    });
    this.game.arrowRight?.addEventListener("click", () => {
      this.handleMoveX(true);
    });
    this.game.arrowUp?.addEventListener("click", () => {
      this.handleMoveY(false);
    });

    this.addRandomSquare(this.SIZE);
    this.addRandomSquare(this.SIZE);
  }

  handleMove(e: KeyboardEvent) {
    if (this.game.win) return;
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
  }

  handleMoveX(direction: boolean) {
    const newArray = this.array.map((row) => {
      const filteredRow = row.filter((n) => n.num > 0);
      const { summedRow, summed, squareAnt } = direction
        ? this.sumRight(filteredRow)
        : this.sumLeft(filteredRow);
      const finalRow = summedRow.filter((n) => n.num > 0);
      const fillRow = this.fillRow(finalRow, direction);
      this.moveX(fillRow, summed, squareAnt!);
      return fillRow;
    });
    this.array = newArray;
    this.addRandomSquare(this.SIZE);
  }

  handleMoveY(direction: boolean) {
    const arrayChanged = this.changeArrayDirecton(this.array);
    const newArray = arrayChanged.map((row) => {
      const filteredRow = row.filter((n) => n.num > 0);
      const { summedRow, summed, squareAnt } = direction
        ? this.sumRight(filteredRow)
        : this.sumLeft(filteredRow);
      const finalRow = summedRow.filter((n) => n.num > 0);
      const fillRow = this.fillRow(finalRow, direction);
      this.moveY(fillRow, summed, squareAnt!);
      return fillRow;
    });
    this.array = this.changeArrayDirecton(newArray);
    this.addRandomSquare(this.SIZE);
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

  moveX(row: rowBoard, summed: boolean, squareAnt: Square) {
    row.forEach((s, i) => {
      if (s.num <= 0) return;
      const y = s.square!.y;
      if (summed) {
        s.square!.moveSquareAnt(i, y, this.SIZE_SQUARE, squareAnt);
      }
      s.square!.moveTo(i, y, this.SIZE_SQUARE, s.num);
    });
  }

  moveY(row: rowBoard, summed: boolean, squareAnt: Square) {
    row.forEach((s, i) => {
      if (s.num <= 0) return;
      const x = s.square!.x;
      if (summed) {
        s.square!.moveSquareAnt(x, i, this.SIZE_SQUARE, squareAnt);
      }
      s.square!.moveTo(x, i, this.SIZE_SQUARE, s.num);
    });
  }

  sumRight(array: rowBoard) {
    let summed = false;
    let squareAnt: Square | null = null;
    for (let i = array.length - 1; i > 0; i--) {
      if (i < 0) break;
      const cell = array[i];
      const cellAnt = array[i - 1];
      if (cell.num === cellAnt.num) {
        this.sumSquares(cell, cellAnt);
        squareAnt = cellAnt.square;
        summed = true;
        cellAnt.num = 0;
        cellAnt.square = null;
      }
    }
    return { summedRow: array, summed, squareAnt };
  }

  sumLeft(array: rowBoard) {
    let summed = false;
    let squareAnt: Square | null = null;
    for (let i = 0; i < array.length; i++) {
      if (i >= array.length - 1) break;
      const cell = array[i];
      const cellAnt = array[i + 1];
      if (cell.num === cellAnt.num) {
        this.sumSquares(cell, cellAnt);
        squareAnt = cellAnt.square;
        summed = true;
        cellAnt.num = 0;
        cellAnt.square = null;
      }
    }
    return { summedRow: array, summed, squareAnt };
  }

  sumSquares(cell: cellBoard, cellAnt: cellBoard) {
    cell.num += cellAnt.num;
    this.game.handleScore(cell.num);
    this.game.checkWin(cell.num);
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
}
