<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");
$datos = json_decode($_POST["datos"]);
$sql = "DELETE FROM venta 
        WHERE id = '$datos->id'
        ";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

if ($resultados){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Venta borrada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de borrado: ".mysqli_error($conexion);
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta); 

mysqli_close($conexion);
?>