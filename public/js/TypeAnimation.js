class TypeAnimation {

    constructor(element, options) {
        this.element = document.querySelector(element);
        this.strings = options.strings;
        this.typeSpeed = options.typeSpeed;
        this.backSpeed = options.backSpeed;
        this.delayBtwStrings = options.delayBtwStrings;
        this.loop = options.loop;
        this.startTyping();
    }

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

    async startTyping() {
        this.element.textContent = '';
        while (true) {
            for (let i = 0; i < this.strings.length; i++) {
                await this.type(this.strings[i]);
                await new Promise(resolve => setTimeout(resolve, this.delayBtwStrings));
                if(!this.loop && this.strings.length-1 > i )await this.untype();
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
