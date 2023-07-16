const el = document.querySelector('.toggle');
const container = document.querySelector('.container_right__div.mobile');

// TOGGLE NAVBAR

el.addEventListener('click', function() {
    el.classList.toggle('is-active');
    container.classList.toggle('is-active');
});

el.addEventListener('focusout', function() {
    el.classList.remove('is-active');
    container.classList.remove('is-active');
});

// REDIRECT TO ID

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
