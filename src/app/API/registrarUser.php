<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = Conexion(); // CREA LA CONEXION

$datos = file_get_contents("php://input");
$datos = json_decode($datos);
$datos->password = password_hash($datos->password, PASSWORD_DEFAULT);

$sql = "INSERT INTO `usuarios`( `email`,`username`, `nombre`, `apellidos`, `password`,`fecha_centro`, `tipo`,`img`)
VALUES ('$datos->mail','$datos->username', '$datos->name', '$datos->cognom,', '$datos->password' , '$datos->option' , '$datos->tipo','$datos->img');";

$registro = mysqli_query($conexion, $sql);

if (!$registro) {
  echo json_encode('Error.');
} else {
  echo json_encode('Registro correcto');
}
