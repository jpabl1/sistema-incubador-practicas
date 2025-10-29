<?php 
session_start();
if(isset($_SESSION['usuario_curp'])) {
  
  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/usuario.php';

  $curp = $_SESSION['usuario_curp'];
  $usuario = new usuario();
  $usuario -> consulta_perfil_documentos($curp);

}
?>