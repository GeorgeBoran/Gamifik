<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = Conexion(); // CREA LA CONEXION

$rankingName = $_GET['rankingName'];

$rankings = mysqli_query($conexion, "DELETE FROM `rankings` WHERE `rankings`.`Nombre` = '$rankingName'");

$ranking = mysqli_query($conexion, "DROP TABLE `$rankingName` ");

if ($ranking && $rankings) {
    echo json_encode('Ranking eliminado!');
} else {
    echo json_encode('error');
}
