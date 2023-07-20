// TOGGLE NAVBAR

/**
 * Añade el evento click y focusout al HTMLElement enviado como primer parámetro.
 *
 * @param {HTMLElement} ButtonElement - El primer parámetro debe ser un HTMLElement.
 * @param {HTMLElement} ParentElement - Este parámetro debe ser un HTMLElement padre del primer parámetro.
 */
export function addEventListenerToNavLinks(ButtonElement) {
    //Se tiene que usar bind para poder pasarle el contexto a la función que se va a ejecutar en el evento.
    ButtonElement.addEventListener('click', toggleOnClick.bind(null, ButtonElement, ButtonElement.parentElement));
    ButtonElement.addEventListener('focusout', toggleOnFocusOut.bind(null, ButtonElement, ButtonElement.parentElement));
}

/**
 * Función de control de evento para el evento click.
 *
 * @param {HTMLElement} ButtonElement - Elemento HTMLElement en el que se hace clic.
 * @param {HTMLElement} ParentElement - Elemento HTMLElement padre asociado al elemento al que se le hace clic.
 */
function toggleOnClick(ButtonElement, ParentElement) {
    ButtonElement.classList.toggle('is-active');
    ParentElement.classList.toggle('is-active');
}


/**
 * Función de control de evento para el evento focusout.
 *
 * @param {HTMLElement} ButtonElement - Elemento HTMLElement que pierde el foco.
 * @param {HTMLElement} ParentElement - Elemento HTMLElement padre asociado al elemento que pierde el foco.
 */
function toggleOnFocusOut(ButtonElement, ParentElement) {
    ButtonElement.classList.remove('is-active');
    ParentElement.classList.remove('is-active');
}

// REDIRECT TO ID

/**
 * Añade el evento click a cada uno de los elementos del array.
 *
 * @param {Array<HTMLElement>} ArrayElements - El primer parámetro debe ser un Array que contenga HTMLElement.
 */
export function addEventListenerToLinks(ArrayElements) {
    ArrayElements.forEach((link) => {
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
 * @param {Array<HTMLElement>} ArrayElements - El primer parámetro debe ser un Array que contenga HTMLElement.
 */
export function addEventListenerToInputs(ArrayElements) {
    ArrayElements.forEach((input) => {
        input.addEventListener("keyup", handleKeyUp);
        input.addEventListener("blur", resetEmptyInputs);
    });
}

/**
 * Función de control de evento para verificar si el contenido dentro del input es válido respecto al tipo de input.
 * 
 * @param {Event} event - Objeto de evento del evento keyup.
*/
function handleKeyUp(event) {
    animateLabelOnContent(event.target);
    const inputIsValid = validateInputValue(event.target);
    if(!inputIsValid) {
        const message = checkMessageErrorByInput(event.target);
        addMessageErrorOnLabel(event.target, message);
    }
}

/**
 * Función de control de evento para eliminar el estado del label cuando un input pierde el foco y no contiene texto.
 * 
 * @param {Event} event - Objeto de evento del evento keyup.
 * @returns animateLabelOnContent(event)
 */
function resetEmptyInputs(event) {
    const input = event.target;
    if(input.value.trim() === "") {
        input.value = "";
        return handleKeyUp(event);
    }
};

/**
 * Función de control de evento para eliminar el estado del label cuando un input pierde el foco y no contiene texto.
 *
 * @param {HTMLInputElement} input - HTMLInputElement que contiene el error.
 */
function animateLabelOnContent(input) {
    const label = input.labels[0];

    if(!input.validity.valueMissing) {
        label.classList.add("is-active");
    } else {
        label.classList.remove("is-active");
    }
}

/**
 * Función de control de evento para verificar si el contenido dentro del input es válido respecto al tipo de input.
 *
 * @param {HTMLInputElement} input - HTMLInputElement que contiene el error.
 */
function validateInputValue(input){
    const span = input.parentElement.lastElementChild;

    if(input.validity.valid) {
        span.classList.remove("show_error");
        return true;
    } else {
        span.classList.add("show_error");
        return false;
    }
}

/**
 * Función que se esncarga de verificar cúal va a ser el mensaje que se va a mostrar según el tipo de input y el tipo de error.
 *
 * @param {HTMLInputElement} input - HTMLInputElement que contiene el error.
 */
function checkMessageErrorByInput(input) {
    const validity = input.validity;
    const input_id = input.id;

    const input_error =  Object.keys(MESSAGES_INPUT_ERRORS[input_id]);
    
    const result = input_error.find((typeError) => validity[typeError]);

    return MESSAGES_INPUT_ERRORS[input_id][result] ?? MESSAGES_INPUT_ERRORS[input_id]["badInput"];
}

/**
 * Función que se encarga de agregar el mensaje de error al label del input.
 * 
 * @param {HTMLInputElement} input - HTMLInputElement que contiene el error.
 * @param {String} message - Mensaje de error que se va a agregar al label.
*/
function addMessageErrorOnLabel(input, message) {
    const span = input.labels[0].nextElementSibling;
    span.lastElementChild.innerText = message;
}

/**
 * Objeto que contiene mensajes de error correspondientes a diferentes tipos de input y errores de validación.
 *
 * @const {Object}
 */
const MESSAGES_INPUT_ERRORS = {
    user_name: {
        valueMissing: "Por favor, ingrese su nombre.",
        tooShort: "El nombre debe tener al menos 2 caracteres.",
        tooLong: "El nombre debe tener menos de 30 caracteres.",
        patternMismatch: "El nombre solo puede contener letras.",
        badInput: "Por favor, ingrese un valor válido."
    },
    user_email: {
        valueMissing: "Por favor, ingrese su correo electrónico.",
        typeMismatch: "Por favor, ingrese un correo electrónico válido.",
        tooLong: "No se permiten correos electrónicos muy largos para evitar estafas.",
        badInput: "Por favor, ingrese un correo electrónico válido."
    },
    subject: {
        valueMissing: "Por favor, ingrese el asunto.",
        tooShort: "El asunto debe tener al menos 2 caracteres.",
        tooLong: "El asunto debe tener menos de 50 caracteres.",
        patternMismatch: "El asunto solo puede contener letras, números, espacios y los siguientes caracteres: . , - _",
        badInput: "Por favor, ingrese un valor válido."
    },
    message_area: {
        valueMissing: "Por favor, ingrese un mensaje.",
        tooShort: "El mensaje debe tener al menos 10 caracteres.",
        tooLong: "El mensaje debe tener menos de 500 caracteres.",
        badInput: "Por favor, ingrese un valor válido."
    }
}
