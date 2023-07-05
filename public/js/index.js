const inputs_id = ["user_name", "user_email", "subject", "message_area"];

inputs_id.forEach((input_id) => {
    document.getElementById(input_id).onclick = (e) => {
        addAnimationLabelInput(e.target);
    };
});

function addAnimationLabelInput(input) {
    // console.info("ejecucion de addAnimationLabelInput");
    document.querySelector(`.label_form_input__label.${input.id}`).classList.add("checked");
    document.querySelector(`.label_form_input__label.${input.id}`).classList.remove("add");
    document.querySelector(`.container_form__${input.id===inputs_id[3] ? "area" : "input"}.${input.id}`).classList.add("checked");
    input.addEventListener("blur", removeAnimationLabelInput);
}
function removeAnimationLabelInput() {
    // console.info("ejecucion de removeAnimationLabelInput");
    const input = this;
    // console.info(input);
    document.querySelector(`.container_form__${input.id===inputs_id[3] ? "area" : "input"}.${input.id}`).classList.remove("checked");
    if(!validateText(input.id, input.value)) {
        document.querySelector(`.label_form_input__label.${input.id}`).classList.remove("checked");
        document.querySelector(`.label_form_input__label.${input.id}`).classList.add("unchecked");
        input.value = "";
    }else{
        document.querySelector(`.label_form_input__label.${input.id}`).classList.add("add");
    }
    setTimeout(() => {
        document.querySelector(`.label_form_input__label.${input.id}`).classList.remove("unchecked");
        input.removeEventListener("blur", removeAnimationLabelInput);
        // console.info("se removio el evento blur");
    }, 105);
}
function validateText(type_text, text) {
    // Eliminar espacios innecesarios al inicio y al final del nombre
    text = text.trim();
  
    // Expresión regular para verificar si el nombre contiene solo caracteres válidos
    const regex_name = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    // Expresión regular para verificar si el email contiene solo caracteres válidos
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(type_text === "user_email") return regex_email.test(text);
    else if(type_text === "user_name") return regex_name.test(text);
    else return text.length > 0;
  }
