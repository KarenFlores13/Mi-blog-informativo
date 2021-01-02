const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')      
      const sound_do = document.getElementById('sound_do')
      const sound_re = document.getElementById('sound_re')
      const sound_mi = document.getElementById('sound_mi')
      const sound_fa = document.getElementById('sound_fa')
      const ULTIMO_NIVEL = 10


      class Juego {
        constructor() {
          this.inicializar = this.inicializar.bind(this)
          this.inicializar()
          this.generarSecuencia()
          setTimeout(this.siguienteNivel, 500)
          
        }
      
        inicializar() {
            this.siguienteNivel = this.siguienteNivel.bind(this)
            this.elegirColor = this.elegirColor.bind(this)
            this.toggleBtnEmpezar()
            this.nivel = 1
            this.colores = {
              celeste,
              violeta,
              naranja,
              verde
            }
            this.sounds = {
                sound_do,
                sound_re,
                sound_mi,
                sound_fa
            }
        }

        toggleBtnEmpezar() {
            if (btnEmpezar.classList.contains('hide')) {
                btnEmpezar.classList.remove('hide')
            } else {
                btnEmpezar.classList.add('hide')
            }
        }

        generarSecuencia() {
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        }

        siguienteNivel() {
            this.subnivel = 0
            this.nombreAtributo = 'valor'
            this.iluminarSecuencia() 
            this.agregarEventosClick()
        }

        transformarNumeroAColor(numero) {
            switch (numero) {
                case 0:
                    return 'celeste'
                case 1:
                    return 'violeta'
                case 2:
                    return 'naranja'
                case 3:
                    return 'verde'
                
            }
        } 

        transformarColorANumero(color) {
            switch (color) {
                case 'celeste':
                    return 0
                case 'violeta':
                    return 1
                case 'naranja':
                    return 2
                case 'verde':
                    return 3
                
            }
        } 
        SonarSonido(color) {
            switch (color) {
                case 'celeste':
                    this.sounds.sound_do.play()
                    break;
                case 'violeta':
                    this.sounds.sound_re.play()
                    break;
                case 'naranja':
                    this.sounds.sound_mi.play()
                    break;
                case 'verde':
                    this.sounds.sound_fa.play()
                    break;
                
            }
        } 

        iluminarSecuencia() {
            let time = 0
            for (let i = 0; i < this.nivel; i++) {
              const color = this.transformarNumeroAColor(this.secuencia[i])
              /* setTimeout(() => this.SonarSonido(color), 1000 * i) */
              setTimeout(() => this.iluminarColor(color), 1000 * i)
              
            }
            setTimeout(() => this.agregarEventosClick(), 700 * time)
        } 
      
        iluminarColor(color) {
            this.colores[color].classList.add('light')
            setTimeout(() => this.apagarColor(color), 350)
        }
      
        apagarColor(color) {
            this.colores[color].classList.remove('light')
        }

        agregarEventosClick() {
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)

        }

        eliminarEventoClick() {
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev) {
            const nombreColor = ev.target.dataset.color
            const numeroColor = this.transformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor)
            this.SonarSonido(nombreColor)
            if (numeroColor === this.secuencia[this.subnivel]) {
                this.subnivel++
                if (this.subnivel === this.nivel) {
                    this.nivel++
                    this.eliminarEventoClick()
                    if (this.nivel === (ULTIMO_NIVEL + 1)) {
                        this.ganoElJuego()
                    } else {
                        setTimeout(this.siguienteNivel, 1500)
                    }
                }
            } else {
                this.perdioElJuego()
            }
        }

        ganoElJuego() {
            swal('Congradulation', 'Felicitaciones, ganastes el juego!', 'success')
                .then(this.inicializar)
        }

        perdioElJuego() {
            swal('Game over', 'Perdistes el juego :(', 'error')
                .then(() => {
                    this.eliminarEventoClick()
                    this.inicializar()
                })
        }
      }
      

      function empezarJuego() {
      window.juego = new Juego()
      }