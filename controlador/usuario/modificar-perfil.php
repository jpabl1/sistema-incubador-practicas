<?php
session_start();
if(!empty($_POST["etm_genero"]) && !empty($_POST["etm_discapacidad"]) && !empty($_POST["etm_dependientes_economicos"]) && !empty($_POST["etm_jornada_laboral"])){

  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/usuario.php';

  $nombre = $_POST["etm_nombres"];
  $apellido_paterno = $_POST["etm_apellido_paterno"];
  $apellido_materno = $_POST["etm_apellido_materno"];
  $fecha_nacimiento = $_POST["etm_fecha_nacimiento"];
  $estado_civil = $_POST["etm_estado_civil"];
  $genero = $_POST["etm_genero"];
  $discapacidad = $_POST["etm_discapacidad"];
  $rfc = $_POST["etm_rfchomoclave"];
  $domicilio = $_POST["etm_domicilio"];
  $no_exterior = $_POST["etm_no_exterior"];
  $no_interior = $_POST["etm_no_interior"];
  $codigo_postal = $_POST["etm_codigo_postal"];
  $colonia = $_POST["etm_colonia"];
  $municipio = $_POST["etm_municipio"];
  $estado = $_POST["etm_estado"];
  $telefono_residencial = $_POST["etm_telefono_residencial"];
  $telefono_celular = $_POST["etm_telefono_celular"];
  $ingreso_mensual_personal = $_POST["etm_ingresos_mensuales_personales"];
  $ingreso_mensual_familiar = $_POST["etm_ingresos_mensuales_familiares"];
  $dependientes_economicos = $_POST["etm_dependientes_economicos"];
  $jornada_laboral = $_POST["etm_jornada_laboral"];
  $correo1 = $_POST["etm_correo_1"];
  $correo2 = $_POST["etm_correo_2"];
  $grado_maximo_estudio = $_POST["etm_grado_maximo_estudio"];
  $especialidad = $_POST["etm_especialidad"];
  $institucion_egreso = $_POST["etm_institucion_egreso"];
  $fecha_egreso = $_POST["etm_fecha_egreso"];

  $usuario = new usuario();
  $usuario -> modificar_usuario(
      $nombre,
      $apellido_paterno,
      $apellido_materno,
      $fecha_nacimiento,
      $estado_civil,
      $genero,
      $discapacidad,
      $rfc,
      $domicilio,
      $no_exterior,
      $no_interior,
      $codigo_postal,
      $colonia,
      $municipio,
      $estado,
      $telefono_residencial,
      $telefono_celular,
      $ingreso_mensual_personal,
      $ingreso_mensual_familiar,
      $dependientes_economicos,
      $jornada_laboral,
      $correo1,
      $correo2,
      $grado_maximo_estudio,
      $especialidad,
      $institucion_egreso,
      $fecha_egreso
  );
} else {
  echo "Faltan datos por ingresar.";
}
?>