const hamburger = document.querySelector(".hamburger");
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelectorAll(".nav-menu a");

    // Otwieranie / Zamykanie po kliknięciu w hamburger
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navContainer.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    // Zamykanie menu po kliknięciu w dowolny link (żeby przejść do sekcji)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navContainer.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });
