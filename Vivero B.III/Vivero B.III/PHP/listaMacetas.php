<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$sql="SELECT * 
      FROM tipos_producto 
      INNER JOIN maceta ON tipos_producto.codigo = maceta.codigo
      ORDER BY  maceta.precio 
    ";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
while ($fila = mysqli_fetch_array($resultados)) {
	$XML .="<maceta>"
	."<codigo>".$fila["codigo"]."</codigo>"
	."<tipo>".$fila["tipo"]."</tipo>"
  ."<precio>".$fila["precio"]."</precio>"
  ."<stock>".$fila["stock"]."</stock>"
  ."<material>".$fila["material"]."</material>"
  ."<color>".$fila["color"]."</color>"
  ."<capacidad>".$fila["capacidad"]."</capacidad>"
	."</maceta>";
}
$XML .='</datos>';
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

mysqli_close($conexion);
?>