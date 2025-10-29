<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST["folio"])){
    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';
    $folio = $_POST["folio"];
    $grupo = new grupo();
    $grupo -> consulta_integrantes_por_folio_grupo($folio);
  }
}
?>
