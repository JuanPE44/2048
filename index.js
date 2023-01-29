

const btnReiniciar = document.querySelector('.reiniciar button');
const t = new Tablero(4)

t.crearTablero()


btnReiniciar.addEventListener('click', ()=> {
  t.reiniciar()
});

