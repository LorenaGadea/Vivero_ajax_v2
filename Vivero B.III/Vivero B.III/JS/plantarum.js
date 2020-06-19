$(document).ready(function () {

    //PLANTARUM
    //Carga dinámica de formularios y sus scripts
    $("#btnCliente").click(function () {
        if ($('#divFrmAltaCliente').length == 0) {
            $("#formularios >*:not(#divFrmAltaCliente)").hide();
            $("#formularios").load("formularios/altaCliente.html", function () {
                $.getScript("JS/altaCliente.js");
            });
        } else {
            $('#divFrmAltaCliente').parent().show();
        }
    });

    $("#btnProducto").click(function () {
        if ($('#divFrmAltaProducto').length == 0) {
            $("#formularios >*:not(#divFrmAltaProducto)").hide();
            $("#formularios").load("formularios/altaProducto.html", function () {
                $.getScript("JS/altaProducto.js");
            });
        } else {
            $('#divFrmAltaProducto').parent().show();
        }
    });

    $("#btnVenta").click(function () {
        if ($('#divFrmVenta').length == 0) {
            $("#formularios >*:not(#divFrmVenta)").hide();
            $("#formularios").load("formularios/venta.html", function () {
                $.getScript("JS/venta.js");
            });
        } else {
            $('#divFrmVenta').parent().show();
        }
    });

    $("#btnAlquiler").click(function () {
        if ($('#divFrmAlquiler').length == 0) {
            $("#formularios >*:not(#divFrmAlquiler)").hide();
            $("#formularios").load("formularios/alquiler.html", function () {
                $.getScript("JS/alquiler.js");
            });
        } else {
            $('#divFrmAlquiler').parent().show();
        }
    });

    $("#btnVentasPeriodo").click(function () {
        if ($('#divFrmVentasPeriodo').length == 0) {
            $("#formularios >*:not(#divFrmVentasPeriodo)").hide();
            $("#formularios").load("formularios/ventasPeriodo.html", function () {
                $.getScript("JS/ventasPeriodo.js");
            });
        } else {
            $('#divFrmVentasPeriodo').parent().show();
        }
    });

    $("#btnProductosPrecio").click(function () {
        if ($('#divFrmProductosPrecio').length == 0) {
            $("#formularios >*:not(#divFrmProductosPrecio)").hide();
            $("#formularios").load("formularios/productosPrecio.html", function () {
                $.getScript("JS/productosPrecio.js");
            });
        } else {
            $('#divFrmProductosPrecio').parent().show();
        }
    });

    $("#btnGestionCliente").click(function () {
        window.open("gestion.php", "_blank");
    });

    $("#btnGestionAlquiler").click(function () {
        window.open("gestionAlquiler.php", "_blank");
    });

    $("#btnGestionVenta").click(function () {
        window.open("gestionVenta.php", "_blank");
    });

    /*$("#btnGestionProducto").click(function () {
        window.open("gestionProducto.php", "_blank");
    });*/

    // Listados sin formulario
    //Llamadas AJAX
    $("#btnListaClientes").click(listaClientes);
    function listaClientes() {
        nuevaVentana = window.open("", "_blank", "");
        $.get("PHP/listaClientes.php", function (respuesta) {
            nuevaVentana.document.body.append(creaTablaCliente(["NIF",
                "Correo", "Nombre", "Apellido", "Teléfono"], respuesta));
        }, "xml");

    }

    $("#btnListaProductos").click(listaProductos);
    function listaProductos() {
        nuevaVentana = window.open("", "_blank", "");
        $.get("PHP/listaMacetas.php", function (respuesta) {
            nuevaVentana.document.body.append(creaTablaMaceta(["Codigo",
                "Tipo", "Precio","Stock", "Material", "Color", "Capacidad"], respuesta));
        }, "xml");

        $.get("PHP/listaPlantas.php", function (respuesta) {
            nuevaVentana.document.body.append(creaTablaPlanta(["Codigo",
                "Tipo", "Precio", "Stock", "Nombre", "Tamaño", "Flor", "Frutal"], respuesta));
        }, "xml");
    }

    $("#btnAlquileres").click(listaAqluileres);
    function listaAqluileres() {
        let fechaActual = new Date();
        console.log(fechaActual);
        nuevaVentana = window.open("", "_blank", "");
        $.get("PHP/listaAlquileres.php", ("fechaActual=" + formatoAmericano(fechaActual)), function (respuesta) {
            nuevaVentana.document.body.append(creaTablaAlquileres(["Numero Alquiler",
                "Código Producto",
                "NIF Cliente",
                "Apellido Cliente",
                "Correo",
                "Fecha Inicio",
                "Fecha Final"], respuesta));
        }, "xml");
    }

    function formatoAmericano(fecha) {
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let año = fecha.getFullYear();
        return año + "-" + (mes < 10 ? "0" + mes : mes) + "-" + (dia < 10 ? "0" + dia : dia);
    }


    //Tablas

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

    function creaTablaMaceta(headers, xml) {

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

    function creaTablaAlquileres(headers, xml) {
        let tabla = document.createElement("table");
        let header = tabla.createTHead();
        let encabezados = header.insertRow(-1);
        headers.forEach(encabezado => {
            let celda = encabezados.insertCell(-1);
            celda.textContent = encabezado;
            encabezados.append(celda);
        });
        let cuerpo = document.createElement("tbody");
        xml.querySelectorAll("alquiler").forEach(elem => {
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
            celda.append(elem.querySelector("fechaInicial").textContent);
            celda = fila.insertCell(-1);
            celda.append(elem.querySelector("fechaFinal").textContent);
            celda = fila.insertCell(-1);
        });
        tabla.append(cuerpo);
        return tabla;
    }

    //AREA CLIENTE

    //Llamadas AJAX
    $("#btnAlquileresCliente").click(listaAlquileresCliente);
    function listaAlquileresCliente() {
        nuevaVentana = window.open("","_blank", "");
        console.log("aqui")
        $.get("PHP/listaAlquileresCliente.php", function (respuesta) {
            console.log(respuesta);
            $(nuevaVentana.document).ready(function(){
                $(nuevaVentana.document.body).append($(creaTablaAlquileres(["Numero Alquiler",
                "Código Producto",
                "NIF",
                "Apellido",
                "Correo",
                "Fecha Inicio",
                "Fecha Final"], respuesta)));
            });
        });

    }

    $("#btnComprasCliente").click(listaComprasCliente);
    function listaComprasCliente() {
        nuevaVentana = window.open("", "_blank", "");
        $.get("PHP/listaComprasCliente.php", function (respuesta) {
            nuevaVentana.document.body.append(creaTablaVenta(["Numero Venta",
                "Código Producto",
                "NIF",
                "Apellido",
                "Correo",
                "Fecha"], respuesta));
        }, "xml");

    }

    function creaTablaVenta(headers, xml) {
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

}); //END document ready