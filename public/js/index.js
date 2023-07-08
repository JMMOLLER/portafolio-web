const typeAnimation = new TypeAnimation('#toType', {
    strings: ['Desarrollador Frontend', 'Desarrollador Backend', 'Desarrollador Fullstack'],
    typeSpeed: 150,
    backSpeed: 100,
    delayBtwStrings: 2000,
    loop: true
});

const inputs_id = ["user_name", "user_email", "subject", "message_area"];

const updateContainerElement = ({id, isChecked, isInvalid, runUpdateLabel}) => {
    // Agregar o quitar la clase "checked" al contenedor del input
    isChecked
        ? document.querySelector(`.container_form__${id===inputs_id[3] ? "area" : "input"}.${id}`).classList.add("checked")
        : document.querySelector(`.container_form__${id===inputs_id[3] ? "area" : "input"}.${id}`).classList.remove("checked");

    // Agregar o quitar la clase "invalid" al contenedor del input
    isInvalid
        ? document.querySelector(`.container_form__${id===inputs_id[3] ? "area" : "input"}.${id}`).classList.add("invalid")
        : document.querySelector(`.container_form__${id===inputs_id[3] ? "area" : "input"}.${id}`).classList.remove("invalid");
    
    // Actualizar el label del input
    runUpdateLabel
        ? updateLabel({id, isChecked, containText: isInvalid})
        : null;
};

const updateLabel = ({id, isChecked, containText}) => {
    // Agregar o quitar la clase "checked" al label del input
    if(isChecked){
        document.querySelector(`.label_form_input__label.${id}`).classList.add("checked");
    }else{
        document.querySelector(`.label_form_input__label.${id}`).classList.remove("checked");
        document.querySelector(`.label_form_input__label.${id}`).classList.add("unchecked");
        setTimeout(() => {
            document.querySelector(`.label_form_input__label.${id}`).classList.remove("unchecked");
        }, 105);
    }

    // Agregar o quitar la clase "contain_text" al label del input
    containText
        ? document.querySelector(`.label_form_input__label.${id}`).classList.add("contain_text")
        : document.querySelector(`.label_form_input__label.${id}`).classList.remove("contain_text");
};

const updateSpan = ({id, showError}) => {
    // Agregar o quitar la clase "show_error" al span del input
    showError
        ? document.querySelector(`.errorr_message__span.${id}`).classList.add("show_error")
        : document.querySelector(`.errorr_message__span.${id}`).classList.remove("show_error");
};

const setMessagesError = ({id, message}) => {
    // Agregar el mensaje de error al span del input
    document.querySelector(`.message_error__p.${id}`).innerHTML = message;
};

inputs_id.forEach((input_id) => {
    // Agregar evento focus a cada input
    // Cuando el input obtenga el foco, se agrega la animación al label
    document.getElementById(input_id).onfocus = (e) => {
        addAnimationLabelInput(e.target);
    };
});

function addAnimationLabelInput(input) {
    // Agregar la clase "animation_label" al label del input
    updateContainerElement({id: input.id, isChecked: true, runUpdateLabel: true});
    input.addEventListener("blur", removeAnimationLabelInput);
}

function removeAnimationLabelInput() {
    updateContainerElement({id: this.id});
    const {value, message, toReplace} = validateText(this.id, this.value);

    if(!value) {
        updateContainerElement({id: this.id, isChecked: toReplace!=="", isInvalid: toReplace==="", runUpdateLabel: true});
        updateSpan({id: this.id, showError: true});
        setMessagesError({id: this.id, message});
        this.value = toReplace;
    }else{
        updateLabel({id: this.id, isChecked: true, containText: true});
        updateSpan({id: this.id});
    }

    setTimeout(() => {
        this.removeEventListener("blur", removeAnimationLabelInput);
    }, 105);
}

function validateText(type_text, text) {
    // Eliminar espacios innecesarios al inicio y al final del nombre
    text = text.trim();
  
    // Expresión regular para verificar si el nombre contiene solo caracteres válidos
    const regex_name = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    // Expresión regular para verificar si el email contiene solo caracteres válidos
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (text.length < 1) return {value: false, message: "Debe completar este campo.", toReplace: ""};
    else if(type_text === "message_area" && text.length < 10) return {value: false, message: "El mensaje debe contener al menos 10 caracteres.", toReplace: text};
    else if(type_text === "message_area" && text.length > 300) return {value: false, message: "El mensaje no puede contener más de 300 caracteres.", toReplace: text};
    else if (text.length > 50) return {value: false, message: "No se permiten más de 50 caracteres.", toReplace: ""};

    else if(type_text === "user_email") {
        return {value: regex_email.test(text), message: "El correo proporcionado no es válido.", toReplace: ""};
    }
    else if(type_text === "user_name") {
        return {value: regex_name.test(text), message: "caracteres no válidos.", toReplace: ""};
    }

    return {value: true, message: "", toReplace: ""};
}
