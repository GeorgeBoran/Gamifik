<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = Conexion(); // CREA LA CONEXION

$datos = file_get_contents("php://input");
$datos = json_decode($datos);
$datos->password = password_hash($datos->password, PASSWORD_DEFAULT);


$getID = mysqli_query($conexion, "SELECT `id` FROM `usuarios` WHERE username ='" . $datos->username  . "'");
while ($fila = $getID->fetch_assoc()) {
  $id = $fila['id'];
}

$sql = "UPDATE `usuarios` 
SET `email` = '$datos->mail', `username` = '$datos->username', `nombre` = '$datos->name', `apellidos` = '$datos->cognom', `password` = '$datos->password', `fecha_centro` = '$datos->option', `img` = '$datos->img' 
WHERE `usuarios`.`id` = $id";

$registro = mysqli_query($conexion, $sql);

if (!$registro) {
  echo json_encode('Error.');
} else {
  echo json_encode('Edit correcto');
}
