<?php
$conexion = new mysqli("127.0.0.1", "root", "", "ctrlOF", 3306);
//$conexion = new mysqli("localhost", "eadtem0u_sigh", "Mu7{AeXDg*G;", "eadtem0u_sigh");
if ($conexion->connect_error) {
    print "Fallo al conectar a MySQL: (" . $conexion->connect_error . ") " . $conexion->connect_error;
}
?>