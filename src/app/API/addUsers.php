<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = Conexion(); // CREA LA CONEXION

$datos = file_get_contents("php://input");
$datos = json_decode($datos);

$sql = mysqli_query($conexion, "SELECT `id` FROM `usuarios` WHERE username ='" . $datos->username  . "'");
$check = mysqli_num_rows($sql);

if ($check > 0) {
    while ($resultado = $sql->fetch_assoc()) {
        $idUser = $resultado['id'];
    }
    $sql2 = mysqli_query($conexion, "SELECT * FROM `$datos->rankingName` WHERE `User-ID` =" . $idUser  . "");
    $check = mysqli_num_rows($sql2);

    $sql4 = mysqli_query($conexion, "SELECT * FROM rankings WHERE nombre = '$datos->rankingName' && creador =" . $idUser  . "");
    $check2 = mysqli_num_rows($sql4);

    if ($check > 0 || $check2 > 0) {
        echo json_encode('Usuario ya registrado!');
    } else {
        $sql3 = "INSERT INTO `$datos->rankingName`(`User-ID`, `Puntuación`) VALUES ('$idUser','0')";
        $addUser = mysqli_query($conexion, $sql3);

        if (!$addUser) {
            echo json_encode('Error.');
        } else {
            echo json_encode('Correcto!');
        }
    }
} else {
    echo json_encode('User no valido!');
}
