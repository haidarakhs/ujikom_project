const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
let index = 0;
let totalSlides = slides.length;

// Clone first and last slide for smooth infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

let newTotalSlides = document.querySelectorAll('.slide').length;
slidesContainer.style.transform = `translateX(-100%)`;

function showSlide(n) {
    if (n >= totalSlides) {
        index = 0;
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-100%)`;
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;
        }, 10);
    } else if (n < 0) {
        index = totalSlides - 1;
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${(totalSlides) * 100}%)`;
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;
        }, 10);
    } else {
        index = n;
        slidesContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;
    }
}

function prevSlide() {
    showSlide(index - 1);
}

function nextSlide() {
    showSlide(index + 1);
}