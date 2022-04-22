<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
include("../db.php");
$conexion = Conexion();
$username = $_GET['username'];
$sql = mysqli_query($conexion, "SELECT `username` FROM `usuarios` WHERE tipo =1");
if(!$sql) {
  echo json_encode('Error al conectar con la base de datos!');
}

?>
