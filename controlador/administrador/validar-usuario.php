<?php 
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['curp'] && !empty($_POST['revision']))) {

    require_once "../../modelo/base-de-datos.php";
    require_once "../../modelo/usuario.php";

    $Curp = $_POST["curp"];
    $Revision = $_POST["revision"];

    $usuario = new usuario();
    $usuario -> administrador_revisar_usuario($Curp, $Revision);

  } else echo "Algo ocurrío :(";
} else echo "¿Qué sucede?";
?>