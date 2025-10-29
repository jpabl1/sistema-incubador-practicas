<?php 
session_start();
if(isset($_SESSION['usuario_curp'])) {
  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/usuario.php';

  $perfil = $_SESSION['usuario_curp'];
  $usuario = new usuario();
  $usuario -> revisar_perfil($perfil);
}
?>