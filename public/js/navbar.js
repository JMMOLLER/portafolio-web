const el = document.querySelector('.toggle');
const container = document.querySelector('.container_right__div.mobile');

el.addEventListener('click', function() {
    el.classList.toggle('is-active');
    container.classList.toggle('is-active');
});

