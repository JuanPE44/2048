import { Board } from "./Board";

export class Game {
  score = 0;
  elementScore;
  elementBestScore;
  board;
  win;
  arrowLeft: HTMLDivElement | null = document.querySelector(".left");
  arrowUp: HTMLDivElement | null = document.querySelector(".up");
  arrowBottom: HTMLDivElement | null = document.querySelector(".bottom");
  arrowRight: HTMLDivElement | null = document.querySelector(".right");

  constructor() {
    this.board = new Board(this, 4);
    this.elementScore = document.querySelector(".score span");
    this.elementBestScore = document.querySelector(".best-score span");
    this.win = false;
    this.drawBestScore();
    document
      .querySelector(".newgame button")
      ?.addEventListener("click", () => this.newGame());
    document
      .querySelector(".button-win")
      ?.addEventListener("click", () => this.newGame());
  }

  handleScore(number: number) {
    this.score += number;
    this.elementScore!.innerHTML = this.score.toString();
    this.updateBestScore(this.score);
    this.drawBestScore();
  }

  updateBestScore(score: number) {
    const value = localStorage.getItem("bestScore");
    if (typeof value === "string") {
      const puntos: number[] = JSON.parse(value);
      puntos.push(score);
      localStorage.setItem("bestScore", JSON.stringify(puntos));
    }
  }

  drawBestScore() {
    const value = localStorage.getItem("bestScore");
    if (typeof value === "string") {
      let puntos: number[] = JSON.parse(value);
      let max = 0;
      puntos.forEach((p) => {
        if (p > max) {
          max = p;
        }
      });
      this.elementBestScore!.innerHTML = `${max}`;
    }
  }

  newGame() {
    const containerWin: HTMLDivElement | null =
      document.querySelector(".container-win");
    containerWin!.style.display = "none";
    this.score = 0;
    this.win = false;
    this.elementScore!.innerHTML = this.score.toString();
    const newArray = this.board.array.map((row) => {
      return row.map(() => {
        return { num: 0, square: null };
      });
    });
    this.board.array = newArray;
    this.board.containerSquares.innerHTML = "";
    this.board.addRandomSquare(this.board.SIZE);
    this.board.addRandomSquare(this.board.SIZE);
  }

  checkWin(number: number) {
    if (number === 2048) {
      this.handleWin();
    }
  }

  handleWin() {
    this.win = true;
    const containerWin: HTMLDivElement | null =
      document.querySelector(".container-win");
    const winScore: HTMLDivElement | null =
      document.querySelector(".win-score span");
    containerWin!.style.display = "flex";
    winScore!.innerHTML = this.score.toString();
  }

  addColorArrows(e: KeyboardEvent) {
    const keyName = e.code;
    switch (keyName) {
      case "ArrowRight":
        this.arrowRight!.style.background = "#f2b179";
        break;
      case "ArrowUp":
        this.arrowUp!.style.background = "#f2b179";
        break;
      case "ArrowLeft":
        this.arrowLeft!.style.background = "#f2b179";
        break;
      case "ArrowDown":
        this.arrowBottom!.style.background = "#f2b179";
        break;
    }
  }

  removeColorArrows(e: KeyboardEvent) {
    const keyName = e.code;
    switch (keyName) {
      case "ArrowRight":
        this.arrowRight!.style.background = "";
        break;
      case "ArrowUp":
        this.arrowUp!.style.background = "";
        break;
      case "ArrowLeft":
        this.arrowLeft!.style.background = "";
        break;
      case "ArrowDown":
        this.arrowBottom!.style.background = "";
        break;
    }
  }
}
