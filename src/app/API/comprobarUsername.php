<?php

use LDAP\Result;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

require('db.php');
$con = Conexion();

$username = $_GET['username'];

$sql = mysqli_query($con, "SELECT `username` FROM `usuarios` WHERE username ='" . $username  . "'");

if (!$sql) {
  echo json_encode('Error al conectar con la base de datos!');
}

$verifyNickname = mysqli_num_rows($sql);

if ($verifyNickname == 0 && $sql) {
  echo json_encode('user no registrado');
} else {
  if (isset($_GET['pwd'])) {
    $pwd = $_GET['pwd'];
    $verifyPass = mysqli_query($con, "SELECT `password` FROM `alumnos`,`profesores` WHERE username ='" . $username  . "'");
    while ($fila = $verifyPass->fetch_assoc()) {
      if (password_verify($pwd, $fila['password'])) {
        echo json_encode('pwd correcto');
      } else {
        echo json_encode('pwd incorrecto');
      }
    }
  } else {
    echo json_encode('user no valido');
  }
}
