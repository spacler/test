const links = document.querySelectorAll(".menu li");
const indicator = document.querySelector(".nav-indicator");

links.forEach((link, index) => {

link.addEventListener("mouseenter", () => {

indicator.style.left = `${index * 90 + 10}px`;

});

});