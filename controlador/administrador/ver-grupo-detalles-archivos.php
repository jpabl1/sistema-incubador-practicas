<?php
session_start();
if(isset($_SESSION['usuario_curp']) && $_SESSION['usuario_tipo'] == "Administrador") {

  if(!empty($_POST['folio'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Folio = $_POST['folio'];
    $Curp = 1;

    $grupo = new grupo();
    $grupo -> consulta_grupo_archivos_subidos($Folio, $Curp);

  }
  
} else echo "Algo ocurrío :(";
?>