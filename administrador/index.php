
<?php
  session_start();
  if(!isset($_SESSION["usuario_curp"]) && !isset($_SESSION["usuario_tipo"])) header('location:../');
  else if($_SESSION["usuario_tipo"] != "Administrador") header('location:../');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="../src/images/logo.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADMINISTRADOR</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../src/sweetalert/sweetalert2.css">
  <link rel="stylesheet" href="../css/icomoon/style.css">
  <script type="text/javascript" src="../src/pdf-lib/pdf-lib.min.js"></script>
  <script type="text/javascript" src="../src/html2canvas/html2canvas.js"></script>
  <script type="text/javascript" src="../js/jquery-3.6.1.min.js"></script>
</head>

<body>

    <nav class="navegacion_">
      <div class="navegacion_btn" id="nav_inicio">
        <span class="icon-home"></span>Inicio</div>
      <div class="navegacion_btn" id="nav_consulta">
        <span class="icon-book"></span>Consulta</div>
      <div class="navegacion_btn" id="nav_salir">
        <span class="icon-enter"></span> Salir</div>
    </nav>

    <div class="consulta" id="formulario_bienvenida">
      <h2 class="formularios_titulo_">Bienvenido, Administrador</h2>
    </div>

    <div class="consulta" id="formulario_consulta">
      <!-- Contenedor Raíz -->



      <h2 class="formularios_titulo_">Consulta como Administrador</h2>
      <div class="consulta" id="formulario_busqueda">
        
        <label class="pregunta_titulo" for=""><span class="icon-search"></span>Buscar:</label>
        <input class="pregunta_input" type="text" id="in_busqueda" placeholder="Ingrese cualquier texto relacionado a lo que quiera buscar...">

      </div>



      <div class="consulta" id="formulario_resultado_usuarios">
        
        <div id="contenedor_consulta_usuarios">

          <!-- Tabla: Visualizar los usuarios parecidos a la busqueda -->
          <h2 class="pregunta_titulo" for="">Usuarios (Solicitantes / Socios)</h2>
          <table id="consulta_administrador_usuarios">
            <tr>
              <td class="td_titulos">CURP</td>
              <td class="td_titulos">Nombre</td>
              <td class="td_titulos">Validado</td>
            </tr>
            <tr>
              <td class="td_cuerpos"></td>
              <td class="td_cuerpos"></td>
              <td class="td_cuerpos"></td>
            </tr>
          </table>
          
        </div>

        <div id="contenedor_consulta_usuario_detalles">

          <!-- Tabla: Visualizar el perfil del usuario -->
          <h2 class="pregunta_titulo">Perfil del usuario</h2>
          <table id="consulta_administrador_usuario_detalles"> </table>

          <!-- Tabla Visualizar los documentos del usuario -->
          <h2 class="pregunta_titulo">Documentos enviados</h2>
          <table id="consulta_administrador_usuario_documentos"> </table>

          <!-- Tabla Visualizar los proyectos en los que está vinculado -->
          <h2 class="pregunta_titulo">Proyectos integrados y creados</h2>
          <table id="consulta_administrador_usuario_proyectos"> </table>
          
          <input class="formularios_subir" type="button" value="EXPORTAR PDF" id="exportar_pdf_usuario">

        </div>

      </div>



      <div class="consulta" id="formulario_resultado_grupos">

        <div id="contenedor_consulta_grupos">

          <!-- Tabla: Visualizar los proyectos parecidos a la busqueda -->
          <h2 class="pregunta_titulo">Proyectos / Empresas</h2>
          <table id="consulta_administrador_grupos">
            <tr>
              <td class="td_titulos">Folio</td>
              <td class="td_titulos">Nombre</td>
              <td class="td_titulos">RFC</td>
            </tr>
            <tr>
              <td class="td_cuerpos"> </td>
              <td class="td_cuerpos"> </td>
              <td class="td_cuerpos"> </td>
            </tr>
          </table>

        </div>

        <div id="contenedor_consulta_grupo_detalles">

          <!-- Tabla: Visualizar los datos del proyecto -->
          <h2 class="pregunta_titulo">Datos del Proyecto</h2>
          <table id="consulta_administrador_grupo_detalles"> </table>
          
          <!-- Tabla: Visualizar los integrantes del proyecto -->
          <h2 class="pregunta_titulo">Integrantes</h2>
          <table id="consulta_administrador_grupo_integrantes"> </table>

          <!-- Tabla: Visualizar los documentos enviados del proyecto -->
          <h2 class="pregunta_titulo">Documentos enviados</h2>
          <table id="consulta_administrador_grupo_documentos"> </table>

          <input class="formularios_subir" type="button" value="EXPORTAR PDF" id="exportar_pdf_grupo">

        </div>
        
      </div>



    </div>

    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="../src/sweetalert/sweetalert2.js"></script>

</body>

</html>
