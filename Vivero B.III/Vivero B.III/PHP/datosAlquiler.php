<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$sql = "SELECT * 
        FROM alquiler 
        WHERE id LIKE '".$_GET["id"]."'
        ";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];
$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
while ($fila = mysqli_fetch_array($resultados)) {
	$XML .="<venta >"
	."<id>".$fila["id"]."</id>"
	."<nif>".$fila["nif"]."</nif>"
    ."<codigo>".$fila["codigo"]."</codigo>"
    ."<fechaInicial>".$fila["fechaInicial"]."</fechaInicial>"
    ."<fechaFinal>".$fila["fechaFinal"]."</fechaFinal>"
	."</venta>";
}
$XML .='</datos>';
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

mysqli_close($conexion);
?>


