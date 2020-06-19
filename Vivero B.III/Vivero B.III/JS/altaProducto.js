$(document).ready(function () {
    $("[name='btnAltaProducto']").click(alta);
});
var error = "";

function alta() {
    let tipo = frmAltaProducto.selectTipo.value;
    let frutal = 0;
    let flor = 0;
    if ($("#chkFlor").is(':checked')) {
        flor = 1;
    }
    if ($("#chkFrutal").is(':checked')) {
        frutal = 1;
    }
    if (tipo == "Planta") {
        let datos = {
            codigo: $("[name='txtCodigo']").val(),
            precio: $("[name='txtPrecio']").val(),
            nombre: $("[name='txtNombre']").val(),
            frutal: frutal,
            flor: flor,
            tamaño: $("[name='selectTamaño']").val(),
            stock: $("[name='txtStock']").val()
        }
        validarCodigo(datos["codigo"]);
        validarNombre(datos["nombre"]);
        validarTamaño(datos["tamaño"]);
        if (error != "") {
            mensaje(error);
            error = "";
            return false;
        } else {
            console.log(datos);
                $.ajax({
                method: "POST",
                async: true,
                url: "PHP/altaPlanta.php",
                data: "datos=" + JSON.stringify(datos),
                dataType: "json"
            }).done((json) => {
                alert(json.mensaje);
                if (json.error == 0) {
                    $("#divFrmAltaProducto").hide();
                }
            });
        }
    } // fin planta
    else
        if (tipo == "Maceta") {
            let datos = {
                codigo: $("[name='txtCodigo']").val(),
                precio: $("[name='txtPrecio']").val(),
                color: $("[name='txtColor']").val(),
                capacidad: $("[name='txtCapacidad']").val(),
                material: $("[name='txtMaterial']").val(),
                stock: $("[name='txtStock']").val()
            }
            validarCodigo(datos["codigo"]);
            validarColor(datos["color"]);
            validarMaterial(datos["material"]);

            if (error != "") {
                mensaje(error);
                error = "";
                return false;
            } else {
                $.ajax({
                    method: "POST",
                    async: true,
                    url: "PHP/altaMaceta.php",
                    data: "datos=" + JSON.stringify(datos),
                    dataType: "json"
                }).done((json) => {
                    alert(json.mensaje);
                    if (json.error == 0) {
                        $("#divFrmAltaProducto").hide();
                    }
                });
            }
        }
        else {
            mensaje("Debe seleccionar un tipo de producto.");
        }


} // END alta

/// REGEX

function validarNombre(nombre) {
    expReg = /^([a-zá-ú]{3,}\s?)+$/i;
    if (!expReg.test(nombre.trim()) || nombre.trim().length > 30 || nombre.trim().length < 5) {
        error += "El formato de nombre es de entre 5 y 30 carácteres y espacios. \n";
        return false;
    } else {
        return true;
    }
}

function validarColor(nombre) {
    expReg = /^([a-zá-ú]{3,}\s?)+$/i;
    if (!expReg.test(nombre.trim()) || nombre.trim().length > 30 || nombre.trim().length < 5) {
        error += "El formato de color es de entre 5 y 30 carácteres y espacios. \n";
        return false;
    } else {
        return true;
    }
}

function validarMaterial(nombre) {
    expReg = /^([a-zá-ú]{3,}\s?)+$/i;
    if (!expReg.test(nombre.trim()) || nombre.trim().length > 30 || nombre.trim().length < 5) {
        error += "El formato de material es de entre 5 y 30 carácteres y espacios. \n";
        return false;
    } else {
        return true;
    }
}

function validarCodigo(codigo) {
    expReg = /^[a-zA-Z0-9]{1,5}$/
    if (!expReg.test(codigo.trim())) {
        error += "El código debe contener de 0 a 5 caracteres y números. \n";
        return false;
    } else {
        return true;
    }
}

function validarTamaño(tamaño) {
    if (tamaño != "Pequeño" && tamaño != "Grande" && tamaño != "Mediano") {
        error += "Debe escoger un tamaño. \n";
        return false;
    } else {
        return true;
    }
}

/*Mostrar cosas */
function mensaje(texto) {
    alert(texto);
}
