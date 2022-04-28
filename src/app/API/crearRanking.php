<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
$conexion = Conexion(); // CREA LA CONEXION

$datos = file_get_contents("php://input");
$datos = json_decode($datos);


$sql1 = "CREATE TABLE `goat`.`$datos->rankingName` ( `ID` INT NOT NULL AUTO_INCREMENT , `User-ID` INT NOT NULL , 
`Puntuación` INT NOT NULL , `Fecha de Inicio` DATE NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;";

$sql2 = "INSERT INTO `rankings`(`Nombre`,`Creador`) 
VALUES ('$datos->rankingName','$datos->idUser')";

$addRanking = mysqli_query($conexion, $sql1);
$registerRanking = mysqli_query($conexion, $sql2);

if (!$addRanking) {
    echo json_encode('Error.');
} else {
    echo json_encode('Creacion correcta');
}
