<?php

use LDAP\Result;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
require('db.php');
$con = Conexion();

$user = $_GET['user'];
$rankingName = $_GET['rankingName'];

$sql = mysqli_query($con, "SELECT * FROM `rankings` WHERE `nombre`='" . $rankingName . "' AND `creador`=" . $user . ";");

$verifyAdmin = mysqli_num_rows($sql);

if ($verifyAdmin > 0) {
  echo json_encode('Admin');
} else {
  echo json_encode('No Admin');
}
