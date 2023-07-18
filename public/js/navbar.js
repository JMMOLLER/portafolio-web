// TOGGLE NAVBAR

export function addEventListenerToNavLinks(el, container) {
    el.addEventListener('click', toggleOnClick.bind(null, el, container));

    el.addEventListener('focusout', toggleOnFocusOut.bind(null, el, container));
}

function toggleOnClick(el, container) {
    el.classList.toggle('is-active');
    container.classList.toggle('is-active');
}

function toggleOnFocusOut(el, container) {
    el.classList.remove('is-active');
    container.classList.remove('is-active');
}

// REDIRECT TO ID

export function addEventListenerToLinks(el) {
    el.forEach((link) => {
        link.addEventListener("click", preventRedirect);
    });
}

function preventRedirect(event) {
    event.preventDefault();
    let el = event.target;

    if(el.tagName !== "A") el = el.parentElement;

    const href = el.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}

// KEEP LABELS ON FOCUS

export function addEventListenerToInputs(el) {
    el.forEach((input) => {
        input.addEventListener("keyup", keepLabelOnFocus);
    });
}

function keepLabelOnFocus(event) {
    const el = event.target;
    const label = el.nextElementSibling;

    if(el.value.length > 0) {
        label.classList.add("is-active");
    } else {
        label.classList.remove("is-active");
    }
}
