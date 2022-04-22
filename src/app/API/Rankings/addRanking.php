<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

include("../db.php");

$conexion = Conexion();
$datos = file_get_contents("php://input");
$datos = json_decode($datos);
$sql = "INSERT INTO `rankings`(`idRanking`,`nombreRanking`, `admin`, `fechaRanking`)
VALUES ('$datos->idRanking','$datos->nombreRanking', '$datos->email', '$datos->fechaRanking');";
$registro = mysqli_query($conexion, $sql);

if (!$registro) {
  echo json_encode('Error.');
} else {
  echo json_encode('Registro correcto');
}
?>
