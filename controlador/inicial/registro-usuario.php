<?php

if(!empty($_POST["et_genero"]) && !empty($_POST["et_discapacidad_si_no"]) && !empty($_POST["et_dependientes_economicos_tipos"]) && !empty($_POST["et_jornada_laboral"])){

  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/usuario.php';

  $tipo_usuario = $_POST["et_tipo_cuenta"];
  $nombre = $_POST["et_nombre"];
  $apellido_paterno = $_POST["et_apellido_paterno"];
  $apellido_materno = $_POST["et_apellido_materno"];
  $fecha_nacimiento = $_POST["et_fecha_nacimiento"];
  $estado_civil = $_POST["et_estado_civil"];
  $genero = $_POST["et_genero"];
  $si_no_discapacidad = $_POST["et_discapacidad_si_no"];
  $discapacidad = $_POST["et_discapacidad"];

  if($si_no_discapacidad == "Si") {
      $discapacidad = $si_no_discapacidad . ", " . $discapacidad;
  } else {
      $discapacidad = $si_no_discapacidad;
  }

  $rfc = $_POST["et_rfc_homo_clave"];
  $curp = $_POST["et_curp"];
  $domicilio = $_POST["et_domicilio"];
  $no_exterior = $_POST["et_no_exterior"];
  $no_interior = $_POST["et_no_interior"];
  $codigo_postal = $_POST["et_codigo_postal"];
  $colonia = $_POST["et_colonia"];
  $municipio = $_POST["et_municipio"];
  $estado = $_POST["et_estado"];
  $telefono_residencial = $_POST["et_telefono_residencial"];
  $telefono_celular = $_POST["et_telefono_celular"];
  $ingreso_mensual_personal = $_POST["et_ingreso_mensual_personal"];
  $ingreso_mensual_familiar = $_POST["et_ingreso_mensual_familiar"];
  $tipos_dependientes_economicos = $_POST["et_dependientes_economicos_tipos"];
  $dependientes_economicos = $_POST["et_dependientes_economicos"];

  $dependientes_economicos = $tipos_dependientes_economicos . ", " . $dependientes_economicos;

  $jornada_laboral = $_POST["et_jornada_laboral"];
  $correo1 = $_POST["et_correo1"];
  $correo2 = $_POST["et_correo2"];
  $grado_maximo_estudio = $_POST["et_grado_maximo_estudio"];
  $especialidad = $_POST["et_especialidad"];
  $institucion_egreso = $_POST["et_institucion_egreso"];
  $fecha_egreso = $_POST["et_fecha_egreso"];
  $contra = $_POST["et_contra"];

  $usuario = new usuario();
  $usuario -> registrar_usuario(
      $nombre,
      $apellido_paterno,
      $apellido_materno,
      $fecha_nacimiento,
      $estado_civil,
      $genero,
      $discapacidad,
      $rfc,
      $curp,
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
      $fecha_egreso,
      $tipo_usuario,
      $contra
  );
} else {
  echo "Faltan datos por ingresar.";
}
