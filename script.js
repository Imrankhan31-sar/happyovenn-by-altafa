/* Edit bakery contact details, menu copy, imagery and FAQ answers here. */
const BAKERY = {
  whatsapp: "919307290527", // Digits only, including country code
  phone: "+919307290527", // International format
  instagramUrl: "https://www.instagram.com/the_happy_ovenn?stkn=MWx0ZHMzbXpyY3Fx",
  instagramHandle: "@the_happy_ovenn",
  pickupInfo: "Pickup is available near Tauheed Mall, Shrungartali.",
  deliveryInfo: "Pickup is available in Shrungartali. Home delivery is available on Saturdays within Shrungartali, Guhagar.",
};

const PRODUCTS = [
  { name: "Kesar Mawa Cake", category: "dry-cakes", label: "Dry cake", description: "A much-loved homemade cake for sharing and celebrating.", size: "Ask for available size", image: "assets/custom-cake.png", alt: "Birthday cake decorated with piped cream, chocolate, fruit and a custom topper" },
  { name: "Aata Jaggery Cake", category: "dry-cakes", label: "Dry cake", description: "A comforting homemade favourite, baked fresh to order.", size: "Ask for available size", image: "assets/aata-jaggery-cake-source.png", crop: "round-cake-crop", alt: "Round Aata Jaggery cake topped with seeds" },
  { name: "Chocolate Banana", category: "dry-cakes", label: "Dry cake", description: "A rich, tender bake for everyday cravings and little celebrations.", size: "Ask for available size", image: "assets/salted-caramel-chocolate-cake-bowl.jpg", alt: "Two chocolate bakes wrapped with ribbons and Happy Oven thank-you labels" },
  { name: "Fudgy Nutella Brownie Slab / Cake", category: "brownies", label: "Brownie", description: "A generously fudgy chocolate bake, made for sharing.", size: "Slab or cake — enquire", image: "assets/chocolate-banana-cake.png", alt: "Chocolate birthday cake with chocolate decorations" },
  { name: "Nutella Bento Brownie", category: "brownies", label: "Brownie", description: "A little box of brownie goodness for gifting or keeping.", size: "Ask for available size", image: "assets/fudgy-nutella-brownie.png", alt: "Chocolate brownie with chocolate drizzle served in a white tray" },
  { name: "Salted Caramel & Chocolate Cake Bowl", category: "other-treats", label: "Cake bowl", description: "A layered little treat for a moment of indulgence.", size: "Ask for available size", image: "assets/nutella-bento-brownie.jpeg", alt: "Chocolate cake bowl in a branded cup topped with chocolate drizzle and chips" },
  { name: "Scoopable Cookie Tin", category: "other-treats", label: "Cookie tin", description: "A scoopable treat, perfect for sharing or gifting.", size: "Ask for available size", image: "photo-1558961363-fa8fdf82db35", alt: "Freshly baked cookies ready to share" },
];

const FAQS = [
  ["How far in advance should I place an order?", "Please place your order at least one day in advance."],
  ["Do you take customised cake orders?", "We don’t make cream cakes, so we’re unable to take custom-designed cake orders."],
  ["Do you offer eggless options?", "Yes, an eggless option is available. Please mention it when placing your order."],
  ["What are the available cake sizes?", "Sizes can vary by bake. Ask us about the available size for the product you have in mind."],
  ["Do you offer delivery?", BAKERY.deliveryInfo],
  ["Where can I collect my order?", BAKERY.pickupInfo],
  ["How should I store the cakes and brownies?", "Storage can depend on the bake. We’ll share care and serving guidance when we confirm your order."],
  ["Can I customise the packaging?", "Let us know what you have in mind. We can discuss packaging options when confirming your order."],
  ["How do I place an order?", "Choose a favourite and message us on WhatsApp. We’ll confirm availability, details and pricing with you."],
];

