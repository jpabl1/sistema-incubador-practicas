<?php
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador") {
  if(!empty($_POST['busqueda'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/usuario.php';

    $busqueda = $_POST['busqueda'];
    
    $usuario = new usuario();
    $usuario -> consulta_usuarios($busqueda);

  }
}
?>
