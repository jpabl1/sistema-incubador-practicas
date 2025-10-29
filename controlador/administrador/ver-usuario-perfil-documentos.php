<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['curp'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/usuario.php';

    $Curp = $_POST['curp'];

    $usuario = new usuario();
    $usuario -> consulta_perfil_documentos($Curp);

  } else echo json_encode("ERROR");
}
?>