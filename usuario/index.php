<?php
  session_start();
  if(!isset($_SESSION["usuario_curp"]) && !isset($_SESSION["usuario_tipo"])) {
      header('location:../');
  } else if(($_SESSION["usuario_tipo"] != "Solicitante") && ($_SESSION["usuario_tipo"] != "Socio")) {
      header('location:../');
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="../src/images/logo.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../src/sweetalert/sweetalert2.css">
  <link rel="stylesheet" href="../css/icomoon/style.css">
  <script type="text/javascript" src="../js/jquery-3.6.1.min.js"></script>
  <title>USUARIO</title>
</head>

<body>

  <nav class="navegacion_">
    <div class="navegacion_btn" id="nav_inicio">
      <span class="icon-home"></span>INICIO
    </div>
    <div class="navegacion_btn" id="nav_grupo">
      <span class="icon-book"></span>PROYECTO / EMPRESA
    </div>
    <div class="navegacion_btn" id="nav_perfil">
      <span class="icon-user-tie"></span>MI PERFIL
    </div>
    <div class="navegacion_btn" id="nav_salir">
      <span class="icon-enter"></span>SALIR
    </div>
  </nav>



  <div class="consulta" id="formulario_bienvenida">

    <?php
    if($_SESSION['usuario_validado'] == "NO") {
      echo "<p style='color: white;'>ATENCIÓN: ESTE USUARIO AÚN NO HA SIDO VÁLIDADO. SI QUIERE QUE EL PROYECTO SEA ACEPTADO DEBE DE TENER LA CUENTA VALIDADA. PARA MÁS INFORMACIÓN VEA 'MI PERFIL'</p>";
    } else if($_SESSION['usuario_validado'] == "REVISION") {
      echo "<p style='color: white'>ESTA CUENTA ESTÁ EN REVISIÓN</p>";
    }
    ?>

    <h2 class="formularios_titulo_">BIENVENIDO, USUARIO. <div id="curp_usuario"><?php echo $_SESSION['usuario_curp'] ?></h2>

  </div>



  <div class="consulta" id="formulario_consulta_usuario_grupo">

    <?php
      if($_SESSION['usuario_validado'] == "NO") {
        echo "<p style='color: white;'>ATENCIÓN: ESTE USUARIO AÚN NO HA SIDO VÁLIDADO. SI QUIERE QUE EL PROYECTO SEA ACEPTADO DEBE DE TENER LA CUENTA VALIDADA. PARA MÁS INFORMACIÓN VEA 'MI PERFIL'</p>";
      } else if($_SESSION['usuario_validado'] == "REVISION") {
        echo "<p style='color: white'>ESTA CUENTA ESTÁ EN REVISIÓN</p>";
      }
    ?>
    
    <h2 class="formularios_titulo_">Proyectos / empresas creados.</h2>
    <table id="consulta_usuario_grupos"> </table>

    <h2 class="formularios_titulo_">Proyectos / empresas que te haz unido.</h2>
    <table id="consulta_usuario_grupos_integrados"> </table>

    <input type="button" class="formularios_subir" name="" id="nav_grupo_registro_grupo" value="CREAR UN NUEVO PROYECTO">
    <input type="button" class="formularios_subir" name="" id="nav_grupo_integracion_grupo" value="UNIRME A UN NUEVO PROYECTO">

    <div id="formulario_consulta_usuario_grupo_detalles">

      <h2 class="formularios_titulo_">Más detalles sobre el grupo.</h2>
      <table id="consulta_usuario_grupo_detalle"> </table>

      <h2 class="formularios_titulo_">Integrantes del proyecto / empresa</h2>
      <table id="consulta_usuario_grupo_detalle_intengrantes"> </table>

      <h2 class="formularios_titulo_">Documentación de Respaldo.</h2>
      <table id="consulta_usuario_grupo_detalle_documentacion_posible">
        <tr>
          <td class="td_titulos">Documentos</td>
        </tr>
        <tr><td class="td_cuerpos">Cotizaciones</td></tr>
        <tr><td class="td_cuerpos">Planos</td></tr> 
        <tr><td class="td_cuerpos">Programa de Trabajo</td></tr>
        <tr><td class="td_cuerpos">Plan de Negocio</td></tr>
        <tr><td class="td_cuerpos">Plan de Mercadotecnia</td></tr>
        <tr><td class="td_cuerpos">Proyecto de Extenso</td></tr>
        <tr><td class="td_cuerpos">Estudios de Factibilidad Técnico</td></tr>
        <tr><td class="td_cuerpos">Estudios de Factibilidad Económico</td></tr>
      </table>

      <h3 class="formularios_titulo_">Documentos subidos.</h3>
      <table id="consulta_usuario_grupo_detalle_documentacion_subida"> </table>

      <div class="formularios_" title="">
        <?php require_once '../formularios/subir-archivos-grupo.php' ?>
      </div>

      <label for="" class="pregunta_titulo">AL PULSAR EL BOTÓN, EL ADMINISTRADOR REVISARÁ EL GRUPO. (VERFIQUE QUE TODOS LOS DOCUMENTOS QUE QUIERA TENER COMO RESPALDO SEAN SUBIDOS, CUANDO ESTÉ EN REVISIÓN NO PODRÁ SUBIR MÁS DOCUMENTOS.).</label>
      <input type="button" style="margin-top: 20px" class="formularios_subir_sin_sombra" value="REVISAR" id="btn_revision_grupo">

    </div>



    <div id="formulario_unirse_grupo">
      <div class="formularios_">
        <h2 class="formularios_titulo_">Folio del Proyecto / Empresa:</h2>
        <input class="pregunta_input" type="text" name="" id="et_integracion_folio" value="" placeholder="Ingrese el folio al que desea integrarse...">
        <input class="formularios_subir_sin_sombra" type="button" name="" id="registro_integracion" value="SOLICITAR UNIRME">
      </div>
    </div>

  </div>



  <form id="formulario_registro_grupo">

    <?php require_once '../formularios/registro-datos-grupo.php' ?>
    <?php require_once '../formularios/registro-descripcion-grupo.php' ?>

  </form>

  <form id="formulario_modificacion_grupo">

    <?php require_once '../formularios/modificar-datos-grupo.php' ?>
    <?php require_once '../formularios/modificar-descripcion-grupo.php' ?>

  </form>

  <form id="formulario_modificacion_perfil">

      <?php require_once '../formularios/modificar-perfil.php' ?>

  </form>


  <div class="consulta" id="formulario_perfil_usuario">

    <?php
      if($_SESSION['usuario_validado'] == "NO") {
        echo "<p style='color: white;'>ATENCIÓN: ESTE USUARIO AÚN NO HA SIDO VÁLIDADO. SI QUIERE QUE EL PROYECTO SEA ACEPTADO DEBE DE TENER LA CUENTA VALIDADA.<br><br>
              PARA ELLO DEBE DE SUBIR LOS DOCUMENTOS INDICADOS EN LA TABLA DE ABAJO. Y ESPERAR A QUE EL ADMINISTRADOR LO VALIDE.</p>";
      } else if($_SESSION['usuario_validado'] == "REVISION") {
        echo "<p style='color: white'>ESTA CUENTA ESTÁ EN REVISIÓN</p>";
      }
    ?>

    <h2 class="formularios_titulo_">MI PERFIL</h2>
    <table id="consulta_usuario_perfil">

    </table>
    
    <div id="documentos">

      <h2 for="" class="pregunta_titulo">DOCUMENTOS REQUERIDOS</h2>
      <table id="usuario_archivos_requeridos">
        <tr><td class="td_titulos">Documentos</td></tr>
        <tr><td class="td_cuerpos">RFC (Inscripción de RFC)</td></tr>
        <tr><td class="td_cuerpos">CURP</td></tr>
        <tr><td class="td_cuerpos">Credencial INE (por ambos lados)</td></tr>
        <tr><td class="td_cuerpos">Acta de Nacimiento</td></tr>
        <tr><td class="td_cuerpos">Comprobante de domicilio con código postal (no mayor a tres meses)</td></tr>
        <tr><td class="td_cuerpos">2 fotografía tamaño infantil a color</td></tr>
        <tr><td class="td_cuerpos">Currículo Vitae (máxima 1 cuartilla) resaltando la experiencia y conocimientos específicos que serán la aportación al proyecto / empresa</td></tr>
        <tr><td class="td_cuerpos">Recibo de Pago del Servicio de Incubación</td></tr>
      </table>
      
      <h2 class="pregunta_titulo">DOCUMENTOS SUBIDOS</h2>
      <table id="usuario_archivos_enviados"> </table>


      <div class="formularios_" title="">
        <?php require_once '../formularios/subir-archivos-perfil.php' ?>
      </div>
    </div>
    
    <label for="" class="pregunta_titulo">AL PULSAR EL BOTÓN, EL ADMINISTRADOR REVISARÁ EL PERFIL. (VERFIQUE QUE TODOS LOS DOCUMENTOS REQUERIDOS SEAN SUBIDOS, CUANDO ESTÉ EN REVISIÓN NO PODRÁ SUBIR MÁS ARCHIVOS.).</label>
    <input type="button" style="margin-top: 20px" class="formularios_subir_sin_sombra" value="REVISAR" id="btn_revision_perfil">

  </div>

  <script type="text/javascript" src="js/app2.js"></script>
  <script type="text/javascript" src="../src/sweetalert/sweetalert2.js"></script>

</body>

</html>
