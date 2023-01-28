
class Tablero{
  constructor(largo) {
    this.largo=largo;
    this.elemento = document.querySelector('.tablero');
    this.cajas = [];
    this.array = [];
    this.puntaje = 0;
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
    caja.style.background = this.obtenerFondo(numero);
    caja.style.color = this.obtenerColor(numero);    
  }

  obtenerFondo(numero){
    switch(numero){
        case 2:return"#eee4da";break;
        case 4:return"#ede0c8";break;
        case 8:return"#f2b179";break;
        case 16:return"#f59563";break;
        case 32:return"#f67e5f";break;
        case 64:return"#f65e3b";break;
        case 128:return"#edcf72";break;
        case 256:return"#edcc61";break;
        case 512:return"#4cc74a";break;
        case 1024:return"#33b5e5";break;
        case 2048:return"#09c";break;
        case 4096:return"#a6c";break;
        case 8192:return"#93c";break;
    }
    return '#cdc1b4';
  }

  obtenerColor(numero) {
    switch(numero){
      case 0:return"transparent";break;
      case 2:return"#776e65";break;
      case 4:return"#776e65";break;
  }
  return '#f9f6f2';
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
    console.log(this.puntaje)
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
          this.puntaje+=array[i];
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
          this.puntaje+=array[i];
          array[i+1] = 0;
        }
      }
    }    
    return array;
  }
}