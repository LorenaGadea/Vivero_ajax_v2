<?php
$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$datos = json_decode($_POST["datos"]);
$sql= "INSERT INTO tipos_producto(codigo, tipo)
       VALUES ('$datos->codigo', 'Maceta')";
           
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$sql = "INSERT INTO maceta (codigo, stock, precio, material, color, capacidad) 
        VALUES('$datos->codigo',
               '$datos->stock',
               '$datos->precio',
               '$datos->material',
               '$datos->color',
               '$datos->capacidad')";
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
?>