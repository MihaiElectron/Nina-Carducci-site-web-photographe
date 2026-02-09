/**
 * ------------------------------------------------------------
 *  Carousel — Version vanilla JS
 *  Compatible avec TON HTML Bootstrap, sans Bootstrap JS
 *  (aucune modification visuelle)
 * ------------------------------------------------------------
 */

const carousel = document.querySelector("#carouselExampleIndicators");
if (carousel) {
    const items = carousel.querySelectorAll(".carousel-item");
    const indicators = carousel.querySelectorAll(".carousel-indicators button");
    const btnPrev = carousel.querySelector(".carousel-control-prev");
    const btnNext = carousel.querySelector(".carousel-control-next");

    let index = 0;
    let interval = null;
    const DELAY = 4000; // durée entre deux slides (ms)

    // Active une slide
    function showSlide(i) {
        items.forEach(item => item.classList.remove("active"));
        indicators.forEach(ind => ind.classList.remove("active"));

        items[i].classList.add("active");
        indicators[i].classList.add("active");

        index = i;
    }

    // Auto-slide
    function startAutoSlide() {
        stopAutoSlide();
        interval = setInterval(() => {
            index = (index + 1) % items.length;
            showSlide(index);
        }, DELAY);
    }

    function stopAutoSlide() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Bouton suivant
    if (btnNext) {
        btnNext.addEventListener("click", () => {
            stopAutoSlide();
            index = (index + 1) % items.length;
            showSlide(index);
            startAutoSlide();
        });
    }

    // Bouton précédent
    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            stopAutoSlide();
            index = (index - 1 + items.length) % items.length;
            showSlide(index);
            startAutoSlide();
        });
    }

    // Indicateurs
    indicators.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            stopAutoSlide();
            showSlide(i);
            startAutoSlide();
        });
    });

    // Init
    showSlide(0);
    startAutoSlide();
}
