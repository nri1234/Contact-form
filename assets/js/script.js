function getFieldError(el) {
    const validity = el.validity;
    if (validity.valid) return true;

    /* komunikat po wciśnięciu submit w przypadku pustych pól */
    if (validity.valueMissing) return 'Wypełnij to pole';

    /* błędny format adresu email */
    if (validity.typeMismatch) {
        if (el.type === 'email') return 'Wpisz poprawny format adresu email (np. domain@wp.pl)';
    }
    /* gdy tekst jest zbyt krótki niż wymagany */
    if (validity.tooShort) return 'Wiadomość powinna zawierać minimum 5 znaków';

    /* gdy wartość jest niezgodna z ustalonym patternem */
    if (validity.patternMismatch) return 'Czy na pewno imię zsotało wpisane poprawnie? Spróbuj bez cyfr i znaków specjalnych';

    /* żadne z powyższych */
    return 'Wypełnij poprawnie pole';
};

function removeFieldError(field) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.remove();
        }
    }
};

function createFieldError(field, text) {
    removeFieldError(field);

    const div = document.createElement("div");
    div.classList.add("form-error-text");
    div.innerText = text;
    if (field.nextElementSibling === null) {
        field.parentElement.appendChild(div);
    } else {
        if (!field.nextElementSibling.classList.contains("form-error-text")) {
            field.parentElement.insertBefore(div, field.nextElementSibling);
        }
    }
};

function toggleErrorField(field, show) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.style.display = show ? "block" : "none";
        }
    }
};

function markFieldAsError(field, show) {
    if (show) {
        field.classList.add("field-error");
    } else {
        field.classList.remove("field-error");
        toggleErrorField(field, false);
    }
};
const form = document.querySelector("#form");
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const inputMessage = form.querySelector("textarea[name=message]");
const inputs = [inputName, inputEmail, inputMessage];
form.setAttribute("novalidate", true);
for (const el of inputs) {
    el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}

form.addEventListener("submit", e => {
    e.preventDefault();

    let formHasErrors = false;

    for (const el of inputs) {
        removeFieldError(el);
        el.classList.remove("field-error");

        if (!el.checkValidity()) {
            console.log('s');
            createFieldError(el, getFieldError(el));
            el.classList.add("field-error");
            formHasErrors = true;
        }
    }

    if (!formHasErrors) {
        e.target.submit();
    }
});

