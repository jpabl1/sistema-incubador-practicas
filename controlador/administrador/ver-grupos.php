<?php
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador"){
  if(!empty($_POST['busqueda'])) {
    
    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $busqueda = $_POST['busqueda'];

    $grupo = new grupo();
    $grupo -> consulta_grupos ($busqueda);

  }
}
?>