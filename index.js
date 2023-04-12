if (localStorage.getItem("puntos2048") === null) {
  let puntos = [];
  localStorage.setItem("puntos2048", JSON.stringify(puntos));
}

const btnReiniciar = document.querySelector(".reiniciar button");
const t = new Tablero(4);

t.crearTablero();

btnReiniciar.addEventListener("click", () => {
  t.reiniciar();
});
