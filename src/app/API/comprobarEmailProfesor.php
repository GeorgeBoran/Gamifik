<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

include("db.php");

$conexion = Conexion();
$sql = mysqli_query($conexion, "SELECT `email` FROM `usuarios` WHERE tipo =''");
$verifyEmail = mysqli_num_rows($sql);

if(!$sql) {
  echo json_encode('Error al conectar con la base de datos!');
}

if($verifyEmail == 0 && $sql){
  echo json_encode('Profesor no registrado en la base de datos.');
}
?>
