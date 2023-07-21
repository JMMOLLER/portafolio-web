import TypeAnimation from './TypeAnimation.js';
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

addEventListenerToNavLinks(document.querySelector(".toggle.navbar__burger"));

addEventListenerToLinks(document.querySelectorAll(".id__link"));

addEventListenerToInputs(document.querySelectorAll(".form_contacto__form input, .form_contacto__form textarea"));


const sections_animated = {
    about_me: {
        animated: false,
        elements: Array.from(document.querySelectorAll("#about_me .content_left__div, #about_me .profile__img")),
    },
    training: {
        animated: false,
        elements: Array.from(document.querySelectorAll("#training .training_item__div")),
    },
    skills: {
        animated: false,
        elements: Array.from(document.querySelectorAll("#skills .skill_item_container__div")),
    },
    encriptador: {
        animated: false,
        elements: Array.from(document.querySelectorAll("#encriptador")),
    },
    "tienda-tuya": {
        animated: false,
        elements: Array.from(document.querySelectorAll("#tienda-tuya")),
    },
    solym: {
        animated: false,
        elements: Array.from(document.querySelectorAll("#solym")),
    },
    "rocket-league": {
        animated: false,
        elements: Array.from(document.querySelectorAll("#rocket-league")),
    }
}

window.addEventListener("scroll", handleScroll);

function handleScroll() {
    const el = Array.from(document.querySelectorAll("#about_me, #training, #skills, #encriptador, #tienda-tuya, #solym, #rocket-league"));

    el.forEach((element) => {
        if (checkIfInView(element)) {
            if (!sections_animated[element.id].animated) {
                sections_animated[element.id].animated = true;
                animateSection(element);
            }
        }
    });
}

function checkIfInView(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}

function animateSection(el) {
    const child = sections_animated[el.id].elements;
    child.forEach((element) => {
        element.classList.add("show_animation");
    });
}

async function getLastVersión() {
    try{
        const response = await fetch("https://raw.githubusercontent.com/JMMOLLER/portafolio-web/main/package.json");
        if(!response.ok) throw new Error("Error al obtener la versión del proyecto");
        const data = await response.json();
        return { version: data.version, lastUpdate: data.lastUpdate };
    } catch(error) {
        console.error(error);
        return null;
    }
}

function setLastVersionOnDOM(info) {
    const el = document.querySelector("#version_info");
    el.textContent = `últ. act. ${info.lastUpdate || "??/??/????" } | v${info.version || "v?.?.?"}`;
}

const info = await getLastVersión();
setLastVersionOnDOM(info);

console.log(info);
