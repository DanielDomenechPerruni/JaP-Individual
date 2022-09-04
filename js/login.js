const formulario = document.getElementById("mi-formulario");
const email1 = document.getElementById("floating-email");
const pass1 = document.getElementById("floating-contrasenia");

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function goTo() {
    let link = "index.html";
    window.location.replace(link);
}

function passwordValidation (pass1) {
    if(pass1.value.length >= 5) {
        return true;
    } else {
        return false;
    }
}

function emailValidation (email) {
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; 
    var esValido = expReg.test(email.value); 
    if(esValido) { 
        return true; 
    } else { 
        return false; 
    } 
}

function validation (pass1, email) {
    if (passwordValidation(pass1) && emailValidation(email)) {
        return true
    } else {
        return false
    }
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    if (validation(pass1, email1)) {
        localStorage.setItem('email', email1.value);
        localStorage.setItem('contrasenia', pass1.value);
        goTo();
    } else {
        showAlertError();
    };
});