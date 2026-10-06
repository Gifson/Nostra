// Common UI
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => mobileNav.classList.toggle("open"));
}
document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

const closeOffer = document.getElementById("closeOffer");
if (closeOffer) {
  closeOffer.addEventListener("click", () => {
    document.querySelector(".offer-bar").style.display = "none";
  });
}

// Wishlist
document.querySelectorAll(".heart").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
  });
});

// Home page hero slider
const slides = [
  {image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85", title:"Level up your style with our"},
  {image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85", title:"Discover your everyday style"},
  {image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85", title:"Fresh looks for every season"}
];
let currentSlide = 0;
const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  if (heroImage) heroImage.src = slides[currentSlide].image;
  if (heroTitle) heroTitle.textContent = slides[currentSlide].title;
}
const nextSlide = document.getElementById("nextSlide");
const prevSlide = document.getElementById("prevSlide");
if (nextSlide && prevSlide) {
  nextSlide.addEventListener("click", () => showSlide(currentSlide + 1));
  prevSlide.addEventListener("click", () => showSlide(currentSlide - 1));
  setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Collections: search + category/color filters + sorting
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const productGrid = document.getElementById("productGrid");

function filterProducts() {
  if (!productGrid) return;

  const query = (searchInput?.value || "").toLowerCase().trim();
  const selectedCategories = [...document.querySelectorAll(".category-filter:checked")].map(x => x.value);
  const selectedColors = [...document.querySelectorAll(".color-filter:checked")].map(x => x.value);
  const cards = [...productGrid.querySelectorAll(".product-card")];

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;
    const color = card.dataset.color;

    const matchesSearch = name.includes(query);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(color);

    card.classList.toggle("hidden", !(matchesSearch && matchesCategory && matchesColor));
  });

  const visible = cards.filter(card => !card.classList.contains("hidden"));
  const sort = sortSelect?.value || "default";

  visible.sort((a, b) => {
    if (sort === "low") return Number(a.dataset.price) - Number(b.dataset.price);
    if (sort === "high") return Number(b.dataset.price) - Number(a.dataset.price);
    if (sort === "name") return a.dataset.name.localeCompare(b.dataset.name);
    return 0;
  });

  visible.forEach(card => productGrid.appendChild(card));

  const resultMessage = document.getElementById("resultMessage");
  const noResults = document.getElementById("noResults");
  if (resultMessage) resultMessage.textContent = `${visible.length} product${visible.length === 1 ? "" : "s"} found`;
  if (noResults) noResults.style.display = visible.length ? "none" : "block";
}

if (searchInput) searchInput.addEventListener("input", filterProducts);
if (sortSelect) sortSelect.addEventListener("change", filterProducts);
document.querySelectorAll(".category-filter,.color-filter").forEach(input => input.addEventListener("change", filterProducts));
if (productGrid) filterProducts();

// Newsletter
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    alert("Thank you for subscribing to Nostra!");
    newsletterForm.reset();
  });
}

// Contact form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    alert(`Thank you, ${name}! Your message has been received.`);
    contactForm.reset();
  });
}

// Horizontal product carousels (desktop arrows + touch/mouse scrolling)
document.querySelectorAll(".horizontal-carousel").forEach(carousel => {
  const track = carousel.querySelector(".product-track");
  const left = carousel.querySelector(".carousel-left");
  const right = carousel.querySelector(".carousel-right");
  if (!track) return;

  const getScrollAmount = () => Math.max(track.clientWidth * 0.82, 260);

  left?.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });
  right?.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  // Shift + mouse wheel scrolls the row horizontally on desktop.
  track.addEventListener("wheel", event => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }
  }, { passive: false });
});
