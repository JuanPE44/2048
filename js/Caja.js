
class Caja {
  constructor(x,y){
    this.elemento;
    this.elementoNum;
    this.num = 2;
    this.x = x;
    this.y = y;    
  }
  
  crearCaja(){
    const caja = document.createElement('div');
    const cajaNum = document.createElement('div');
    cajaNum.innerHTML = this.num;
    cajaNum.classList.add('caja-2');
    cajaNum.classList.add('caja-num');
    caja.classList.add('caja');
    caja.classList.add(`pos-${this.y}-${this.x}`);
    caja.appendChild(cajaNum);
    this.elemento = caja;
    this.elementoNum = cajaNum;
    return caja;
  }

  moverCaja(num){
    this.elemento.classList = `caja pos-${this.y}-${this.x}`;
    this.elementoNum.classList.add(`caja-${num}`)
    this.elementoNum.innerHTML = num; 
  }
}