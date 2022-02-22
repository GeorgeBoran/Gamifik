<<<<<<< Updated upstream
<?php
class Conexion{
    //Variables
    private $servidor='localhost';
    private $database='goat_gamifik';
    private $usuario='root';
    private $password='';
    public $con;
    function con()
    {
        $this->con = mysqli_connect($this->servidor, $this->usuario, $this->password, $this->database);
    }
    //Funcion comprobar la conexion
    function comprobarConexion(){
        if (!$this->con) {
            echo "no se han validado los datos";
        }else {
            return false;
        }
    }
    //Funcion retornar la conexion
    function getConexion(){
        return $this->con;
    }
}

?>
=======
<!--
<?php
class Conexion{
    //Variables
    private $servidor='localhost';
    private $database='goat_gamifik';
    private $usuario='root';
    private $password='';
    public $con;
    function __construct()
    {
        $this->con = mysqli_connect($this->servidor, $this->usuario, $this->password, $this->database);
    }
    //Funcion comprobar la conexion
    function comprobarConexion(){
        if (!$this->con) {
            echo "no se han validado los datos";
        }else {
            return false;
        }
    }
    //Funcion retornar la conexion
    function getConexion(){
        return $this->con;
    }
}

?>

>>>>>>> Stashed changes
