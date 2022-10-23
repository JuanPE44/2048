

class Tablero {
    constructor(sizeX,sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.cajas = [];
    }

    iniciar() {
        document.addEventListener('keydown', (e)=> {
            this.control(e);
        })
        this.generarNumero();
        // this.generarNumero();
    }

    rellenarTablero() {

        for (let i = 0; i < this.sizeX; i++) {
            this.cajas[i] = [];            
        }

        const divTablero = document.querySelector('.tablero');
        const fragmento = document.createDocumentFragment();

        for (let y = 0; y < this.sizeY; y++) {
            for (let x = 0; x < this.sizeX; x++) {
                const c = new Caja(x,y);
                const caja = c.crearCaja();
                this.cajas[x][y] = c;
                fragmento.appendChild(caja);
            }
        }
        
        divTablero.appendChild(fragmento);
        divTablero.style.gridTemplateColumns = `repeat(${this.sizeX}, 70px)`;
        divTablero.style.gridTemplateRows = `repeat(${this.sizeY}, 70px)`;
    }

    control(e){ 
        switch(e.keyCode) {
            case 39: 
                this.moverCajas(2);
                this.posFinalFalse() // derecha 
            break;
            case 38: this.moverCajas(1); // arriba
            break;
            case 37: this.moverCajas(4); // izquierda
            break;
            case 40: this.moverCajas(3); // abajo
        }
    }

    aleatorio(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    generarNumero() {
        let vacio = false;
        let x;
        let y;
        let max = this.sizeX*this.sizeY; 
        for(let i=0;i<max;i++) {
            x = this.aleatorio(this.sizeX,-1);        
            y = this.aleatorio(this.sizeY,-1);
            let caja = this.cajas[x][y];
            if(caja.elemento.innerHTML === '') {
                caja.numero = '2';
                caja.elemento.innerHTML = caja.numero;            
                this.pintarCaja(caja);               
                break;
            }
        }      
    }

    pintarCaja(caja) {
        // console.log(caja)
        caja.elemento.classList.add('numero');
        caja.elemento.innerHTML = caja.numero;
        switch(parseInt(caja.numero)) {
            case 2: caja.elemento.classList.add('num2');
            break;
            case 4: 
                caja.elemento.classList.remove('num2');
                caja.elemento.classList.add('num4');
            break;
        }
    }

    despintarCaja(caja) {
        caja.elemento.classList.remove('numero');
        caja.elemento.innerHTML = '';
        switch(parseInt(caja.numero)) {
            case 2: caja.elemento.classList.remove('num2');
            break;
            case 4: caja.elemento.classList.remove('num4');
            break;
            case 8: caja.elemento.classList.remove('num8');
            break;
        }
    }

    moverCajas(direccion) {
        for(let y=0;y<this.sizeY;y++) {
            for(let x=0;x<this.sizeX;x++) {
                if(this.cajas[x][y].elemento.classList.contains('numero')) {
                    this.mover(this.cajas[x][y],direccion);     
                                  
                }
            }
        }
        // this.posFinalFalse()
        // this.generarNumero();
    }

    posFinalFalse() {
        for(let y=0;y<this.sizeY;y++) {
            for(let x=0;x<this.sizeX;x++) {        
                this.cajas[x][y].posFinal = false;                              
            }
        }
        
    }

    mover(caja,direccion) {
        //console.log(this.cajas)
        let cajaNumSiguiente;
        
        for(let x=caja.x;x<this.sizeX;x++) {
            
            if(x+1<this.sizeX && !this.cajas[x+1][caja.y].elemento.classList.contains('numero')) {
                //this.cajas[x][caja.y].elemento.classList.remove('numero');
                //this.eliminarClase(this.cajas[x][caja.y]);

                // console.log('x: '+x+' caja.y: '+caja.y);

                let cajaNum = this.cajas[x][caja.y];
                cajaNumSiguiente = this.cajas[x+1][caja.y];
                cajaNumSiguiente.numero = cajaNum.numero;
                this.despintarCaja(cajaNum);
                this.pintarCaja(cajaNumSiguiente);
                // .elemento.classList.remove('dos');
                // .elemento.classList.add('dos');
                //this.cajas[x][caja.y].elemento.classList.remove('numero');
                //this.cajas[x+1][caja.y].elemento.classList.add('numero');
                //this.cajas[x][caja.y].elemento.innerHTML = '';
                //this.cajas[x+1][caja.y].elemento.innerHTML = '2';
                // this.agregarClase(this.cajas[x][caja.y]);
            } else if(x+1<this.sizeX && this.cajas[x+1][caja.y].numero === this.cajas[x][caja.y].numero) {
                /*this.cajas[x+1][caja.y].elemento.innerHTML = '4'            
                this.cajas[x][caja.y].elemento.innerHTML = ''
                this.cajas[x][caja.y].elemento.classList.remove('numero')
                this.cajas[x][caja.y].elemento.classList.remove('dos')
                */                
                let num = parseInt(this.cajas[x+1][caja.y].numero) + parseInt(this.cajas[x][caja.y].numero);
                this.cajas[x+1][caja.y].numero = num;
                this.pintarCaja(this.cajas[x+1][caja.y]);
                this.despintarCaja(this.cajas[x][caja.y]);
                this.cajas[x+1][caja.y].classList.add('sumado');
            } 
        }
        console.log(cajaNumSiguiente)

    }
}