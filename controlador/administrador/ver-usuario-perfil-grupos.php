<?php
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador") {
  if(!empty($_POST['curp'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Curp = $_POST['curp'];

    $grupo = new grupo();
    $grupo -> consulta_integrantes_por_curp_usuarios($Curp);

  }
}else echo json_encode("ERROR");
?>