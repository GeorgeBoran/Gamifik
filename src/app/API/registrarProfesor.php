
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');


global $datos;

require("db.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB


$con = conexion(); // CREA LA CONEXION


// REALIZA LA QUERY A LA DB
$registros = mysqli_query($con, "INSERT INTO `profesores`
                         (`email`, `img`, `nombre`, `apellidos`, `nickname`, `fecha_nacimiento`, `password`, `id`)
                         VALUES ('$_GET[email]',  '$_GET[nombre]', '$_GET[apellidos]', '$_GET[nickname]', '$_GET[fecha_nacimiento]' , '$_GET[password]' , '$_GET[id]', 'Clasico', 0, 6);");


class Result {}

// GENERA LOS DATOS DE RESPUESTA
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'EL USUARIO SE ELIMINO EXITOSAMENTE';

header('Content-Type: application/json');

echo json_encode($response); // MUESTRA EL JSON GENERADO

?>
>>>>>>> Stashed changes
