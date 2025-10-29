<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/grupo.php';
  $curp_grupos = $_SESSION['usuario_curp'];
  $grupo = new grupo();
  $grupo -> consulta_grupos_integrados_por_curp($curp_grupos);
}
?>