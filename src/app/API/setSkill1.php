<?php

use LDAP\Result;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
require('db.php');
$con = Conexion();

$user = $_GET['user'];
$rankingName = $_GET['rankingName'];
$responsabilidad = 0;

$sql = mysqli_query($con, "UPDATE `$rankingName` SET `responsabilidad` = '" . $responsabilidad+1 . "' WHERE `User-ID` = " . $user . " AND `responsabilidad` = 0;");

if ($sql) {
  echo json_encode('Correcto!');
}
