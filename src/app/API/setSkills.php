<?php

use LDAP\Result;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
require('db.php');
$con = Conexion();

$user = $_GET['user'];
$rankingName = $_GET['rankingName'];
$responsabilidad = $_GET['responsabilidad'];
$cooperacion = $_GET['cooperacion'];
$autonomia_iniciativa = $_GET['autonomia_iniciativa'];
$gestion_emocional = $_GET['gestion_emocional'];
$habilidad_pensamiento = $_GET['habilidad_pensamiento'];


$sql = mysqli_query($con, "UPDATE `$rankingName` SET `skillID` = '" . $skillID . "' WHERE `User-ID` = " . $user . ";");

if ($sql) {
  echo json_encode('Correcto!');
}
