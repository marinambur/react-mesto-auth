import {FormValidator} from "../FormValidator.js";
import {formObject, forms} from '../../pages/index.js';
export const eraser = () => {
    const errors = Array.from(document.querySelectorAll(".form__error"));
    const inputs = Array.from(document.querySelectorAll(".text-form"));
    errors.forEach((span) => {
        span.classList.remove(formObject.errorClass);
        // удалим текст с ошибкой
        span.textContent = "";
    });
    inputs.forEach((input) => {
        input.classList.remove(formObject.inputErrorClass); // удалим ошибку
    });

}

export function startValidation() {
    forms.forEach((form) => {
        const valid = new FormValidator({
            inputSelector: ".text-form",
            submitButtonSelector: ".form__save",
            inactiveButtonClass: "form__save_inactive",
            inputErrorClass: "text-form_error",
            errorClass: "text-form-error_active",
            nameClass: ".text-form_name",
            linkClass: ".text-form_subject"
        }, form);
        valid.enableValidation();
    });
}