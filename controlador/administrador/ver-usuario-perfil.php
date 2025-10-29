<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['curp']) && $_SESSION['usuario_tipo'] == "Administrador") {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/usuario.php';

    $Curp = $_POST['curp'];

    $usuario = new usuario();
    $usuario -> consulta_perfil($Curp);

  }
}
?>