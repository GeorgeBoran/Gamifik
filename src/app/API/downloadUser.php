<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

$conexion = Conexion(); // CREA LA CONEXION

$username = $_GET['username'];
$pwd = $_GET['pwd'];


// REALIZA LA CONSULTA A LA DB
$user = mysqli_query($conexion, "SELECT * FROM `usuarios` WHERE  username ='" . $username  . "'");
$verifyPass = mysqli_query($conexion, "SELECT `password` FROM `usuarios` WHERE username ='" . $username  . "'");

while ($fila = $verifyPass->fetch_assoc()) {
  if (password_verify($pwd, $fila['password'])) {
    while ($resultado = mysqli_fetch_array($user)) {
      $datos[] = $resultado;
      $json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS
    }
    echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST
  }
}
