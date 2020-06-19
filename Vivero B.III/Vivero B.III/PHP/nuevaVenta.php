<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");
$sql = "INSERT INTO venta (codigo, nif, fecha)
        VALUES('".$_POST["selectProducto"]."','".$_POST["selectCliente"]."','".$_POST["txtFechaVenta"]."')";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

if ($resultados){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Venta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de venta: ".mysqli_error($conexion);
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta); 

mysqli_close($conexion);
?>