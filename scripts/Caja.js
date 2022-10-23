

class Caja {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.elemento;
        this.posFinal = false;
    }

    crearCaja() {
        const caja = document.createElement('div');
        caja.classList.add('caja');
        caja.innerHTML = ''
        caja.id = this.x.toString()+this.y.toString();
        this.elemento = caja;
        return caja;
    }
}