<?php
  session_start();
  if(isset($_SESSION["usuario_curp"]) && isset($_SESSION["usuario_tipo"]) && $_SESSION["usuario_tipo"] == "Administrador") header('location:administrador');
  if(isset($_SESSION["usuario_curp"]) && isset($_SESSION["usuario_tipo"]) && ($_SESSION["usuario_tipo"] == "Solicitante" || $_SESSION["usuario_tipo"] == "Socio")) header('location:usuario');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="src/sweetalert/sweetalert2.css">
  <link rel="stylesheet" href="css/icomoon/style.css">
  <title>REGISTRO DE CUENTA</title>
  <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
</head>

<body>

  <h2 class="titulo_pagina">BIENVENIDO AL SISTEMA PARA LA INCUBACIÓN DE PROYECTOS</h2>
  
  <a href="index.php" class="navegacion_btn" id="nav_regresar_inicio"><span class="icon-undo"></span>REGRESAR</a>
  <form>
    <?php require_once 'formularios/registro-usuario.php' ?>
  </form>

  <script type="text/javascript" src="js/app.js"></script>
  <script type="text/javascript" src="src/sweetalert/sweetalert2.js"></script>

</body>

</html>
