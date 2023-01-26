
class Tablero{
  constructor(largo) {
    this.largo=largo;
    this.elemento = document.querySelector('.tablero');
    this.cajas = []
    this.array = []
  }

  crearTablero() {
    for(let i=0; i<this.largo; i++) {
      this.array[i] = [];
      this.cajas[i] = [];
    }

    for(let x=0; x<this.largo; x++) {
      for(let y=0; y<this.largo; y++){
        const caja = document.createElement('div');
        caja.classList.add('caja');
        caja.innerHTML = 0;
        this.cajas[x][y] = caja;
        this.array[x][y] = 0;
        this.elemento.appendChild(caja);
      }
    }

    this.elemento.style.gridTemplateColumns = `repeat(${this.largo}, 80px)`
    this.elemento.style.gridTemplateRows = `repeat(${this.largo}, 80px)`

    this.rellenarAleatorio();
    this.rellenarAleatorio();
    this.pintarTablero();
    document.addEventListener("keydown", (e)=> this.mover(e));
  }

  pintarTablero() {
    for(let x=0; x<this.largo; x++) {
      for(let y=0; y<this.largo; y++){
        this.cajas[x][y].innerHTML = this.array[x][y];
        this.pintarCaja(this.cajas[x][y], this.array[x][y])
      }
    }
  }

  pintarCaja(caja, numero) {
    switch(numero){
      case 2:  
        caja.style.background = '#eee4da';
        caja.style.color = '#776e65'
      break;
      case 4: 
        caja.style.background = '#eee1c9'
        caja.style.color = '#776e65'
      break;
      case 8: 
        caja.style.background = '#f69664'
        caja.style.color = '#f9f6f2'
      break;
      case 16: 
        caja.style.background = '#f69664'
        caja.style.color = '#f9f6f2'
      break;
      case 32: 
        caja.style.background = '#f77c5f'
        caja.style.color = '#f9f6f2'
      break;
      case 64: 
        caja.style.background = '#f75f3b'
        caja.style.color = '#f9f6f2'
      break;
      default: 
        caja.style.background = '#cdc1b4'
        caja.style.color = 'transparent'
      break;
    }
  }

  rellenarAleatorio() {
    // se crean dos valores aleatorios para generar una posicion aleatoria   

    let max = this.largo * this.largo;
    for (let i = 0; i < max; i++) {
      let X = Math.floor(Math.random()*this.largo);
      let Y = Math.floor(Math.random()*this.largo);
      if (this.array[X][Y] === 0) {
        this.array[X][Y] = 2; 
        break;
      }
      // si esa posicion es 0 se rellena con 2, 0 significa que esta vacio
    }
    
  }

  mover(e) {
    switch (e.keyCode) {
      case 39:
        this.moverDerIzq(true) // derecha
        break;
      case 38:
        this.moverArribaAbajo(true);// arriba
        break;
      case 37:
        this.moverDerIzq(false) // izquierda
        break;
      case 40:
        this.moverArribaAbajo(false); // abajo
    }
    this.rellenarAleatorio();
    this.pintarTablero();
  }

  moverDerIzq(direccion) {
    // true derecha, false izquierda

    let newArray = [];
    for(let i=0; i<this.largo; i++) {
      newArray.push(this.array[i].filter(n=> n>0))         
      newArray[i] = direccion ? this.sumarDerecha(newArray[i]) :  this.sumarIzquierda(newArray[i]);
      newArray[i] = newArray[i].filter(n=> n>0);
      for(let j=0; j<this.largo;j++) {        
        // rellena con ceros a la izquierda
        if(newArray[i].length<this.largo) {
          direccion ? newArray[i].unshift(0) : newArray[i].push(0);
        }
      }
    }
    this.array = newArray;

  }

  moverArribaAbajo(direccion) {
    // true arriba, false abajo

    let newArray = [];
    let array = []
    for(let i=0; i<this.largo; i++) {
      for(let j=0; j<this.largo;j++) {    
        array.push(this.array[j][i])        
      }
      newArray.push(array)
      array = []      
    }

    for(let i=0; i<this.largo; i++) {

      newArray[i] = direccion ? this.sumarIzquierda(newArray[i].filter(n=> n>0)) : this.sumarDerecha(newArray[i].filter(n=> n>0));
      newArray[i] = newArray[i].filter(n=> n>0);

      for(let j=0; j<this.largo;j++) {        
        // rellena con ceros a la izquierda
        if(newArray[i].length<this.largo) {
          direccion ? newArray[i].push(0) : newArray[i].unshift(0);
        }
      }

    }

    for(let i=0; i<this.largo; i++) {
      for(let j=0; j<this.largo;j++) {   
        this.array[i][j] = newArray[j][i];
      }
    }    
  }

  sumarDerecha(array) {
    for(let i=array.length; i>0; i--) {
      if(i>=0) {
        if(array[i] === array[i-1]) {
          array[i] = array[i]+array[i-1];
          array[i-1] = 0;
        }
      }
    }    
    return array;
  }

  sumarIzquierda(array) {
    for(let i=0; i<array.length; i++) {
      if(i<array.length) {
        if(array[i] === array[i+1]) {
          array[i] = array[i]+array[i+1];
          array[i+1] = 0;
        }
      }
    }    
    return array;
  }
}