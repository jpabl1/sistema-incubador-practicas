<?php
session_start();
if(isset($_SESSION['usuario_curp']) && !empty($_POST['folio'])) {
  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/grupo.php';

  # El folio del grupo a unirse
  $folio = $_POST['folio'];
  # El curp del usuario que desea unirse
  $curp_usuario = $_SESSION['usuario_curp'];

  $grupo = new grupo();
  $grupo -> unirse_grupo($folio, $curp_usuario);
} else {
  echo "Debe de ingresar un folio.";
}
?>
