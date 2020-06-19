<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$sql="SELECT *
      FROM cliente
      ORDER BY nombre
    ";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
while ($fila = mysqli_fetch_array($resultados)) {
	$XML .="<cliente>"
	."<nif>".$fila["nif"]."</nif>"
	."<email>".$fila["email"]."</email>"
	."<nombre>".$fila["nombre"]."</nombre>"
    ."<apellido>".$fila["apellido"]."</apellido>"
    ."<telefono>".$fila["telefono"]."</telefono>"
	."</cliente>";
}
$XML .='</datos>';
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

mysqli_close($conexion);
?>