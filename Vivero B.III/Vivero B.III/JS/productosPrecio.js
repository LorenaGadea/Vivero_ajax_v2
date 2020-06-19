$(document).ready(function () {
    $("[name='btnProductosPrecio']").click(listar);
});

function listar() {
    let precioMin = $("[name='txtPrecioMin']").val();
    let precioMax = $("[name='txtPrecioMax']").val();
    nuevaVentana = window.open("", "_blank", "");
    if (precioMax > precioMin) {
        $.get("PHP/macetasPrecio.php", ("precioMin=" + precioMin
            + "&precioMax=" + precioMax), function (respuesta) {
                nuevaVentana.document.body.append(creaTabla(["Codigo",
                "Tipo","Precio",
                "Stock", "Material", "Color", "Capacidad"], respuesta));
            }, "xml");

            $.get("PHP/plantasPrecio.php", ("precioMin=" + precioMin
            + "&precioMax=" + precioMax), function (respuesta) {
                nuevaVentana.document.body.append(creaTablaPlanta(["Codigo",
                "Tipo", "Precio",
                "Stock", "Nombre", "Tamaño", "Flor", "Frutal"], respuesta));
            }, "xml");    
    } else{
        alert("El precio mayor debe ser superior al menor.");
    }
}


function creaTablaPlanta(headers, xml) {

    let div = document.createElement("div");
    let tabla = document.createElement("table");
    tabla.id = "planta";
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        let celda = encabezados.insertCell(-1);
        celda.textContent = encabezado;
        encabezados.append(celda);
    });
    let cuerpo = document.createElement("tbody");
    xml.querySelectorAll("planta").forEach(elem => {
        let fila = cuerpo.insertRow(-1);
        let celda = fila.insertCell(-1);
        celda.append(elem.querySelector("codigo").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("tipo").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("precio").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("stock").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("nombre").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("tamaño").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("flor").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("frutal").textContent);
        celda = fila.insertCell(-1);

    });
    tabla.append(cuerpo);
    return tabla;
}

function creaTabla(headers, xml) {

    let div = document.createElement("div");
    let tabla = document.createElement("table");
    tabla.id = "maceta";
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        let celda = encabezados.insertCell(-1);
        celda.textContent = encabezado;
        encabezados.append(celda);
    });
    let cuerpo = document.createElement("tbody");
    xml.querySelectorAll("maceta").forEach(elem => {
        let fila = cuerpo.insertRow(-1);
        let celda = fila.insertCell(-1);
        celda.append(elem.querySelector("codigo").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("tipo").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("precio").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("stock").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("material").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("color").textContent);
        celda = fila.insertCell(-1);
        celda.append(elem.querySelector("capacidad").textContent);
        celda = fila.insertCell(-1);

    });
    tabla.append(cuerpo);
    return tabla;
}