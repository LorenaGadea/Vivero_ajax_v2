<?php

$conexion = mysqli_connect("localhost", "root", "", "vivero") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

$sql="SELECT alquiler.id as id,
             alquiler.codigo as codigo,
             alquiler.nif as nif,
             cliente.apellido as apellido,
             cliente.email as email,
             alquiler.fechaInicial as fechaInicial,
             alquiler.fechaFinal as fechaFinal
      FROM alquiler
      INNER JOIN cliente ON alquiler.nif = cliente.nif
      WHERE fechaFinal > STR_TO_DATE('".$_GET["fechaActual"]."', '%Y-%m-%d')
      ORDER BY id
    ";

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$datos = [];

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';
while ($fila = mysqli_fetch_array($resultados)) {
	$XML .="<alquiler id='".$fila["id"]."'>"
	."<codigo>".$fila["codigo"]."</codigo>"
	."<nif>".$fila["nif"]."</nif>"
	."<apellido>".$fila["apellido"]."</apellido>"
    ."<email>".$fila["email"]."</email>"
    ."<fechaInicial>".$fila["fechaInicial"]."</fechaInicial>"
    ."<fechaFinal>".$fila["fechaFinal"]."</fechaFinal>"
	."</alquiler>";
}
$XML .='</datos>';
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

mysqli_close($conexion);
?>