$(document).ready(function() {
    $("[name='btnAltaCliente']").click(alta);
});
var error ="";

function alta() {
    let datos = {
        nombre: $("[name='txtNombre']").val(),
        nif: $("[name='txtNIF']").val(),
        email: $("[name='txtEmail']").val(),
        apellido: $("[name='txtApellido']").val(),
        password: $("[name='txtPassword']").val(),
        telefono: $("[name='txtTelefono']").val()
    }
        validarNif(datos["nif"]);
        validarEmail(datos["email"]);
        validarTelefono(datos["telefono"]);
        validarNombres(datos["nombre"]);
        validarNombres(datos["apellido"]);

    if (error != "") {
        mensaje(error);
        error= "";
        return false;
    } else {
        $.ajax({
            method: "POST",
            async: true,
            url: "PHP/altaCliente.php",
            data: "datos=" + JSON.stringify(datos),
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            if (json.error == 0) {
                $("#divFrmAltaCliente").hide();
            }
        });

    }

}

function validarEmail(email) {
    //Email 
    let expReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!expReg.test(email.trim())) {
        error += "Por favor, introduzca una dirección de correo válida. \n";
        return false;
    } else {
        return true;
    }
}

function validarNif(nif) {
    //NIF 
    let expReg = /^(\d{8})([A-Z])$/;
    if (!expReg.test(nif.trim())) {
        error += "El formato del NIF es 8 dígitos y 1 letra mayúscula \n";
        return false;
    } else {
        return true;
    }
}

function validarNombres(nombre) {
    expReg = /^([a-zá-ú]{3,}\s?)+$/i;
    if (!expReg.test(nombre.trim()) || nombre.trim().length > 30 || nombre.trim().length < 5) {
        error += "El formato de nombre y apellido es de entre 5 y 30 carácteres y espacios. \n";
        return false;
    } else {
        return true;
    }
}

function validarTelefono(telefono) {
    expReg = /\d{9}/;
    if (!expReg.test(telefono.trim())) {
        error += "El formato del teléfono es de 9 dígitos. \n";
        return false;
    } else {
        return true;
    }
}

/*Mostrar cosas */
function mensaje(texto) {
    alert(texto);
}
