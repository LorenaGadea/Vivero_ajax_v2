<?php
$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$datos = json_decode($_POST["datos"]);
$sql= "INSERT INTO tipos_producto(codigo, tipo)
       VALUES ('$datos->codigo', 'Planta')";
           
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$sql = "INSERT INTO planta (codigo, stock, precio, nombre, tamaño) 
        VALUES('$datos->codigo',
               '$datos->stock',
               '$datos->precio',
               '$datos->nombre',
               '$datos->tamaño',
               '$datos->flor'),
               '$datos->frutal')"; 
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

if ($resultados){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($respuesta); 

mysqli_close($conexion);
