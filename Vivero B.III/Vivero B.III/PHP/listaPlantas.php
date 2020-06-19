<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$sql="SELECT * 
      FROM tipos_producto 
      INNER JOIN planta ON tipos_producto.codigo = planta.codigo
      ORDER BY  planta.precio 
    ";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
while ($fila = mysqli_fetch_array($resultados)) {
	$XML .="<planta>"
	."<codigo>".$fila["codigo"]."</codigo>"
	."<tipo>".$fila["tipo"]."</tipo>"
    ."<precio>".$fila["precio"]."</precio>"
    ."<stock>".$fila["stock"]."</stock>"
    ."<nombre>".$fila["nombre"]."</nombre>"
    ."<tamaño>".$fila["tamaño"]."</tamaño>"
    ."<flor>".$fila["flor"]."</flor>"
    ."<frutal>".$fila["frutal"]."</frutal>"
	."</planta>";
}
$XML .='</datos>';
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

mysqli_close($conexion);
