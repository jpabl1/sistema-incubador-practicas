<?php

class usuario extends base_de_datos {

  public function registrar_usuario(
    $Nombres,
    $Apellido_paterno,
    $Apellido_materno,
    $Fecha_nacimiento,
    $Estado_civil,
    $Genero,
    $Discapacidad,
    $Rfchomoclave,
    $Curp,
    $Domicilio,
    $No_exterior,
    $No_interior,
    $Codigo_postal,
    $Colonia,
    $Municipio,
    $Estado,
    $Telefono_residencial,
    $Telefono_celular,
    $Ingresos_mensuales_personales,
    $Ingresos_mensuales_familiares,
    $Dependientes_economicos,
    $Jornada_laboral,
    $Correo1,
    $Correo2,
    $Grado_maximo_estudio,
    $Especialidad,
    $Institucion_egreso,
    $Fecha_egreso,
    $Tipo_usuario,
    $Contra
  ) {

    if($Nombres != "" && $Apellido_paterno != "" && $Apellido_materno != "" && $Fecha_nacimiento != "" && $Estado_civil != "" && $Genero != "" && $Discapacidad != "" && $Rfchomoclave != "" && $Curp != "" && $Domicilio != "" && $Codigo_postal != "" && $Colonia != "" && $Municipio != "" && $Estado != "" && $Telefono_celular != "" && $Correo1 != "" && $Grado_maximo_estudio != "" && $Grado_maximo_estudio != "" && $Especialidad != "" && $Institucion_egreso != "" && $Tipo_usuario != "") {
      
      $Nombres = strtoupper($Nombres);
      $Apellido_paterno = strtoupper($Apellido_paterno);
      $Apellido_materno = strtoupper($Apellido_materno);
      $Rfchomoclave = strtoupper($Rfchomoclave);
      $Curp = strtoupper($Curp);
      $Validado = "NO";

      $con = new base_de_datos();
      $conexion = $con -> conexionDB();

      try {

        $consulta_condicion = "SELECT curp FROM usuario WHERE curp = :curp";
        $resultado_condicion = $conexion -> prepare($consulta_condicion);
        $resultado_condicion -> bindParam(':curp', $Curp);
        $resultado_condicion -> execute();
        
        if($resultado_condicion) {
          if($resultado_condicion -> rowCount() == 0) {
            $query = "INSERT INTO usuario VALUES (
              :nombre,
              :apellido_paterno,
              :apellido_materno,
              :fecha_nacimiento,
              :estado_civil,
              :genero,
              :discapacidad,
              :rfc_homo_clave,
              :curp,
              :domicilio,
              :no_exterior,
              :no_interior,
              :codigo_postal,
              :colonia,
              :municipio,
              :estado,
              :telefono_residencial,
              :telefono_celular,
              :ingreso_mes_personal,
              :ingreso_mes_familiar,
              :dependientes_economicos,
              :jornada_laboral,
              :correo1,
              :correo2,
              :grado_max_estudio,
              :especialidad,
              :instituto_egreso,
              :fecha_egreso,
              :tipo_usuario,
              :contra,
              :validado
            )";

            $resultado = $conexion -> prepare($query);

            $resultado -> bindParam(':nombre', $Nombres);
            $resultado -> bindParam(':apellido_paterno', $Apellido_paterno);
            $resultado -> bindParam(':apellido_materno', $Apellido_materno);
            $resultado -> bindParam(':fecha_nacimiento', $Fecha_nacimiento);
            $resultado -> bindParam(':estado_civil', $Estado_civil);
            $resultado -> bindParam(':genero', $Genero);
            $resultado -> bindParam(':discapacidad', $Discapacidad);
            $resultado -> bindParam(':rfc_homo_clave', $Rfchomoclave);
            $resultado -> bindParam(':curp', $Curp);
            $resultado -> bindParam(':domicilio', $Domicilio);
            $resultado -> bindParam(':no_exterior', $No_exterior);
            $resultado -> bindParam(':no_interior', $No_interior);
            $resultado -> bindParam(':codigo_postal', $Codigo_postal);
            $resultado -> bindParam(':colonia', $Colonia);
            $resultado -> bindParam(':municipio', $Municipio);
            $resultado -> bindParam(':estado', $Estado);
            $resultado -> bindParam(':telefono_residencial', $Telefono_residencial);
            $resultado -> bindParam(':telefono_celular', $Telefono_celular);
            $resultado -> bindParam(':ingreso_mes_personal', $Ingresos_mensuales_personales);
            $resultado -> bindParam(':ingreso_mes_familiar', $Ingresos_mensuales_familiares);
            $resultado -> bindParam(':dependientes_economicos', $Dependientes_economicos);
            $resultado -> bindParam(':jornada_laboral', $Jornada_laboral);
            $resultado -> bindParam(':correo1', $Correo1);
            $resultado -> bindParam(':correo2', $Correo2);
            $resultado -> bindParam(':grado_max_estudio', $Grado_maximo_estudio);
            $resultado -> bindParam(':especialidad', $Especialidad);
            $resultado -> bindParam(':instituto_egreso', $Institucion_egreso);
            $resultado -> bindParam(':fecha_egreso', $Fecha_egreso);
            $resultado -> bindParam(':tipo_usuario', $Tipo_usuario);
            $resultado -> bindParam(':contra', $Contra);
            $resultado -> bindParam(':validado', $Validado);

            $resultado -> execute();

            if($resultado) echo "El cuenta se creó con exito.";
          } else echo "La CURP ingresada ya está vinculada a una cuenta. Por favor verifique si la CURP es correcta o verifique con un administrador.";
        }
        } catch (PDOException $e) {
          die("Hubo un error." . $e);
        }
    } else {
        echo "Se deben registrar los campos obligatorios.";
    }
  }

  public function validar_usuario ($Curp, $Contra) {

    if(!empty($Curp)&&!empty($Contra)) {

      $con = new base_de_datos();
      $conexion = $con -> conexionDB();

        try {
          $query = "SELECT curp, tipo_usuario, validado FROM usuario WHERE curp=:curp AND contra=:contra";
          $resultado = $conexion -> prepare($query);
          $resultado -> bindParam(':curp', $Curp);
          $resultado -> bindParam(':contra', $Contra);
          $resultado -> execute();
          $num_filas = $resultado -> rowCount();
          if($num_filas > 0) {
            $info = $resultado -> fetch(PDO::FETCH_ASSOC);
            session_start();
            $_SESSION['usuario_curp'] = $info["curp"];
            $_SESSION['usuario_tipo'] = $info["tipo_usuario"];
            $_SESSION['usuario_validado'] = $info["validado"];
            echo json_encode($info);
          } else {
            echo json_encode("Nada");
          }
        } catch (PDOException $e) {
          die("El error fue causado por: " . $e);
        }

    } else {
      echo json_encode("Nada");
    }

  }

  public function consulta_usuarios ($busqueda) {
    if(!empty($busqueda)) {
      try {
        $con = new base_de_datos();
        $conexion = $con -> conexionDB();

        $busqueda = "%" . $busqueda . "%";
  
        $query = "SELECT curp, nombres, apellido_paterno, apellido_materno, validado FROM usuario WHERE (curp LIKE :busqueda OR nombres LIKE :busqueda OR apellido_paterno LIKE :busqueda OR apellido_materno LIKE :busqueda) AND tipo_usuario != 'ADMINISTRADOR'";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':busqueda', $busqueda);
        $resultado -> execute();
  
        if($resultado) {
          if($resultado -> rowCount() > 0) {
            $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else {
            echo json_encode("NADA");
          }
        }
        
      } catch (PDOException $e) {
        die("Hubo un error: " . $e);
      }
    }
  }

  public function consulta_perfil ($perfil_de) {
    if(!empty($perfil_de)) {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      
      try {
        $query = "SELECT nombres, apellido_paterno, apellido_materno, fecha_nacimiento, estado_civil, genero, discapacidad, rfchomoclave, curp, domicilio, no_exterior, no_interior, codigo_postal, colonia, municipio, estado, telefono_residencial, telefono_celular, ingresos_mensuales_personales, ingresos_mensuales_familiares, dependientes_economicos, jornada_laboral, correo_1, correo_2, grado_maximo_estudio, especialidad, institucion_egreso, fecha_egreso, validado FROM usuario WHERE curp =:perfil_de";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(":perfil_de", $perfil_de);
        $resultado -> execute();
        if($resultado) {
          if($resultado -> rowCount() > 0) {
            $info = $resultado -> fetch(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else {
            echo json_encode("NADA");
          }
        }
      } catch (PDOException $e) {
        die("Hubo un error. Pongase en contacto con el desarrollador . " . $e);
      }
    }
  }

  public function subir_documento_perfil($Curp, $Documento_nombre, $Asunto) {
    if(!empty($Curp) && !empty($Documento_nombre)) {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      try {

        $Fecha_envio = date("Y-m-d");

        # Consulta para la condición: Si el archivo ya se subío con el mismo asunto y curp,
        # entonces solo se actualizará la fecha de envío.
        # Si nó se registrará el nuevo documento. CAMJ000829HTSSNNA2
        $consulta_condicion = "SELECT curp, asunto FROM documentos_usuario WHERE curp = :curp AND asunto = :asunto";
        $resultado_condicion = $conexion -> prepare($consulta_condicion);
        $resultado_condicion -> bindParam(':curp', $Curp);
        $resultado_condicion -> bindParam(':asunto', $Asunto);
        $resultado_condicion -> execute();

        if($resultado_condicion) {
          if($resultado_condicion -> rowCount() > 0) {

            $Revision = "RE-SUBIDO";
            $Observacion = "Re-subido recientemente.";

            $query = "UPDATE documentos_usuario SET revision = :revision, observacion = :observacion, fecha_envio = :fecha_envio WHERE curp = :curp AND asunto = :asunto";
            $resultado = $conexion -> prepare($query);
            $resultado -> bindParam(':curp', $Curp);
            $resultado -> bindParam(':fecha_envio', $Fecha_envio);
            $resultado -> bindParam(':revision', $Revision);
            $resultado -> bindParam(':observacion', $Observacion);
            $resultado -> bindParam(':asunto', $Asunto);

            $resultado -> execute();
            if($resultado) {
              echo "El documento se actualizó con exito.";
            }

          } else {
            
            $Revision = "SUBIDO";
            $Observacion = "Subido recientemente.";

            $query = "INSERT INTO documentos_usuario VALUES (:curp, :documento, :fecha_envio, :asunto, :revision, :observacion)";
            $resultado = $conexion -> prepare($query);
            $resultado -> bindParam(':curp', $Curp);
            $resultado -> bindParam(':documento', $Documento_nombre);
            $resultado -> bindParam(':fecha_envio', $Fecha_envio);
            $resultado -> bindParam(':asunto', $Asunto);
            $resultado -> bindParam(':revision', $Revision);
            $resultado -> bindParam(':observacion', $Observacion);

            $resultado -> execute();
            if($resultado) {
              echo "El documento se envío con exito.";
            }

          }
        }

      }catch(PDOException $e) {
        die("Hubo un error. Pongase en contacto con el desarrollador . " . $e);
      }
    }
  }

  public function consulta_perfil_documentos($Curp){
    if(!empty($Curp)) {
      try {
        $con = new base_de_datos();
        $conexion = $con -> conexionDB();
        $query = "SELECT documento, fecha_envio, asunto, revision, observacion FROM documentos_usuario WHERE curp = :curp";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':curp', $Curp);
        $resultado -> execute();
        if($resultado) {
          if($resultado -> rowCount() > 0) {
            $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else {
            echo json_encode("NADA");
          }
        }
      } catch(PDOException $e) {
        die("Hubo un problema :(" . $e);
      }
    }
  }

  public function revisar_perfil($Curp) {
    
    if(!empty($Curp)) {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      try {
        $consulta_condicion = "SELECT validado FROM usuario WHERE curp = :curp";
        $resultado_condicion = $conexion -> prepare($consulta_condicion);
        $resultado_condicion -> bindParam(':curp', $Curp);
        $resultado_condicion -> execute();
        if($resultado_condicion) {
          if($resultado_condicion -> rowCount() > 0) {
            $info = $resultado_condicion -> fetch(PDO::FETCH_ASSOC);
            if($info['validado'] == "REVISION") {
              echo "Ya está en revisión.";
            } else if($info['validado'] == "NO") {
              $Validado = "REVISION";
              $query = "UPDATE usuario SET validado = :validado WHERE curp = :curp";
              $resultado = $conexion -> prepare($query);
              $resultado -> bindParam(':curp', $Curp);
              $resultado -> bindParam(':validado', $Validado);
              $resultado -> execute();
              if($resultado) {
                echo "Se pondrá en revisión.";
              }
            } else if($info['validado'] == "SI") {
              echo "Ya fuiste validado.";
            }
          }
        }
      } catch (PDOException $e) {
        die("Hubo un error: ".$e);
      }
    }
  }

  public function modificar_usuario ($Nombres, $Apellido_paterno, $Apellido_materno, $Fecha_nacimiento, $Estado_civil, $Genero, $Discapacidad, $Rfchomoclave, $Domicilio, $No_exterior, $No_interior, $Codigo_postal, $Colonia, $Municipio, $Estado, $Telefono_residencial, $Telefono_celular, $Ingresos_mensuales_personales, $Ingresos_mensuales_familiares, $Dependientes_economicos, $Jornada_laboral, $Correo1, $Correo2, $Grado_maximo_estudio, $Especialidad, $Institucion_egreso, $Fecha_egreso) {

    try {

      $objeto = new base_de_datos();
      $conexion = $objeto -> conexionDB();

      if($Nombres != "" && $Apellido_paterno != "" && $Apellido_materno != "" && $Fecha_nacimiento != "" && $Estado_civil != "" && $Genero != "" && $Discapacidad != "" && $Rfchomoclave != "" && $Domicilio != "" && $Codigo_postal != "" && $Colonia != "" && $Municipio != "" && $Estado != "" && $Telefono_celular != "" && $Correo1 != "" && $Grado_maximo_estudio != "" && $Grado_maximo_estudio != "" && $Especialidad != "" && $Institucion_egreso != "") {
        
        $Curp = $_SESSION['usuario_curp'];
        $Nombres = strtoupper($Nombres);
        $Apellido_paterno = strtoupper($Apellido_paterno);
        $Apellido_materno = strtoupper($Apellido_materno);
        $Rfchomoclave = strtoupper($Rfchomoclave);
        // $Validado = "NO"; NO CAMBIAR VALIDADO

        $query_condicion = "SELECT validado FROM usuario WHERE curp = :curp";
        $resultado_condicion = $conexion -> prepare($query_condicion);
        $resultado_condicion -> bindParam(':curp', $Curp);
        $resultado_condicion -> execute();

        if($resultado_condicion) {
          $info_perfil = $resultado_condicion -> fetch(PDO::FETCH_ASSOC);
          
          if($info_perfil['validado'] != "REVISION" && $info_perfil['validado'] != "SI") {

            $query = "UPDATE usuario SET nombres = :nombres, apellido_paterno = :apellido_paterno, apellido_materno = :apellido_materno, fecha_nacimiento = :fecha_nacimiento, estado_civil = :estado_civil, genero = :genero, discapacidad = :discapacidad, rfchomoclave = :rfc_homo_clave, domicilio = :domicilio, no_exterior = :no_exterior, no_interior = :no_interior, codigo_postal = :codigo_postal, colonia = :colonia, municipio = :municipio, estado = :estado, telefono_residencial = :telefono_residencial, telefono_celular = :telefono_celular, ingresos_mensuales_personales = :ingreso_mes_personal, ingresos_mensuales_familiares = :ingreso_mes_familiar, dependientes_economicos = :dependientes_economicos, jornada_laboral = :jornada_laboral, correo_1 = :correo1, correo_2 = :correo2, grado_maximo_estudio = :grado_max_estudio, especialidad = :especialidad, institucion_egreso = :instituto_egreso, fecha_egreso = :fecha_egreso WHERE  curp = :curp";
            $resultado = $conexion -> prepare($query);

            $resultado -> bindParam(':nombres', $Nombres);
            $resultado -> bindParam(':apellido_paterno', $Apellido_paterno);
            $resultado -> bindParam(':apellido_materno', $Apellido_materno);
            $resultado -> bindParam(':fecha_nacimiento', $Fecha_nacimiento);
            $resultado -> bindParam(':estado_civil', $Estado_civil);
            $resultado -> bindParam(':genero', $Genero);
            $resultado -> bindParam(':discapacidad', $Discapacidad);
            $resultado -> bindParam(':rfc_homo_clave', $Rfchomoclave);
            $resultado -> bindParam(':curp', $Curp);
            $resultado -> bindParam(':domicilio', $Domicilio);
            $resultado -> bindParam(':no_exterior', $No_exterior);
            $resultado -> bindParam(':no_interior', $No_interior);
            $resultado -> bindParam(':codigo_postal', $Codigo_postal);
            $resultado -> bindParam(':colonia', $Colonia);
            $resultado -> bindParam(':municipio', $Municipio);
            $resultado -> bindParam(':estado', $Estado);
            $resultado -> bindParam(':telefono_residencial', $Telefono_residencial);
            $resultado -> bindParam(':telefono_celular', $Telefono_celular);
            $resultado -> bindParam(':ingreso_mes_personal', $Ingresos_mensuales_personales);
            $resultado -> bindParam(':ingreso_mes_familiar', $Ingresos_mensuales_familiares);
            $resultado -> bindParam(':dependientes_economicos', $Dependientes_economicos);
            $resultado -> bindParam(':jornada_laboral', $Jornada_laboral);
            $resultado -> bindParam(':correo1', $Correo1);
            $resultado -> bindParam(':correo2', $Correo2);
            $resultado -> bindParam(':grado_max_estudio', $Grado_maximo_estudio);
            $resultado -> bindParam(':especialidad', $Especialidad);
            $resultado -> bindParam(':instituto_egreso', $Institucion_egreso);
            $resultado -> bindParam(':fecha_egreso', $Fecha_egreso);

            $resultado -> execute();

            if($resultado) echo "La cuenta se ha actualizado.";

          } else echo "No se modificar su perfil después de haber sido validado o estando en revisión.";

        } 
        
      }

    } catch(PDOException $e) {
      die("Error: " . $e);
    }

  }  

  public function administrador_revisar_usuario($Curp, $Revision) {
    try {
      
      $objeto = new base_de_datos();
      $conexion = $objeto -> conexionDB();

      if($Revision == "SI" || $Revision == "NO") {
        $query = "UPDATE usuario SET validado = :revision WHERE curp = :curp";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':curp', $Curp);
        $resultado -> bindParam(':revision', $Revision);
        $resultado -> execute();

        if($resultado) {

          if($Revision == "SI") echo "El usuario ha sido validado.";
          else if($Revision == "NO") echo "El usuario ha sido rechazado. Es decir, no está validado aún.";
          else echo "Algo ocurrío.";

        } else echo "Algo ocurrío.";
        
      } else if($Revision == "ELIMINAR") {
        $query = "DELETE FROM usuario WHERE curp = :curp";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':curp', $Curp);
        $resultado -> execute();

        if($resultado) echo "El usuario ha sido eliminado.";
        else echo "Algo ocurrío.";
        
      }

    } catch(PDOException $e) {
      die("Error: " . $e);
    }
  }

  # cierre de la clase
}

?>
