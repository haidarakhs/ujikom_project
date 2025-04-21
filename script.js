const slidesContainer = document.querySelector('.slides');
const slides = Array.from(document.querySelectorAll('.slide'));
let index = 0;
const totalSlides = slides.length;

// Clone first and last slide for smooth infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

// Adjust container position to accommodate cloned slides
slidesContainer.style.transform = `translateX(-100%)`;

function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;
}

function showSlide(n) {
    if (n >= totalSlides) {
        index = 0;
        resetSlidePosition();
    } else if (n < 0) {
        index = totalSlides - 1;
        resetSlidePosition(true);
    } else {
        index = n;
        updateSlidePosition();
    }
}

function resetSlidePosition(toEnd = false) {
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = `translateX(-${toEnd ? totalSlides * 100 : 100}%)`;
    setTimeout(() => {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        updateSlidePosition();
    }, 10);
}

function prevSlide() {
    showSlide(index - 1);
}

function nextSlide() {
    showSlide(index + 1);
}

// Navbar toggle function
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    const navToggle = document.querySelector(".nav-toggle");
    
    navLinks.classList.toggle("active");
    navToggle.textContent = navLinks.classList.contains("active") ? "X" : "☰";
    
    animateNavLinks(navLinks);
}

function animateNavLinks(navLinks) {
    const links = navLinks.querySelectorAll("a");
    links.forEach((link, index) => {
        link.style.animation = navLinks.classList.contains("active") 
            ? `fadeIn 0.3s ease-in-out ${index * 0.1}s forwards` 
            : "none";
    });
}


// animasi
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-up, .product-header, .product-card");
  
    const appearOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -150px 0px",
    };
  
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    }, appearOptions);
  
    const observeElements = () => {
      faders.forEach(fader => {
        if (!fader.classList.contains("show")) {
          appearOnScroll.observe(fader);
        }
      });
    };
  
    const showVisibleOnLoad = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      setTimeout(() => {
        faders.forEach(fader => {
          const rect = fader.getBoundingClientRect();
          if (rect.top < viewportHeight && rect.bottom > 0) {
            fader.classList.add("show");
          }
        });
      }, 500); 
    };
  
    observeElements();
    window.addEventListener("load", showVisibleOnLoad);
  });
  