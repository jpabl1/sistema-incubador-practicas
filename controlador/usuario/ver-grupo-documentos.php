<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['folio'])) {
    
    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Folio = $_POST['folio'];
    $Curp = $_SESSION['usuario_curp'];

    $grupo = new grupo();
    $grupo -> consulta_grupo_archivos_subidos ($Folio, $Curp);

  } else {
    echo json_encode("ERROR");
  }
}
?>