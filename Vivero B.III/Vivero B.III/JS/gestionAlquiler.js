$(document).ready(function () {
    rellenaTabla();
    rellenaProductos();
    $("[name='btnBorrar']").click(borrar);
    $("[name='btnModificar']").click(modificar);

    $("select#selector").on(
        'change', function (e) {
            id = $("#selector").val();
            $.get("PHP/datosAlquiler.php", ("id=" + id), function (respuesta) {
                $("#txtFechaFinal").val(respuesta.querySelector("fechaFinal").textContent);
                $("#selNif").val(respuesta.querySelector("nif").textContent);
                $("#txtFechaInicial").val(respuesta.querySelector("fechaInicial").textContent);
                $("#selCodigo").val(respuesta.querySelector("codigo").textContent);
               
            });
        });
    
});
function rellenaProductos() {
    if (localStorage.getItem("productos") != undefined) {
        rellenaSelectProductos(localStorage.getItem("productos"));
    } else {
        $.get("php/getProductos.php", rellenaSelectProductos);
    }
}
function rellenaSelectProductos(resultado) {
    localStorage.setItem("productos", resultado);
    let datos = JSON.parse(resultado);
    datos.forEach(function (elemento) {
        $("#selCodigo").append("<option value='" + elemento.codigo + "'>" + elemento.codigo + "</option>");
    });
}

function borrar() {
    let datos = {
        id: $("#selector").val(),
    }
    if (datos.id != "") {
        $.ajax({
            method: "POST",
            async: true,
            url: "PHP/borrarAlquiler.php",
            data: "datos=" + JSON.stringify(datos),
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            location.reload();
        });
    }
}

function modificar() {
    let fechaFinalOld = new Date ($("#txtFechaFinal").val());
    let fechaInicialOld = new Date ($("#txtFechaInicial").val())
    let datos = {
        id: $("#selector").val(),
        nif: $("#selNif").val(),
        codigo: $("#selCodigo").val(),
        fechaFinal: formatoAmericano(fechaFinalOld),
        fechaInicial: formatoAmericano(fechaInicialOld)
    }
    if (datos.id != "" && datos.nif != "" && datos.fechaFinal != "" && datos.fechaInicial != "" && datos.codigo != "") {
        $.ajax({
            method: "POST",
            async: true,
            url: "PHP/modificarAlquiler.php",
            data: "datos=" + JSON.stringify(datos),
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            location.reload();
        });
    }
}

function formatoAmericano(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    return año + "-" + (mes < 10 ? "0" + mes : mes) + "-" + (dia < 10 ? "0" + dia : dia);
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
    loadXMLDocAsync("php/getClientes.php", rellenaSelectClientes, "#selNif");
    loadXMLDocAsync("php/getAlquileres.php", rellenaAlquiler, "#ventas");
    loadXMLDocAsync("php/getAlquileres.php", rellenaSelector, "#selector");
}

function rellenaAlquiler(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function (e) {
        $(elemento).append("<tr><td>" + e.id + "</td><td>" + e.codigo + "</td><td>" + e.nif + "</td> <td>" + e.fechaInicial + "</td><td>" + e.fechaFinal + "</td> </tr>");
    });
}

function rellenaSelectClientes(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function (e) {
        $(elemento).append("<option value='" + e.nif + "'>" + e.nombre + " " + e.apellido + "</option>");
    });
}

function rellenaSelector(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function (e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.id + "</option>");
    });
}