const imageUrl = (source, width = 720) => source.startsWith("assets/") ? source : `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${width}&q=82`;
const imageAttrs = (item, width = 720) => `src="${imageUrl(item.image, width)}" ${item.fallback ? `data-fallback="${item.fallback}"` : ""}`;
const whatsappOrderLink = (productName) => `https://wa.me/${BAKERY.whatsapp}?text=${encodeURIComponent(`Hi The Happy Oven! I'd like to ask about ${productName}.`)}`;
const productCard = (item, menuItem = false) => `
  <article class="product-card reveal${menuItem ? " menu-item" : ""}" ${menuItem ? `data-category="${item.category}"` : ""}>
    <div class="product-image-wrap"><img class="${item.crop || ""}" ${imageAttrs(item, 760)} alt="${item.alt}" loading="lazy" /><span class="product-badge">${item.label}</span></div>
    <div class="product-info"><h3 class="product-name">${item.name}</h3><p class="product-description">${item.description}</p><div class="product-meta"><span>${item.size}</span></div></div>
  </article>`;

document.querySelector("#featured-products").innerHTML = PRODUCTS.map((item) => productCard(item)).join("");
document.querySelector("#menu-list").innerHTML = PRODUCTS.map((item) => productCard(item, true)).join("");

document.querySelector("#insta-grid").innerHTML = [PRODUCTS[2], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]].map((item) => `<img ${imageAttrs(item, 550)} alt="${item.alt}" loading="lazy" />`).join("");

document.querySelector("#customer-feedback").innerHTML = Array.from({ length: 14 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `<figure class="feedback-card"><img src="assets/customer-feedback-${number}.jpeg" alt="Customer feedback screenshot ${number}" loading="lazy" /></figure>`;
}).join("");

document.querySelector("#faq-list").innerHTML = FAQS.map(([question, answer], index) => `<article class="faq-item"><button class="faq-question" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}" id="faq-question-${index}">${question}<span aria-hidden="true">+</span></button><div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}" ${index === 0 ? "" : "hidden"}>${answer}</div></article>`).join("");

const nav = document.querySelector("#primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Open navigation");
}));

document.querySelectorAll(".category-tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".category-tab").forEach((other) => { other.classList.remove("active"); other.setAttribute("aria-selected", "false"); });
  tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
  document.querySelectorAll(".menu-item").forEach((item) => { item.hidden = tab.dataset.category !== "all" && item.dataset.category !== tab.dataset.category; });
}));
document.querySelector("#faq-list").addEventListener("click", (event) => {
  const button = event.target.closest(".faq-question");
  if (!button) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
});
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelector("#insta-grid").addEventListener("click", (event) => {
  const img = event.target.closest("img");
  if (!img) return;
  lightboxImage.src = img.src; lightboxImage.alt = img.alt; lightbox.showModal();
});
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });

document.querySelectorAll('[data-contact="whatsapp"]').forEach((link) => {
  link.href = whatsappOrderLink("a bake");
  link.target = "_blank"; link.rel = "noopener noreferrer";
});
document.querySelectorAll('[data-contact="phone"]').forEach((link) => { link.href = BAKERY.phone ? `tel:${BAKERY.phone}` : "#order"; });
document.querySelectorAll('[data-contact="instagram"]').forEach((link) => {
  link.href = BAKERY.instagramUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-instagram-handle]").forEach((node) => { node.textContent = BAKERY.instagramHandle; });

const orderForm = document.querySelector("#order-form");
const orderDate = orderForm.querySelector('[name="date"]');
const localToday = new Date();
localToday.setDate(localToday.getDate() + 1);
orderDate.min = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, "0")}-${String(localToday.getDate()).padStart(2, "0")}`;
const orderName = orderForm.querySelector('[name="name"]');
orderName.addEventListener("input", (event) => {
  const input = event.currentTarget;
  input.value = Array.from(input.value.replace(/[^\p{L}\s]/gu, "")).slice(0, 15).join("");
  input.setCustomValidity(input.value.trim() ? "" : "Please enter your name using letters only.");
});
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!orderForm.reportValidity()) return;
  const values = new FormData(orderForm);
  const orderMessage = [
    "Hi The Happy Oven! I’d like to place an order.",
    `Name: ${values.get("name")}`,
    `Cake: ${values.get("cake")}`,
    `Size: ${values.get("size")}`,
    `Quantity: ${values.get("quantity")}`,
    `Needed on: ${values.get("date")}`,
  ].join("\n");
  window.location.assign(`https://wa.me/${BAKERY.whatsapp}?text=${encodeURIComponent(orderMessage)}`);
});
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); instance.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal, .why-card, .steps article, .quote-card").forEach((element) => { element.classList.add("reveal"); observer.observe(element); });
}
