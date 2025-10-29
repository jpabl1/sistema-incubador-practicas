<?php
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador") {

  if(!empty($_POST['folio'])) {
    
    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Folio = $_POST['folio'];

    $grupo = new grupo();
    $grupo -> consulta_grupos_por_folio($Folio);
    
  }

} else echo "Algo ocurrío :(";
?>