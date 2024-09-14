const slides = document.querySelectorAll('.slider-item');
let currentIndex = 0;

const handleNext = () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    slides[currentIndex].classList.add('active');
};

const handlePrev = () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    slides[currentIndex].classList.add('active');
};