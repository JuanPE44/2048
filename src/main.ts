import "./style.css";
import { Game } from "./Game";

if (localStorage.getItem("bestScore") === null) {
  let puntos: [] | number[] = [];
  localStorage.setItem("bestScore", JSON.stringify(puntos));
}

const g = new Game();

const containerGame = document.querySelector<HTMLDivElement>(".container-game");

containerGame?.appendChild(g.board.element);
