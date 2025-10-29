<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['folio']) && !empty($_POST['curp']) && !empty($_POST['integracion'])) {
    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';
    $folio = $_POST['folio']; 
    $curp = $_POST['curp'];
    $integracion = $_POST['integracion']; 
    $grupo = new grupo();
    $grupo -> seleccion_integracion_grupo($folio, $curp, $integracion);
  }
}
?>