// Carrusel Automático con 6 imágenes
class Carrusel {
    constructor() {
        this.indiceActual = 0;
        this.totalSlides = 6;
        this.autoPlayInterval = null;
        this.autoPlayActivo = true;
        this.intervaloTiempo = 3000; // 3 segundos
        
        // Elementos del DOM
        this.contenedor = document.getElementById('carruselContenedor');
        this.btnAnterior = document.getElementById('btnAnterior');
        this.btnSiguiente = document.getElementById('btnSiguiente');
        this.btnPausaReanudar = document.getElementById('btnPausaReanudar');
        this.infoActual = document.getElementById('infoActual');
        this.indicadoresContainer = document.getElementById('indicadores');
        
        this.inicializar();
    }
    
    inicializar() {
        this.crearIndicadores();
        this.actualizarCarrusel();
        this.iniciarAutoPlay();
        this.eventos();
    }
    
    crearIndicadores() {
        for (let i = 0; i < this.totalSlides; i++) {
            const indicador = document.createElement('div');
            indicador.classList.add('indicador');
            indicador.dataset.index = i;
            indicador.addEventListener('click', () => this.irASlide(i));
            this.indicadoresContainer.appendChild(indicador);
        }
        this.actualizarIndicadores();
    }
    
    actualizarIndicadores() {
        const indicadores = document.querySelectorAll('.indicador');
        indicadores.forEach((indicador, index) => {
            if (index === this.indiceActual) {
                indicador.classList.add('activo');
            } else {
                indicador.classList.remove('activo');
            }
        });
    }
    
    actualizarCarrusel() {
        const desplazamiento = -this.indiceActual * 100;
        this.contenedor.style.transform = `translateX(${desplazamiento}%)`;
        this.actualizarInfo();
        this.actualizarIndicadores();
    }
    
    actualizarInfo() {
        this.infoActual.textContent = `Imagen ${this.indiceActual + 1} de ${this.totalSlides}`;
    }
    
    siguienteSlide() {
        this.indiceActual = (this.indiceActual + 1) % this.totalSlides;
        this.actualizarCarrusel();
        this.reiniciarTemporizador();
    }
    
    anteriorSlide() {
        this.indiceActual = (this.indiceActual - 1 + this.totalSlides) % this.totalSlides;
        this.actualizarCarrusel();
        this.reiniciarTemporizador();
    }
    
    irASlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.indiceActual = index;
            this.actualizarCarrusel();
            this.reiniciarTemporizador();
        }
    }
    
    iniciarAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            if (this.autoPlayActivo) {
                this.siguienteSlide();
            }
        }, this.intervaloTiempo);
    }
    
    detenerAutoPlay() {
        this.autoPlayActivo = false;
        this.btnPausaReanudar.textContent = '▶️ Reanudar';
        this.btnPausaReanudar.style.background = '#4caf50';
        this.btnPausaReanudar.style.color = 'white';
    }
    
    reanudarAutoPlay() {
        this.autoPlayActivo = true;
        this.btnPausaReanudar.textContent = '⏸️ Pausar';
        this.btnPausaReanudar.style.background = 'white';
        this.btnPausaReanudar.style.color = '#764ba2';
        this.reiniciarTemporizador();
    }
    
    pausaReanudar() {
        if (this.autoPlayActivo) {
            this.detenerAutoPlay();
        } else {
            this.reanudarAutoPlay();
        }
    }
    
    reiniciarTemporizador() {
        if (this.autoPlayActivo) {
            // Reiniciar el intervalo para que el tiempo comience desde cero
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = setInterval(() => {
                    if (this.autoPlayActivo) {
                        this.siguienteSlide();
                    }
                }, this.intervaloTiempo);
            }
        }
    }
    
    eventos() {
        this.btnSiguiente.addEventListener('click', () => this.siguienteSlide());
        this.btnAnterior.addEventListener('click', () => this.anteriorSlide());
        this.btnPausaReanudar.addEventListener('click', () => this.pausaReanudar());
        
        // Pausar al hacer hover sobre el carrusel
        const carrusel = document.querySelector('.carrusel');
        carrusel.addEventListener('mouseenter', () => {
            if (this.autoPlayActivo) {
                this.detenerAutoPlay();
                this.autoPlayActivo = false;
                this.btnPausaReanudar.textContent = '▶️ Reanudar';
            }
        });
        
        carrusel.addEventListener('mouseleave', () => {
            if (!this.autoPlayActivo && this.btnPausaReanudar.textContent === '▶️ Reanudar') {
                this.reanudarAutoPlay();
            }
        });
    }
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Carrusel();
    
    // Efecto adicional: mensaje en consola
    console.log('%c🎠 Carrusel Automático Iniciado', 'color: #ffd700; font-size: 14px; font-weight: bold');
    console.log('%c📸 6 imágenes | Desplazamiento automático cada 3 segundos', 'color: #764ba2; font-size: 12px');
});