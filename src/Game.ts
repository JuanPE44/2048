import { Board } from "./Board";

export class Game {
  score = 0;
  elementScore;
  elementBestScore;
  board;

  constructor() {
    this.board = new Board(this, 4);
    this.elementScore = document.querySelector(".score span");
    this.elementBestScore = document.querySelector(".best-score span");
    this.drawBestScore();
    document
      .querySelector(".newgame")
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
    this.score = 0;
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
}
