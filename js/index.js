document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const nextButton = document.getElementById('btnNext');
    const prevButton = document.getElementById('btnPrev');
    const dots = Array.from(document.querySelectorAll('.dot'));
    
    let currentIndex = 0;
    const slideInterval = 5000; // Cada 5s cambia de imagen
    let autoPlay;

    // Función para actualizar la vista del carrusel
    const updateCarousel = (index) => {
        // Mover el contenedor
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar los puntos
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    };

    // Botón Siguiente
    const moveToNextSlide = () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        updateCarousel(nextIndex);
    };

    // Botón Anterior
    const moveToPrevSlide = () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        updateCarousel(prevIndex);
    };

    // Event Listeners para las flechas
    nextButton.addEventListener('click', () => {
        moveToNextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        moveToPrevSlide();
        resetAutoPlay();
    });

    // Event Listeners para los puntos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
            resetAutoPlay();
        });
    });

    // Función para el autoplay
    const startAutoPlay = () => {
        autoPlay = setInterval(moveToNextSlide, slideInterval);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlay);
        startAutoPlay();
    };

    // Iniciar autoplay al cargar
    startAutoPlay();
});