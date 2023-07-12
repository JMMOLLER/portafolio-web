const typeAnimation = new TypeAnimation('#toType', {
    strings: ['Desarrollador Frontend', 'Desarrollador Backend', 'Desarrollador Fullstack'],
    typeSpeed: 150,
    backSpeed: 100,
    delayBtwStrings: 2000,
    loop: true
});

document.querySelectorAll(".id__link").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    });
});
