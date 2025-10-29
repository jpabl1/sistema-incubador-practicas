<?php
  session_start();
  if(!isset($_SESSION["usuario_curp"]) && !isset($_SESSION["usuario_tipo"])) {
      header('location:../');
  } else if($_SESSION["usuario_tipo"] != "Administrador") {
      header('location:../');
  }
?>