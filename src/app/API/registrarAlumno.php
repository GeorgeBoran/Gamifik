
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');


global $datos;

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB


$con = __construct(); // CREA LA CONEXION


// REALIZA LA QUERY A LA DB
$registros = mysqli_query($conexion, "INSERT INTO `alumnos`
                         (`email`, `nombre`, `apellidos`, `nickname`, `fecha_nacimiento`, `password`, `id`)
                         VALUES ('$_GET[mail]',  '$_GET[name]', '$_GET[cognom]', '$_GET[username]', '$_GET[fecha]' , '$_GET[password]');");


class Result {}

// GENERA LOS DATOS DE RESPUESTA
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'EL USUARIO SE REGISTRO EXITOSAMENTE';


header('Content-Type: application/json');

echo json_encode($registros); // MUESTRA EL JSON GENERADO


?>

