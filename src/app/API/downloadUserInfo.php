<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = Conexion(); // CREA LA CONEXION

$idUser = $_GET['idUser'];



// REALIZA LA CONSULTA A LA DB
$user = mysqli_query($conexion, "SELECT `username`,`img` FROM `usuarios` WHERE  id ='" . $idUser  . "'");


while ($resultado = mysqli_fetch_array($user)) {
  $datos[] = $resultado;
  $json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS
}
echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST
