class Tablero {
  constructor(largo) {
    this.largo = largo;
    this.elementoPuntaje = document.querySelector('.puntaje span')
    this.elemento = document.querySelector('.tablero');
    this.contenedorCajas = document.querySelector('.contenedor-cajas');
    this.array = [];
    this.puntaje = 0;
  }

  crearTablero() {
    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < this.largo; i++) {
      this.array[i] = [];
    }

    for (let x = 0; x < this.largo; x++) {
      for (let y = 0; y < this.largo; y++) {
        const div = document.createElement("div");
        div.classList.add("grid-cell");
        this.array[x][y] = { num: 0, caja: null };
        fragmento.appendChild(div);
      }
    }
    this.elemento.appendChild(fragmento);

    this.elemento.style.gridTemplateColumns = `repeat(${this.largo}, 80px)`;
    this.elemento.style.gridTemplateRows = `repeat(${this.largo}, 80px)`;

    this.rellenarAleatorio();
    this.rellenarAleatorio();
    document.addEventListener("keydown", (e) => this.mover(e));
  }

  rellenarAleatorio() {
    // se crean dos valores aleatorios para generar una posicion aleatoria
    let max = this.largo * this.largo;
    for (let i = 0; i < max; i++) {
      let X = Math.floor(Math.random() * this.largo);
      let Y = Math.floor(Math.random() * this.largo);
      if (this.array[X][Y].num === 0) {
        const c = new Caja(X, Y);
        const caja = c.crearCaja();
        this.contenedorCajas.appendChild(caja);
        this.array[X][Y].num = 2;
        this.array[X][Y].caja = c;
        break;
      }
      // si esa posicion es 0 se rellena con 2, 0 significa que esta vacio
    }
  }

  mover(e) {
    switch (e.keyCode) {
      case 39:
        this.moverDerIzq(true); // derecha
        break;
      case 38:
        this.moverArribaAbajo(true); // arriba
        break;
      case 37:
        this.moverDerIzq(false); // izquierda
        break;
      case 40:
        this.moverArribaAbajo(false); // abajo
    }
    this.rellenarAleatorio();
    // this.pintarTablero();
  }

  moverDerIzq(direccion) {
    // true derecha, false izquierda
    let newArray = [];
    for (let i = 0; i < this.largo; i++) {
      newArray.push(this.array[i].filter((n) => n.num > 0));
      newArray[i] = direccion
        ? this.sumarDerecha(newArray[i])
        : this.sumarIzquierda(newArray[i]);
      newArray[i] = newArray[i].filter((n) => n.num > 0);
      for (let j = 0; j < this.largo; j++) {
        // rellena con ceros a la izquierda
        if (newArray[i].length < this.largo) {
          direccion
            ? newArray[i].unshift({ num: 0, caja: null })
            : newArray[i].push({ num: 0, caja: null });
        }
      }
      newArray[i].forEach((c, i) => {
        if (c.num > 0) {
          c.caja.y = i;
          c.caja.moverCaja(c.num);
          console.log(c.num);
        }
      });
    }
    this.array = newArray;
  }

  moverArribaAbajo(direccion) {
    // true arriba, false abajo

    let newArray = [];
    let array = [];
    for (let i = 0; i < this.largo; i++) {
      for (let j = 0; j < this.largo; j++) {
        array.push(this.array[j][i]);
      }
      newArray.push(array);
      array = [];
    }

    for (let i = 0; i < this.largo; i++) {
      newArray[i] = direccion
        ? this.sumarIzquierda(newArray[i].filter((n) => n.num > 0))
        : this.sumarDerecha(newArray[i].filter((n) => n.num > 0));
      newArray[i] = newArray[i].filter((n) => n.num > 0);

      for (let j = 0; j < this.largo; j++) {
        // rellena con ceros a la izquierda
        if (newArray[i].length < this.largo) {
          direccion
            ? newArray[i].push({ num: 0, caja: null })
            : newArray[i].unshift({ num: 0, caja: null });
        }
      }
      newArray[i].forEach((c, i) => {
        if (c.num > 0) {
          c.caja.x = i;
          c.caja.moverCaja(c.num);
        }
      });
    }

    for (let i = 0; i < this.largo; i++) {
      for (let j = 0; j < this.largo; j++) {
        this.array[i][j] = newArray[j][i];
      }
    }
  }

  sumarDerecha(array) {
    for (let i = array.length - 1; i > 0; i--) {
      if (i >= 0) {
        if (array[i].num === array[i - 1].num) {
          array[i].num += array[i - 1].num;
          this.puntaje += array[i].num;
          this.elementoPuntaje.innerHTML = this.puntaje;
          this.contenedorCajas.removeChild(array[i - 1].caja.elemento);
          array[i - 1].num = 0;
          array[i - 1].caja = null;
        }
      }
    }

    return array;
  }

  sumarIzquierda(array) {
    for (let i = 0; i < array.length; i++) {
      if (i < array.length - 1) {
        if (array[i].num === array[i + 1].num) {
          array[i].num += array[i + 1].num;
          this.puntaje += array[i].num;
          this.contenedorCajas.removeChild(array[i + 1].caja.elemento);
          array[i + 1].num = 0;
          array[i + 1].caja = null;
        }
      }
    }
    return array;
  }

  reiniciar() {
    this.contenedorCajas.innerHTML = '';
    this.elementoPuntaje.innerHTML = 0;
    this.puntaje = 0;
    
    for (let x = 0; x < this.largo; x++) {
      for (let y = 0; y < this.largo; y++) {
        this.array[x][y] = { num: 0, caja: null };
      }
    }
    this.rellenarAleatorio();
    this.rellenarAleatorio();
  }
}
