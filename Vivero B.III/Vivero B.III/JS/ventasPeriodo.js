$(document).ready(function () {
    $("[name='btnVentasPeriodo']").click(listar);
});

function listar() {
    let fechaInicio = new Date($("[name='txtFechaInicio']").val());
    let fechaFinal = new Date($("[name='txtFechaFinal']").val());
    if (fechaFinal > fechaInicio) {
        $.get("PHP/ventasPeriodo.php", ("fechaInicio=" + formatoAmericano(fechaInicio)
            + "&fechaFinal=" + formatoAmericano(fechaFinal)), function (respuesta) {
                nuevaVentana = window.open("listadoVentasP.html", "_blank", "");
                nuevaVentana.document.body.append(creaTabla(["Número Venta",
                "Código Producto",
                "NIF Cliente",
                "Apellido Cliente",
                "Correo",
                "Fecha Venta"], respuesta));
            }, "xml");
    }
}

function formatoAmericano(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    return año + "-" + (mes < 10 ? "0" + mes : mes) + "-" + (dia < 10 ? "0" + dia : dia);
}

function creaTabla(headers, xml) {

    let div = document.createElement("div");
    let tabla = document.createElement("table");
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        let celda = encabezados.insertCell(-1);
        celda.textContent = encabezado;
        encabezados.append(celda);
    });
    let cuerpo = document.createElement("tbody");
    xml.querySelectorAll("venta").forEach(elem => {
        let fila = cuerpo.insertRow(-1);
        let celda = fila.insertCell(-1);
        celda.append(elem.getAttribute("id"));
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("codigo").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("nif").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("apellido").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("email").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("fecha").textContent);
        celda = fila.insertCell(-1);
    });
    tabla.append(cuerpo);
    return tabla;
}