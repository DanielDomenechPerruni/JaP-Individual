// const email = localStorage.getItem("E-mail");
// const primerNombre = localStorage.getItem("Primer nombre");
// const segundoNombre = localStorage.getItem("Segundo nombre");
// const primerApellido = localStorage.getItem("Primer apellido");
// const segundoApellido = localStorage.getItem("Segundo apellido");
// const numeroDeContacto = localStorage.getItem("Numero de contacto");
const form = document.getElementById("formulario-de-datos-del-usuario");
const botonDeSubmit = document.getElementById("submit-button");
const nombreNoIntroducidoDiv = document.getElementById("mensaje-nombre-no-introducido");

function obtenerDatoDelLocalStorage(nomreDelDato) {
    return (localStorage.getItem(`${nomreDelDato}`))
}

function agregarValorAlImput(nombreDelDato) {
    document.getElementById(`${nombreDelDato}`).value = obtenerDatoDelLocalStorage(`${nombreDelDato}`);
}

function generarInputDeDatoRequerido(nombreDelDato) {
    // let html = "";
    // html = `
    //         <label for="${nombreDelDato}" class="form-label">${nombreDelDato}*</label>
    //         <input type="text" id="${nombreDelDato}" name="${nombreDelDato}" class="form-control form-control-lg" required">
    //         <div class="invalid-feedback">
    //             Este dato es obligatorio!
    //         </div>
    //         `
    // ;
    // document.getElementById(`${nombreDelDato}-div`).innerHTML = html;
    if (obtenerDatoDelLocalStorage(nombreDelDato) !== null && obtenerDatoDelLocalStorage(nombreDelDato) !== "") {
        agregarValorAlImput(nombreDelDato);
    };
}

function generarInputDeDatoNoRequerido(nombreDelDato) {
    // let html = "";
    // html = `
    //         <label for="${nombreDelDato}" class="form-label">${nombreDelDato}</label>
    //         <input type="text" id="${nombreDelDato}" name="${nombreDelDato}" class="form-control form-control-lg">
    //         `
    // ;
    // document.getElementById(`${nombreDelDato}-div`).innerHTML = html;
    if (obtenerDatoDelLocalStorage(nombreDelDato) !== null && obtenerDatoDelLocalStorage(nombreDelDato) !== "") {
        agregarValorAlImput(nombreDelDato);
    };
}

function recargarPagina() {
    window.location = "my-profile.html";
}

function submitInfo() {
    
    botonDeSubmit.addEventListener("click", hacerValidacion, false);
}

function hacerValidacion(event) {
    if (!form.checkValidity()) {
       
      event.preventDefault();
      event.stopPropagation();
    } else {
        console.log("gola")
        let valueDePrimerNombre = document.getElementById("Primer-nombre").value;
        localStorage.setItem("Primer-nombre", valueDePrimerNombre);
        let valueDeSegundoNombre = document.getElementById("Segundo-nombre").value;
        localStorage.setItem("Segundo-nombre", valueDeSegundoNombre);
        let valueDePrimerApellido = document.getElementById("Primer-apellido").value;
        localStorage.setItem("Primer-apellido", valueDePrimerApellido);
        let valueDeSegundoApellido = document.getElementById("Segundo-apellido").value;
        localStorage.setItem("Segundo-apellido", valueDeSegundoApellido);
        let valueDeEmail = document.getElementById("E-mail").value;
        localStorage.setItem("E-mail", valueDeEmail);
        let valueDeNumeroDeContacto = document.getElementById("Numero-de-contacto").value;
        localStorage.setItem("Numero-de-contacto", valueDeNumeroDeContacto);
        recargarPagina();
    }
    form.classList.add('was-validated')
}

document.addEventListener("DOMContentLoaded", event => {
    generarInputDeDatoRequerido("Primer-nombre");
    generarInputDeDatoNoRequerido("Segundo-nombre");
    generarInputDeDatoRequerido("Primer-apellido");
    generarInputDeDatoNoRequerido("Segundo-apellido");
    generarInputDeDatoRequerido("E-mail");
    generarInputDeDatoRequerido("Numero-de-contacto");
    form.addEventListener("submit", event => {
        hacerValidacion(event);
        submitInfo();
        // if (validityStateDelPrimerNombre.valueMissing) {
        //     event.preventDefault();
        //     form.nombrePrimero.setCustomValidity(false);
        //     // form.nombrePrimero.reportValidity();
        //     nombreNoIntroducidoDiv.innerHTML = `Debe introducir un nombre!!`;
        // } else {
        //     form.nombrePrimero.setCustomValidity("");
        // }
        // if (validityStateDelPrimerApellido.valueMissing) {
        //     event.preventDefault();
        //     form.apellidoPrimero.setCustomValidity('Este campo es obligatorio!!');
        //     form.apellidoPrimero.reportValidity();
        // }
        // if (validityStateDelEmail.valueMissing) {
        //     event.preventDefault();
        //     form.email.setCustomValidity('Este campo es obligatorio!!');
        //     form.email.reportValidity();
        // }
        // if (validityStateDelNumeroDeContacto.valueMissing) {
        //     event.preventDefault();
        //     form.numeroDeContacto.setCustomValidity('Este campo es obligatorio!!');
        //     form.numeroDeContacto.reportValidity();
        // }
    })
})