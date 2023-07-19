// TOGGLE NAVBAR

/**
 * Añade el evento click y focusout al HTMLElement enviado como primer parámetro.
 *
 * @param {HTMLElement} el - El primer parámetro debe ser un HTMLElement.
 * @param {HTMLElement} container - Este parámetro debe ser un HTMLElement padre del primer parámetro.
 */
export function addEventListenerToNavLinks(el, container) {
    el.addEventListener('click', toggleOnClick.bind(null, el, container));

    el.addEventListener('focusout', toggleOnFocusOut.bind(null, el, container));
}

/**
 * Función de control de evento para el evento click.
 *
 * @param {HTMLElement} el - Elemento HTMLElement en el que se hace clic.
 * @param {HTMLElement} container - Elemento HTMLElement padre asociado al elemento en el que se hace clic.
 */
function toggleOnClick(el, container) {
    el.classList.toggle('is-active');
    container.classList.toggle('is-active');
}


/**
 * Función de control de evento para el evento focusout.
 *
 * @param {HTMLElement} el - Elemento HTMLElement que pierde el foco.
 * @param {HTMLElement} container - Elemento HTMLElement padre asociado al elemento que pierde el foco.
 */
function toggleOnFocusOut(el, container) {
    el.classList.remove('is-active');
    container.classList.remove('is-active');
}

// REDIRECT TO ID

/**
 * Añade el evento click a cada uno de los elementos del array.
 *
 * @param {Array<HTMLElement>} el - El primer parámetro debe ser un Array que contenga HTMLElement.
 */
export function addEventListenerToLinks(el) {
    el.forEach((link) => {
        link.addEventListener("click", preventRedirect);
    });
}


/**
 * Función de control de evento para prevenir la redirección del enlace y realizar un scroll al elemento.
 *
 * @param {Event} event - Objeto de evento del evento click.
 */
function preventRedirect(event) {
    event.preventDefault();

    // No se puede usar .current porque ocurre el concepto de event bubbling
    let el = event.currentTarget;

    const href = el.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}

// KEEP LABELS ON FOCUS

/**
 * Añade el evento keyup a cada uno de los elementos del array.
 *
 * @param {Array<HTMLElement>} el - El primer parámetro debe ser un Array que contenga HTMLElement.
 */
export function addEventListenerToInputs(el) {
    el.forEach((input) => {
        input.addEventListener("keyup", removeLabelOnEmptyBlur);
    });
}

/**
 * Función de control de evento para eliminar el estado del label cuando un input pierde el foco y no contiene texto.
 *
 * @param {Event} event - Objeto de evento del evento keyup.
 */
function removeLabelOnEmptyBlur(event) {
    const el = event.target;
    const label = el.nextElementSibling;

    if(el.value.length > 0) {
        label.classList.add("is-active");
    } else {
        label.classList.remove("is-active");
    }
}
