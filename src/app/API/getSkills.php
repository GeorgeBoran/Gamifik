<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = Conexion(); // CREA LA CONEXION



// REALIZA LA CONSULTA A LA DB

$skillID = $_GET['skillID'];
$skillName = $_GET['skillName'];

$sql = mysqli_query($conexion, "SELECT `skillID`, `skillName` FROM `softskills`");

$check = mysqli_num_rows($sql);
while ($resultado = mysqli_fetch_array($sql)) {
  $datos[] = $resultado;
  $json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS
}
if ($check > 0) {
  echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST
}
