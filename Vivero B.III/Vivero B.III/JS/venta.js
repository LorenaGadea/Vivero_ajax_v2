$(document).ready(function () {
    rellenaProductos();
    rellenaClientes();
    $("[name='btnVenta']").click(alta);
});
var error = "";

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
        $("#selectProducto").append("<option value='" + elemento.codigo + "'>" + elemento.codigo + "</option>");
    });
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

function rellenaClientes() {
    loadXMLDocAsync("php/getClientes.php", rellenaSelectClientes, "#selectCliente");
}

function rellenaSelectClientes(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function (e) {
        $(elemento).append("<option value='" + e.nif + "'>" + e.nombre + " " + e.apellido + "</option>");
    });
}

function alta() {
        $.post("php/nuevaVenta.php", $("#frmVenta").serialize(), function (respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            $("#frmVenta").hide();
        }
    }, "json");

}