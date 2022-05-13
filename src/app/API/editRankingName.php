<?php

use LDAP\Result;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
require('db.php');
$con = Conexion();

$oldName = $_GET['oldName'];
$newName = $_GET['newName'];


$sql3 = mysqli_query($con, "SELECT * FROM `rankings` WHERE `rankings`.`Nombre` = '" . $newName . "';");
$check = mysqli_num_rows($sql3);

if ($check <= 0) {
  $sql = mysqli_query($con, "RENAME TABLE `" . $oldName . "` TO `" . $newName . "` ;");
  $sql2 = mysqli_query($con, "UPDATE `rankings` SET `Nombre` = '" . $newName . "' WHERE `rankings`.`Nombre` = '" . $oldName . "';");
  if ($sql) {
    echo json_encode('Correcto!');
  } else {
    echo json_encode('Error! OLD:' . $oldName . ' NEW:' . $newName . ' Check:' . $check);
  }
} else {
  echo json_encode('No Valido!');
}
