/**
 * ------------------------------------------------------------
 *  Galerie — Version fidèle au design original
 *  (AUCUNE modification visuelle)
 * ------------------------------------------------------------
 */

/* ------------------------------------------------------------
 * 1. Filtrage des images
 * ------------------------------------------------------------ */

const filterButtons = document.querySelectorAll(".gallery-tags [data-filter]");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Mise à jour du bouton actif
        document.querySelectorAll(".gallery-tags .nav-link.active")
            .forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Filtrage
        galleryItems.forEach(item => {
            const tag = item.querySelector("img").dataset.tag;

            if (filter === "all" || tag === filter) {
              item.style.removeProperty("display"); // laisse le CSS gérer
          } else {
              item.style.display = "none";
          }
          
        });
    });
});


/* ------------------------------------------------------------
 * 2. Lightbox (aucun changement visuel)
 * ------------------------------------------------------------ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const btnClose = document.getElementById("lightbox-close");
const btnPrev = document.getElementById("lightbox-prev");
const btnNext = document.getElementById("lightbox-next");

let currentIndex = 0;

// Ouvrir la lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const img = galleryItems[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
}

// Fermer la lightbox
function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

btnClose.addEventListener("click", closeLightbox);

// Fermer en cliquant sur le fond
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});

// Navigation
btnPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox();
});

btnNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox();
});

// Navigation clavier
document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") btnPrev.click();
    if (e.key === "ArrowRight") btnNext.click();
});
