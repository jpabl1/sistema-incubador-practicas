<?php 
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador") {
  if(!empty($_POST['folio']) && !empty($_POST['revision'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Folio = $_POST['folio'];
    $Revision = $_POST['revision'];
    $Observacion = $_POST['observacion'];

    $grupo = new grupo();
    $grupo -> administrador_revisar_grupo($Folio, $Revision, $Observacion); 

  }
}
?>