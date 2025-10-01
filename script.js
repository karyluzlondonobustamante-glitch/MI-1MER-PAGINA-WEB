document.addEventListener('DOMContentLoaded', function() {

    // ==================== MENÚ HAMBURGUESA RESPONSIVE ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

// ==================== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL ====================
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.innerText = message;
    };

    const showSuccess = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.innerText = '';
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const checkRequired = (inputs) => {
        let isFormValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} es requerido.`);
                isFormValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isFormValid;
    };
    
    const checkEmail = (input) => {
        if (input.value.trim() !== '' && !validateEmail(input.value.trim())) {
            showError(input, 'El formato del email no es válido.');
            return false;
        }
        return true;
    };

    const getFieldName = (input) => {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    };

    // validación
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío real del formulario

            let isRequiredValid = checkRequired([nombreInput, emailInput, mensajeInput]);
            let isEmailValid = checkEmail(emailInput);

            if (isRequiredValid && isEmailValid) {
            
                alert('¡Formulario enviado con éxito!');
                form.reset();
            }
        });
        

        [nombreInput, emailInput, mensajeInput].forEach(input => {
            input.addEventListener('blur', () => {
                if(input.value.trim() === '') {
                    showError(input, `${getFieldName(input)} es requerido.`);
                } else {
                    showSuccess(input);
                }
                if (input.type === 'email') {
                    checkEmail(input);
                }
            });
        });
    }
});