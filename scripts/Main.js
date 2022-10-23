
const t = new Tablero(4,4);
const btnNewGame = document.querySelector('.btn-newGame');

btnNewGame.addEventListener('click', ()=> {
    t.iniciar();
})

t.rellenarTablero();