$(document).ready(function () {
    rellenaTabla();
    $("[name='btnBorrar']").click(borrar);
    $("[name='btnModificar']").click(modificar);

    $("select#selector").on(
        'change', function (e) {
            nif = $("#selector").val();
            console.log(nif);
            $.get("PHP/datosCliente.php", ("nif=" + nif), function (respuesta) {
                console.log(respuesta.querySelector("cliente"));

                $("#txtNombre").val(respuesta.querySelector("nombre").textContent);
                $("#txtApellido").val(respuesta.querySelector("apellido").textContent);
                $("#txtEmail").val(respuesta.querySelector("email").textContent);
                $("#txtClave").val(respuesta.querySelector("clave").textContent);
                $("#txtTelefono").val(respuesta.querySelector("telefono").textContent);

            });
        });
});

function borrar() {
    let datos = {
        nif: $("#selector").val(),
    }
    if (datos.nif != "") {
        $.ajax({
            method: "POST",
            async: true,
            url: "PHP/borrarCliente.php",
            data: "datos=" + JSON.stringify(datos),
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            location.reload();
        });
    }
}

function modificar() {
    let datos = {
        nif: $("#selector").val(),
        nombre: $("#txtNombre").val(),
        apellido: $("#txtApellido").val(),
        email: $("#txtEmail").val(),
        clave: $("#txtClave").val(),
        telefono: $("#txtTelefono").val()
    }
    if (datos.nif != "" && datos.email != "") {
        $.ajax({
            method: "POST",
            async: true,
            url: "PHP/modificarCliente.php",
            data: "datos=" + JSON.stringify(datos),
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            location.reload();
        });
    }
}


function loadXMLDocAsync(filename, callback, p) {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(xhttp.responseText, p);
        }
    });
    xhttp.open("GET", filename, true);
    xhttp.send();
}

function rellenaTabla() {
    loadXMLDocAsync("php/getClientes.php", rellenaClientes, "#clientes");
    loadXMLDocAsync("php/getClientes.php", rellenaSelectClientes, "#selector");

}

function rellenaClientes(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function (e) {
        $(elemento).append("<tr><td>" + e.nif + "</td><td>" + e.email + "</td><td>" + e.nombre + "</td> <td>" + e.apellido + "</td><td>" + e.clave + "</td> <td>" + e.telefono + "</td></tr>");

    });
}
function rellenaSelectClientes(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function (e) {
        $(elemento).append("<option value='" + e.nif + "'>" + e.nombre + " " + e.apellido + "</option>");
    });
}


function creaTablaCliente(headers, xml) {
    let div = document.createElement("div");
    let tabla = document.createElement("table");
    tabla.id = "cliente";
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        let celda = encabezados.insertCell(-1);
        celda.textContent = encabezado;
        encabezados.append(celda);
    });
    let cuerpo = document.createElement("tbody");
    xml.querySelectorAll("cliente").forEach(elem => {
        let fila = cuerpo.insertRow(-1);
        let celda = fila.insertCell(-1);
        celda.append(elem.querySelector("nif").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("email").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("nombre").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("apellido").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("telefono").textContent);
        celda = fila.insertCell(-1);
    });
    tabla.append(cuerpo);
    return tabla;
}