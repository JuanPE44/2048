import "./style.css";
import { Board } from "./Board";

const app = document.querySelector<HTMLDivElement>("#app");
const b = new Board(4);
app?.appendChild(b.element);
