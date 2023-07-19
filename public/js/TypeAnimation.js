/**
 * Clase que realiza una animación de escritura de texto en un elemento del DOM.
 *
 * @class
 * @export
 * @default
 */
export default class TypeAnimation {

    /**
   * Crea una instancia de la clase TypeAnimation.
   *
   * @constructor
   * @param {string} element - Selector del elemento del DOM en el que se realizará la animación.
   * @param {Object} options - Opciones de configuración para la animación.
   * @param {string[]} options.strings - Arreglo de cadenas de texto a escribir en la animación.
   * @param {number} options.typeSpeed - Velocidad de escritura en milisegundos por caracter.
   * @param {number} options.backSpeed - Velocidad de borrado en milisegundos por caracter.
   * @param {number} options.delayBtwStrings - Tiempo de espera en milisegundos entre cadenas de texto.
   * @param {boolean} options.loop - Indica si la animación debe repetirse en un bucle continuo.
   */
    constructor(element, options) {
        this.element = document.querySelector(element);
        this.strings = options.strings;
        this.typeSpeed = options.typeSpeed;
        this.backSpeed = options.backSpeed;
        this.delayBtwStrings = options.delayBtwStrings;
        this.loop = options.loop;
        this.startTyping();
    }


    /**
   * Escribe el texto letra por letra en el elemento del DOM.
   *
   * @async
   * @param {string} text - Texto a escribir.
   * @returns {Promise} Promesa que se resuelve cuando se ha completado la escritura.
   */
    async type(text) {

        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    this.element.textContent += text[i];
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, this.typeSpeed);
        });
    }

    /**
   * Borra el texto gradualmente desde el final hasta el inicio en el elemento del DOM.
   *
   * @async
   * @returns {Promise} Promesa que se resuelve cuando se ha completado el borrado.
   */
    async untype() {

        return new Promise(resolve => {
            const text = this.element.textContent;
            let i = text.length - 1;
            const interval = setInterval(() => {
                if (i >= 0) {
                    this.element.textContent = text.substring(0, i);
                    i--;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, this.backSpeed);
        });
    }

    /**
   * Inicia la animación de escritura.
   *
   * @async
   */
    async startTyping() {
        this.element.textContent = '';
        while (true) {
            for (let i = 0; i < this.strings.length; i++) {
                await this.type(this.strings[i]);
                await new Promise(resolve => setTimeout(resolve, this.delayBtwStrings));
                if((!this.loop && this.strings.length-1 > i) || this.loop )await this.untype();
            }

            if (!this.loop) {
                break;
            }
        }
    }

}

/*
*   Existe un módulo que ya te hace todo esto
*   de hecho me inspiré en lo que hace typed.js
*   pero por algún motivo no me funcionaba bien
*   así que lo hice yo mismo ajustándolo a mis 
*   necesidades.
*/
