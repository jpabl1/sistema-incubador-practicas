<?php 
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador") {

  if(!empty($_POST['folio'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Folio = $_POST['folio'];

    $grupo = new grupo();
    $grupo -> consulta_integrantes_por_folio_grupo ($Folio);

  }

} else echo json_encode("ERROR");
?>