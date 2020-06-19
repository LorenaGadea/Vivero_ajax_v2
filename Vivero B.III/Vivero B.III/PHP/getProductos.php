<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$sql = "SELECT codigo 
        FROM tipos_producto
        ";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];
while ($fila = mysqli_fetch_assoc($resultados)) {
    $datos[] = $fila;
}

echo json_encode($datos); 

mysqli_close($conexion);
?>