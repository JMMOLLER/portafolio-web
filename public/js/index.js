import TypeAnimation from './typeAnimation.js';
import {
    addEventListenerToLinks,
    addEventListenerToNavLinks,
    addEventListenerToInputs
} from './utils.js';

new TypeAnimation('#toType', {
    strings: ['Ingeniero de Software', 'Desarrollador Frontend', 'Desarrollador Backend', 'Desarrollador Fullstack'],
    typeSpeed: 150,
    backSpeed: 100,
    delayBtwStrings: 2000,
    loop: true
});

addEventListenerToNavLinks(document.querySelector(".toggle.navbar__burger"), document.querySelector(".container_right__div.mobile"));

addEventListenerToLinks(document.querySelectorAll(".id__link"));

addEventListenerToInputs(document.querySelectorAll(".form_contacto__form input, .form_contacto__form textarea"));
