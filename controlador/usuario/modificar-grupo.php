<?php 
session_start();
if(isset($_SESSION['usuario_curp'])) {

  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/grupo.php';

  $folio = $_POST['folio'];
  $nombre = $_POST['nombre'];
  $rfc = $_POST["et_rfc"];
  $domicilio = $_POST["et_domicilio"];
  $no_exterior = $_POST["et_no_exterior"];
  $no_interior = $_POST["et_no_interior"];
  $codigo_postal = $_POST["et_codigo_postal"];
  $colonia = $_POST["et_colonia"];
  $municipio = $_POST["et_municipio"];
  $estado = $_POST["et_estado"];
  $telefono_residencial = $_POST["et_telefono_residencial"];
  $fax = $_POST["et_fax"];
  $correo = $_POST["et_correo"];
  $web = $_POST["et_web"];
  $tipo_grupo = $_POST["et_tipo_grupo"];
  $respuesta1 = $_POST['et_respuesta1'];
  $respuesta2 = $_POST['et_respuesta2'];
  $respuesta3 = $_POST['et_respuesta3'];
  $respuesta4 = $_POST['et_respuesta4'];
  $respuesta5 = $_POST['et_respuesta5'];
  $respuesta6 = $_POST['et_respuesta6'];
  $respuesta7 = $_POST['et_respuesta7'];
  $respuesta8 = $_POST['et_respuesta8'];
  $respuesta9 = $_POST['et_respuesta9'];
  $respuesta10 = $_POST['et_respuesta10'];

  $grupo = new grupo();
  $registro_grupo = $grupo -> modificar_grupo(
    $folio,
    $nombre,
    $rfc,
    $domicilio,
    $no_exterior,
    $no_interior,
    $codigo_postal,
    $colonia,
    $municipio,
    $estado,
    $telefono_residencial,
    $fax,
    $correo,
    $web,
    $tipo_grupo,
    $respuesta1,
    $respuesta2,
    $respuesta3,
    $respuesta4,
    $respuesta5,
    $respuesta6,
    $respuesta7,
    $respuesta8,
    $respuesta9,
    $respuesta10
  );

}
?>