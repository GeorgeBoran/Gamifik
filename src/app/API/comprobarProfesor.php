<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');


require('db.php');
$con = Conexion();

$email = $_GET['email'];

$verifyNickname = mysqli_num_rows(mysqli_query($con, "SELECT `nickname` FROM `profesores` WHERE nickname ='" . $nikname  . ));
$verifyPass = mysqli_num_rows(mysqli_query($con, "SELECT `password` FROM `profesores` WHERE `password` ='" . $password  . ));

if ($verifyNickname == 0) {
    echo json_encode('Valido');
} else {
    echo json_encode('NO es valido');
}

if ($verifyPass != $password) {
  echo json_encode('La contraseña no es correcta vuelva a intentar');
} else {
  echo json_encode('La contraseña es correcta');
}

?>
