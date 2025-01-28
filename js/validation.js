document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("budget-form");

    // Referencias a los campos y sus mensajes de error
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const termsCheckbox = document.getElementById("terms");

    const nameError = document.getElementById("nameError");
    const surnameError = document.getElementById("surnameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");

    // Función para validar un campo y mostrar un mensaje de error si no cumple
    const validateField = (input, errorElement, regex, errorMessage) => {
        if (!regex.test(input.value)) {
            errorElement.textContent = errorMessage;
            input.classList.add("error-input");
            return false;
        } else {
            errorElement.textContent = "";
            input.classList.remove("error-input");
            return true;
        }
    };

    // Validación específica para cada campo
    const validateName = () =>
        validateField(nameInput, nameError, /^[a-zA-ZÀ-ÿ\s]{2,15}$/, "El nombre debe tener entre 2 y 15 letras.");
    const validateSurname = () =>
        validateField(surnameInput, surnameError, /^[a-zA-ZÀ-ÿ\s]{2,40}$/, "Los apellidos deben tener entre 2 y 40 letras.");
    const validatePhone = () =>
        validateField(phoneInput, phoneError, /^[0-9]{9}$/, "El teléfono debe tener exactamente 9 dígitos.");
    const validateEmail = () =>
        validateField(emailInput, emailError, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Introduce un correo válido.");

    // Validación del formulario completo al enviar
    form.addEventListener("submit", (e) => {
        const isNameValid = validateName();
        const isSurnameValid = validateSurname();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();

        // Comprobar si los términos y condiciones están aceptados
        if (!termsCheckbox.checked) {
            alert("Debes aceptar las condiciones de privacidad.");
            e.preventDefault();
            return false;
        }

        // Si alguno de los campos no es válido, prevenir el envío del formulario
        if (!isNameValid || !isSurnameValid || !isPhoneValid || !isEmailValid) {
            e.preventDefault();
            return false;
        }

        alert("Formulario enviado correctamente.");
    });

    // Validación en tiempo real
    nameInput.addEventListener("input", validateName);
    surnameInput.addEventListener("input", validateSurname);
    phoneInput.addEventListener("input", validatePhone);
    emailInput.addEventListener("input", validateEmail);
});
