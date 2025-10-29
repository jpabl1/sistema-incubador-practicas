<?php

  class grupo extends base_de_datos {

    public function registro_grupo(
      $Nombre,
      $Rfc,
      $Domicilio,
      $No_exterior,
      $No_interior,
      $Codigo_postal,
      $Colonia,
      $Municipio,
      $Estado,
      $Telefono_residencial,
      $Fax,
      $Correo,
      $Web,
      $Tipo_grupo,
      $Respuesta1,
      $Respuesta2,
      $Respuesta3,
      $Respuesta4,
      $Respuesta5,
      $Respuesta6,
      $Respuesta7,
      $Respuesta8,
      $Respuesta9,
      $Respuesta10
    ){

    if(!empty($Nombre) && !empty($Domicilio) && !empty($Codigo_postal) && !empty($Colonia) && !empty($Municipio) && !empty($Estado) && !empty($Telefono_residencial) && !empty($Correo) && !empty($Tipo_grupo)) {

      $Nombre = strtoupper($Nombre);
      $Rfc = strtoupper($Rfc);
      $Fecha_registro = date("Y-m-d");
      $Estado_evaluado = "CREADO";
      $Razon = "Creado recientemente.";

      try {

        $con = new base_de_datos();
        $conexion = $con -> conexionDB();

        $query = "INSERT INTO grupo VALUES (null, :nombre, :rfc, :domicilio, :no_exterior, :no_interior, :codigo_postal, :colonia, :municipio, :estado, :telefono_residencial, :fax, :correo, :web, :tipo_grupo, :fecha_registro, :respuesta1, :respuesta2, :respuesta3, :respuesta4, :respuesta5, :respuesta6, :respuesta7, :respuesta8, :respuesta9, :respuesta10, :estado_evaluado, :razon)";
        $resultado = $conexion -> prepare($query);

        $resultado -> bindParam(':nombre', $Nombre);
        $resultado -> bindParam(':rfc', $Rfc);
        $resultado -> bindParam(':domicilio', $Domicilio);
        $resultado -> bindParam(':no_exterior', $No_exterior);
        $resultado -> bindParam(':no_interior', $No_interior);
        $resultado -> bindParam(':codigo_postal', $Codigo_postal);
        $resultado -> bindParam(':colonia', $Colonia);
        $resultado -> bindParam(':municipio', $Municipio);
        $resultado -> bindParam(':estado', $Estado);
        $resultado -> bindParam(':telefono_residencial', $Telefono_residencial);
        $resultado -> bindParam(':fax', $Fax);
        $resultado -> bindParam(':correo', $Correo);
        $resultado -> bindParam(':web', $Web);
        $resultado -> bindParam(':tipo_grupo', $Tipo_grupo);
        $resultado -> bindParam(':fecha_registro', $Fecha_registro);
        $resultado -> bindParam(':respuesta1', $Respuesta1);
        $resultado -> bindParam(':respuesta2', $Respuesta2);
        $resultado -> bindParam(':respuesta3', $Respuesta3);
        $resultado -> bindParam(':respuesta4', $Respuesta4);
        $resultado -> bindParam(':respuesta5', $Respuesta5);
        $resultado -> bindParam(':respuesta6', $Respuesta6);
        $resultado -> bindParam(':respuesta7', $Respuesta7);
        $resultado -> bindParam(':respuesta8', $Respuesta8);
        $resultado -> bindParam(':respuesta9', $Respuesta9);
        $resultado -> bindParam(':respuesta10', $Respuesta10);
        $resultado -> bindParam(':estado_evaluado', $Estado_evaluado);
        $resultado -> bindParam(':razon', $Razon);

        $resultado -> execute();

        if ($resultado) {
          $Folio = $conexion -> lastInsertId();

          $Curp = $_SESSION["usuario_curp"];

          $Tipo_integrante = "CREADOR";
          $Integracion = "ACEPTADA";

          $sql2 = "INSERT INTO grupo_usuario_integrantes (curp, folio, tipo_integrante, integracion) VALUES (:curp, :folio, :tipo_integrante, :integracion)";
          $resultado2 = $conexion -> prepare($sql2);
          $resultado2 -> bindParam(':curp', $Curp);
          $resultado2 -> bindParam(':folio', $Folio);
          $resultado2 -> bindParam(':tipo_integrante', $Tipo_integrante);
          $resultado2 -> bindParam(':integracion', $Integracion);

          $resultado2 -> execute();

          if($resultado2) {
            echo "Se ha creado el proyecto :)";
          }
        }

      } catch (PDOException $e) {
        die("Hubo un problema, por favor contacte con el desarrollador. :(");
      }

    } else {
      echo "Se deben registrar los campos obligatorios.";
    }
  }

  public function consulta_grupos ($busqueda) {
    if(!empty($busqueda)) {
      try {
        $busqueda = "%" . $busqueda . "%";
        $objeto = new base_de_datos();
        $conexion = $objeto -> conexionDB();
        $query = "SELECT folio, nombre, rfc, estado_evaluado, razon FROM grupo WHERE folio LIKE :busqueda OR nombre LIKE :busqueda OR rfc LIKE :busqueda OR estado_evaluado LIKE :busqueda OR razon LIKE :busqueda";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':busqueda', $busqueda);
        $resultado -> execute();

        if($resultado) {
          if($resultado -> rowCount() > 0) {
            $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else echo json_encode("NADA");
        } else echo json_encode("NADA");

      } catch(PDOException $e) {
        die('Error: ' . $e);
      } 
    }
  }

  public function consulta_grupos_por_folio ($Folio) {
    if(!empty($Folio)) {
      try {
        $con = new base_de_datos();
        $conexion = $con -> conexionDB();
        $Curp = $_SESSION['usuario_curp'];

        if($_SESSION['usuario_tipo'] != "Administrador") {
        // Si no es administrador se le someterá a revisión de permisos
          
          $condicion_integrante = "SELECT tipo_integrante, integracion FROM grupo_usuario_integrantes WHERE curp = :curp AND folio = :folio";
          $resultado_condicion = $conexion -> prepare($condicion_integrante);
          $resultado_condicion -> bindParam(':curp', $Curp);
          $resultado_condicion -> bindParam(':folio', $Folio);
          $resultado_condicion -> execute();
          
          if($resultado_condicion) {
            if($resultado_condicion -> rowCount() > 0) {

              $info = $resultado_condicion -> fetch(PDO::FETCH_ASSOC);

              if($info['tipo_integrante'] == 'CREADOR' || $info['tipo_integrante'] == 'INTEGRANTE') {
                if($info['integracion'] == 'ACEPTADA') {
                  $query = "SELECT * FROM grupo WHERE folio = :folio";
                  $resultado = $conexion -> prepare($query);
                  $resultado -> bindParam(':folio', $Folio);
                  $resultado -> execute();
                  if($resultado) {
                    $info = $resultado -> fetch(PDO::FETCH_ASSOC);
                    echo json_encode($info);
                  } else echo json_encode("NADA");
                } else echo json_encode("NADA");
              } else echo json_encode('NADA');
            } else echo json_encode("NADA");
          } else echo json_encode("NADA");

      } else {
        $query1 = "SELECT * FROM grupo WHERE folio = :folio";
        $resultado1 = $conexion -> prepare($query1);
        $resultado1 -> bindParam(':folio', $Folio);
        $resultado1 -> execute();
        if($resultado1) {
          $infoA = $resultado1 -> fetch(PDO::FETCH_ASSOC);
          echo json_encode($infoA);
        } else echo json_encode("NADA");
      }

      } catch (PDOException $e) {
        die("El error fue causado por: " . $e);
      }
    }
  }

  public function consulta_grupos_integrados_por_curp ($Curp) {
    
    if(!empty($Curp)) {
      try {
        
        $con = new base_de_datos();
        $conexion = $con -> conexionDB();
        $query = "SELECT folio, nombre, fecha_registro, estado_evaluado, razon, integracion FROM grupos_integrados_por WHERE curp = :curp";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':curp', $Curp);
        $resultado -> execute();
        
        if($resultado -> rowCount() > 0) {
          $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
          echo json_encode($info);
        } else echo json_encode("NADA");

      }catch(PDOException $e) {
        die("Hubo un error. :( Pongase el contacto con el desarrollador. " . $e);
      }

    }
  }

  public function consulta_grupos_creados_por_curp ($Curp) {
    if(!empty($Curp)) {

      try {

        $con = new base_de_datos();
        $conexion = $con -> conexionDB();

        $query = "SELECT folio, nombre, fecha_registro, tipo_grupo, estado_evaluado, razon FROM grupos_creados_por WHERE curp = :curp";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':curp', $Curp);
        $resultado -> execute();

        if($resultado) {
          if($resultado -> rowCount() > 0) {
            $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else echo json_encode("NADA");
        }

      } catch (PDOException $e) {
        die("Hubo un error. :( Pongase el contacto con el desarrollador. " . $e);
      }
    }
  }

  public function unirse_grupo($Folio, $Curp) {
    if(!empty($Folio) && !empty($Curp)) {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      try {
        # Condiciones
        # El grupo debe de existir y no debe de estar en revision
        $query1 = "SELECT estado_evaluado FROM grupo WHERE folio = :folio";
        # La solicitud no debio haber sido enviada antes
        $query2 = "SELECT folio, curp FROM grupo_usuario_integrantes WHERE folio = :folio AND curp = :curp";

        $resultado1 = $conexion -> prepare($query1);
        $resultado2 = $conexion -> prepare($query2);
        $resultado1 -> bindParam(':folio', $Folio);
        $resultado2 -> bindParam(':folio', $Folio);
        $resultado2 -> bindParam(':curp', $Curp);
        $resultado1 -> execute();
        $resultado2 -> execute();

        if($resultado1) {
          if(!($resultado1 -> rowCount() > 0)) {
            echo "El grupo no existe. El folio debe coincidir con un grupo";
          } else {
            $estado = $resultado1 -> fetch(PDO::FETCH_ASSOC);
            if($estado['estado_evaluado'] != 'REVISION') {
              if($resultado2){
                if(!($resultado2 -> rowCount() > 0)) {
  
                  # La funcion principal ====
  
                  # Lo iniciamos así, ya que solo se integrará
                  $Tipo_integrante = "INTEGRANTE";
                  # Y cuando envie la solicitud, esperará la respuesta del creador
                  $Integracion = "ESPERA";
  
                  $query = "INSERT INTO grupo_usuario_integrantes (folio, curp, tipo_integrante, integracion) VALUES (:folio, :curp, :tipo_integrante, :integracion)";
                  $resultado = $conexion -> prepare($query);
                  $resultado -> bindParam(':folio', $Folio);
                  $resultado -> bindParam(':curp', $Curp);
                  $resultado -> bindParam(':tipo_integrante', $Tipo_integrante);
                  $resultado -> bindParam(':integracion', $Integracion);
                  $resultado -> execute();
  
                  if($resultado) echo "La solicitud ha sido enviada.";
                  else echo "Algo ocurrio.";
  
                } else echo "Usted ya está integrado o ya envio solicitud de integración.";
              }
            } else echo "El proyecto / empresa ya está en revisión, ya no puede mandar solicitudes.";
          }
        }

      } catch (PDOException $e) {
        die("Hubo un error. :( Pongase en contacto con el desarrollador");
      }

    }
  }

  public function consulta_integrantes_por_folio_grupo($Folio) {
    try {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      
      $Curp = $_SESSION['usuario_curp'];
      if($_SESSION['usuario_tipo'] != "Administrador") {
        
        $condicion_integrante = "SELECT tipo_integrante, integracion FROM grupo_usuario_integrantes WHERE curp = :curp AND folio = :folio";
        $resultado_condicion = $conexion -> prepare($condicion_integrante);
        $resultado_condicion -> bindParam(':curp', $Curp);
        $resultado_condicion -> bindParam(':folio', $Folio);
        $resultado_condicion -> execute();

        if($resultado_condicion) {
          if($resultado_condicion -> rowCount() > 0) {
            $info = $resultado_condicion -> fetch(PDO::FETCH_ASSOC);
            if($info['tipo_integrante'] == 'CREADOR') {
              $query = "SELECT curp, validado, integracion FROM grupos_integrados_por WHERE folio = :folio";
              $resultado = $conexion -> prepare($query);
              $resultado -> bindParam(':folio', $Folio);
              $resultado -> execute();
              if($resultado) {
                if($resultado -> rowCount() > 0) {
                  $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
                  echo json_encode($info);
                } else echo json_encode("NADA");
              }
            } else if($info['tipo_integrante'] == 'INTEGRANTE' && $info['integracion'] == 'ACEPTADA'){
              $query = "SELECT validado, curp FROM grupos_integrados_por WHERE folio = :folio";
              $resultado = $conexion -> prepare($query);
              $resultado -> bindParam(':folio', $Folio);
              $resultado -> execute();
              if($resultado) {
                if($resultado -> rowCount() > 0) {
                  $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
                  echo json_encode($info);
                } else {
                  echo json_encode("NADA");
                }
              }
            } else echo json_encode("NOPE");
          } else echo json_encode("NOPE");
        }
      } else {
        
        $query = "SELECT * FROM grupo_usuario_integrantes WHERE folio = :folio";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':folio', $Folio);
        $resultado -> execute();
        
        if($resultado) {
          if($resultado -> rowCount() > 0){
            $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else echo json_encode("NADA");
        }

      }
      
    } catch (PDOException $e) {
      die("Hubo un error. :( Pongase en contacto con el desarrollador" . $e);
    }

  }

  public function consulta_integrantes_por_curp_usuarios ($Curp) {
    if(!empty($Curp)) {
      try {
        $objeto = new base_de_datos();
        $conexion = $objeto -> conexionDB();

        $query = "SELECT folio, tipo_integrante, integracion FROM grupo_usuario_integrantes WHERE curp = :curp";
        $resultado = $conexion -> prepare($query);
        $resultado -> bindParam(':curp', $Curp);
        $resultado -> execute();

        if($resultado) {
          if($resultado -> rowCount() > 0) {
            $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($info);
          } else echo json_encode("NADA");
        }

      }catch(PDOException $e) {
        die("ERROR: " . $e);
      }
    }
  }

  public function seleccion_integracion_grupo($Folio, $Curp, $Integracion){
    if(!empty($Folio) && !empty($Curp) && !empty($Integracion)) {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      try {
        $condicion = "SELECT estado_evaluado FROM grupo WHERE folio = :folio";
        $resultado_condicion = $conexion -> prepare($condicion);
        $resultado_condicion -> bindParam(':folio', $Folio);
        $resultado_condicion -> execute();
        if($resultado_condicion) {

          $estado = $resultado_condicion -> fetch(PDO::FETCH_ASSOC);

          if($estado['estado_evaluado'] != "REVISION") {
            
            $query = "";
            
            if($Integracion == "ACEPTADA") 
              $query = "UPDATE grupo_usuario_integrantes SET integracion = :integracion WHERE curp = :curp AND folio = :folio";
            else if($Integracion == "RECHAZADA") 
              $query = "DELETE FROM grupo_usuario_integrantes WHERE curp = :curp AND folio = :folio";
            
            $resultado = $conexion -> prepare($query);
            $resultado -> bindParam(':curp', $Curp);
            $resultado -> bindParam(':folio', $Folio);

            if($Integracion == "ACEPTADA") $resultado -> bindParam(':integracion', $Integracion);
            
            $resultado -> execute();
            
            if($resultado) {
              if($Integracion == "ACEPTADA") echo "SE HA ACEPTADO A: " . $Curp;
              else if($Integracion == "RECHAZADA") echo "SE HA RECHAZADO A: " . $Curp;
            } 

          } else echo "Ya no puede aceptar o rechazar otras solicitudes, el proyecto está en revisión.";
          
        } else echo "Error: El grupo no existe.";
        
      } catch(PDOException $e) {
        die("Hubo un error. :( Pongase en contacto con el desarrollador"  . $e);
      }
    }
  }

  public function subir_documento_grupo($Folio, $Documento, $Asunto, $Enviado_por) {
    if(!empty($Folio) && !empty($Documento) && !empty($Asunto) && !empty($Enviado_por)) {
      $objeto = new base_de_datos();
      $conexion = $objeto -> conexionDB();
      try {
        # Consulta: Para ver los permisos del usuario que presionó el boton de REVISAR para el proyecto.
        # Si es INTEGRANTE y ha sido ACEPTADA su integración, o es CREADOR. Entonces puede enviar documentos del proyecto.
        # Sino se le mandará el aviso de que no tiene los permisos para enviar documentos del proyecto.
        $query_permisos = "SELECT tipo_integrante, integracion FROM grupo_usuario_integrantes WHERE curp = :curp AND folio = :folio";
        $resultado_permisos = $conexion -> prepare($query_permisos);
        $resultado_permisos -> bindParam(':curp', $Enviado_por);
        $resultado_permisos -> bindParam(':folio', $Folio);
        $resultado_permisos -> execute();

        $query_estado = "SELECT estado_evaluado FROM grupo WHERE folio = :folio";
        $resultado_estado = $conexion -> prepare($query_estado);
        $resultado_estado -> bindParam(':folio', $Folio);
        $resultado_estado -> execute();



        # Condiciones: Si la consulta obtuvo resultado.
        if($resultado_permisos && $resultado_estado) {
          # Condiciones: Si la consulta obtuvo almenos un resultado. También podría decirse que si almenos envío
          # solicitud de integración.
          if($resultado_permisos -> rowCount() == 1) {

            # Extraemos la información de los permisos. Los datos tipo_integrante y integracion respectivamente
            # de ese proyecto respectivamente.
            $permisos = $resultado_permisos -> fetch(PDO::FETCH_ASSOC);
            # También extraemos el estado en el que se encuentra el proyecto
            $estado = $resultado_estado -> fetch(PDO::FETCH_ASSOC);

            if($permisos['tipo_integrante'] == 'CREADOR' || ($permisos['tipo_integrante'] == 'INTEGRANTE' && $permisos['integracion'] == 'ACEPTADA')) {
              

              if($estado['estado_evaluado'] != "REVISION") {

                # Función principal ======

                # Condición: Si un documento con el mismo asunto habia sido subido
                # antes.
                $query_condicion = "SELECT folio FROM documentos_grupo WHERE asunto = :asunto AND folio = :folio";
                $resultado_condicion = $conexion -> prepare($query_condicion);
                $resultado_condicion -> bindParam(':asunto', $Asunto);
                $resultado_condicion -> bindParam(':folio', $Folio);
                $resultado_condicion -> execute();

                $Fecha_envio = date('Y-m-d');

                if($resultado_condicion) {
                  if($resultado_condicion -> rowCount() == 1) {

                    $Revision = "RE-SUBIDO";
                    $Observacion = "Re-subido recientemente.";

                    $query = 'UPDATE documentos_grupo SET documento = :documento, fecha_envio = :fecha_envio, enviado_por = :enviado_por, revision = :revision, observacion = :observacion WHERE asunto = :asunto AND folio = :folio';
                    $resultado = $conexion -> prepare($query);
                    
                    # Variables para la identificacion...
                    $resultado -> bindParam(':folio', $Folio);
                    $resultado -> bindParam(':asunto', $Asunto);

                    # Variables para la actualización...
                    $resultado -> bindParam(':documento', $Documento);
                    $resultado -> bindParam(':fecha_envio', $Fecha_envio);
                    $resultado -> bindParam(':enviado_por', $Enviado_por);
                    $resultado -> bindParam(':revision', $Revision);
                    $resultado -> bindParam(':observacion', $Observacion);

                    $resultado -> execute();

                    if($resultado) {
                      echo "El documento se actualizó con exito.";
                    }

                  } else if($resultado_condicion -> rowCount() == 0) {
                    
                    $Revision = "SUBIDO";
                    $Observacion = "Subido recientemente.";

                    $query = 'INSERT INTO documentos_grupo VALUES (:folio, :documento, :fecha_envio, :asunto, :enviado_por, :revision, :observacion)';
                    $resultado = $conexion -> prepare($query);
                    $resultado -> bindParam(':folio', $Folio);
                    $resultado -> bindParam(':documento', $Documento);
                    $resultado -> bindParam(':fecha_envio', $Fecha_envio);
                    $resultado -> bindParam(':asunto', $Asunto);
                    $resultado -> bindParam(':enviado_por',$Enviado_por);
                    $resultado -> bindParam(':revision', $Revision);
                    $resultado -> bindParam(':observacion', $Observacion);
                    $resultado -> execute();
                    
                    # Mensaje final: Si se envío el documento nuevo.
                    if($resultado) {
                      echo "El documento se envío con exito.";
                    }

                  }
                }
              } else echo "El proyecto / empresa no debe de estar en revisión para poder subir documentos.";

              
            }

          } 
          else if($resultado_permisos -> rowCount() > 1) echo "Error: Esta sucediendo algo internamente. :(";
          else if($resultado_permisos -> rowCount() == 0) echo "No está vinculado en este proyecto.";
        }

      } catch(PDOException $e) {
        die("Hubo un error: " . $e);
      }

    }
  }

  public function revisar_grupo($Folio, $Curp) {
    if(!empty($Folio)) {
      $con = new base_de_datos();
      $conexion = $con -> conexionDB();
      try {

        $condicion_revision1 = "SELECT tipo_integrante FROM grupo_usuario_integrantes WHERE folio = :folio AND curp = :curp";
        $resultado_condicion1 = $conexion -> prepare($condicion_revision1);
        $resultado_condicion1 -> bindParam(':folio', $Folio);
        $resultado_condicion1 -> bindParam(':curp', $Curp);
        $resultado_condicion1 -> execute();

        if($resultado_condicion1) {
          
          if($resultado_condicion1 -> rowCount() > 0) {
            
            $permisos = $resultado_condicion1 -> fetch(PDO::FETCH_ASSOC);
            
            if($permisos['tipo_integrante'] == 'CREADOR') {
              
              $condicion_revision2 = "SELECT estado_evaluado FROM grupo WHERE folio = :folio";
              $resultado_condicion2 = $conexion -> prepare($condicion_revision2);
              $resultado_condicion2 -> bindParam(':folio', $Folio);
              $resultado_condicion2 -> execute();
      
              if($resultado_condicion2) {
      
                if($resultado_condicion2 -> rowCount() > 0) {
      
                  $info = $resultado_condicion2 -> fetch(PDO::FETCH_ASSOC);
                  if($info['estado_evaluado'] != "REVISION"){
                    
                    $Estado_evaluado = "REVISION";
                    $Razon = "En revisión, en espera de la revisión del administrador.";

                    $query = "UPDATE grupo SET estado_evaluado = :estado_evaluado, razon = :razon WHERE folio = :folio";
                    $resultado = $conexion -> prepare($query);
                    $resultado -> bindParam(':estado_evaluado', $Estado_evaluado);
                    $resultado -> bindParam(':razon', $Razon);
                    $resultado -> bindParam(':folio', $Folio);
                    $resultado -> execute();

                    if($resultado) {
                      echo "El proyecto / empresa se asignará para revisión.";
                    }

                  } else {
                    echo "El proyecto / empresa actualmente está en revisión.";
                  }
                }
              }
            } else echo "No tienes permisos para cambiar en revisión el proyecto / empresa.";
          }
        }
      } catch(PDOException $e) {
        die("Hubo un problema " . $e);
      }
    }
  }

  public function consulta_grupo_archivos_subidos ($Folio, $Curp) {
    if(!empty($Folio) && !empty($Curp)) {

      try {
        $objeto = new base_de_datos();
        $conexion = $objeto -> conexionDB();

        if($_SESSION['usuario_tipo'] != "Administrador") {
          $query_permisos = "SELECT tipo_integrante, integracion FROM grupo_usuario_integrantes WHERE curp = :curp AND folio = :folio";
          $resultado_permisos = $conexion -> prepare($query_permisos);
          $resultado_permisos -> bindParam(':folio', $Folio);
          $resultado_permisos -> bindParam(':curp', $Curp);
          $resultado_permisos -> execute();

          if($resultado_permisos) {
            if($resultado_permisos -> rowCount() == 1) {
              
              $permisos = $resultado_permisos -> fetch(PDO::FETCH_ASSOC);

              if(($permisos['tipo_integrante'] == 'CREADOR' && $permisos['integracion'] == 'ACEPTADA') || ($permisos['tipo_integrante'] == 'INTEGRANTE' && $permisos['integracion'] == 'ACEPTADA')) {

                $query = "SELECT * FROM documentos_grupo WHERE folio = :folio";
                $resultado = $conexion -> prepare($query);
                $resultado -> bindParam(':folio', $Folio);
                $resultado -> execute();

                if($resultado) {
                  if($resultado -> rowCount() > 0) {
                    $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($info);
                  } else echo json_encode("NADA");
                }

              } else echo json_encode("NO") ;

            } else if($resultado_permisos -> rowCount() == 0) echo json_encode("NO"); 
              else if($resultado_permisos -> rowCount() > 1) echo json_encode("FALLO");
          }
        } else {
          $query = "SELECT * FROM documentos_grupo WHERE folio = :folio";
          $resultado = $conexion -> prepare($query);
          $resultado -> bindParam(':folio', $Folio);
          $resultado -> execute();
          if($resultado) {
            if($resultado -> rowCount() > 0) {
              $info = $resultado -> fetchAll(PDO::FETCH_ASSOC);
              echo json_encode($info);
            } else echo json_encode("NADA");
          }
        }
        

      }catch(PDOException $e) {
        die("Hubo un problema: " . $e);
      }

    } else {
      echo json_encode(";(");
    }
  }

  public function eliminar_documento_grupo ($Folio, $Asunto, $Curp) {
    
    if(!empty($Folio) && !empty($Asunto) && !empty($Curp)) {

      try {

        $objeto = new base_de_datos();
        $conexion = $objeto -> conexionDB();

        $query_permisos = "SELECT tipo_integrante, integracion FROM grupo_usuario_integrantes WHERE folio = :folio AND curp = :curp";
        $resultado_permisos = $conexion -> prepare($query_permisos);
        $resultado_permisos -> bindParam(':folio', $Folio);
        $resultado_permisos -> bindParam(':curp', $Curp);
        $resultado_permisos -> execute();

        if($resultado_permisos) {
          if($resultado_permisos -> rowCount() == 1) {

            $permisos = $resultado_permisos -> fetch(PDO::FETCH_ASSOC);

            if(($permisos['tipo_integrante'] == "CREADOR" && $permisos['integracion'] == "ACEPTADA") || ($permisos['tipo_integrante'] == "INTEGRANTE" && $permisos['integracion'] == "ACEPTADA")) {

              # funcion principal: eliminar el archivo si es integrante (CREADOR o INTEGRANTE)
              $query = "DELETE FROM documentos_grupo WHERE folio = :folio AND asunto = :asunto";
              $resultado = $conexion -> prepare($query);
              $resultado -> bindParam(':folio', $Folio);
              $resultado -> bindParam(':asunto', $Asunto);
              $resultado -> execute();

              if($resultado) echo "Se eliminó el documento correctamente.";
              else echo "ERROR";

            }

          } else if($resultado_permisos -> rowCount() == 0) echo "Usted no está vinculado a este proyecto.";
            else if($resultado_permisos -> rowCount() > 1) echo "ERROR";
        }
        
      }catch(PDOException $e) {
        die("Error: " . $e);
      }

    } else echo "Algo ocurrío :(";

  }
 
  public function administrador_revisar_grupo($Folio, $Revision, $Observacion) {
    try {
      $objeto = new base_de_datos();
      $conexion = $objeto -> conexionDB();
      if(!empty($Folio) && !empty($Revision)) {

        if($Revision != 'ELIMINAR') {
          
          $query = "UPDATE grupo SET estado_evaluado = :revision, razon = :observacion WHERE folio = :folio";
          $resultado = $conexion -> prepare($query);
          $resultado -> bindParam(':folio', $Folio);  
          $resultado -> bindParam(':revision', $Revision);
          $resultado -> bindParam(':observacion', $Observacion);
          $resultado -> execute();

          if($resultado) {
            
            if($Revision == "ACEPTADO") echo "El proyecto / empresa ha sido aceptado.";
            else if($Revision == "RECHAZADO") echo "El proyecto / empresa ha sido rechazado.";
            else echo "Algo ocurrío.";

          }

        } else {

          $query = "DELETE FROM grupo WHERE folio = :folio";
          $resultado = $conexion -> prepare($query);
          $resultado -> bindParam(':folio', $Folio);
          $resultado -> execute();

          if($resultado) {

            echo "El proyecto / empresa ha sido eliminado.";
            
          }

        }
        
      }

    } catch(PDOException $e) {
      die("Error: " . $e);
    }
  }


  public function modificar_grupo ($Folio, $Nombre, $Rfc, $Domicilio, $No_exterior, $No_interior, $Codigo_postal, $Colonia, $Municipio, $Estado, $Telefono_residencial, $Fax, $Correo, $Web, $Tipo_grupo, $Respuesta1, $Respuesta2, $Respuesta3, $Respuesta4, $Respuesta5, $Respuesta6, $Respuesta7, $Respuesta8, $Respuesta9, $Respuesta10){

    try {

      $objeto = new base_de_datos();
      $conexion = $objeto -> conexionDB();

      if(!empty($Nombre) && !empty($Domicilio) && !empty($Codigo_postal) && !empty($Colonia) && !empty($Municipio) && !empty($Estado) && !empty($Telefono_residencial) && !empty($Correo) && !empty($Tipo_grupo)) {

        $Curp = $_SESSION['usuario_curp'];

        # Valores iniciales
        $Nombre = strtoupper($Nombre);
        $Rfc = strtoupper($Rfc);
        $Fecha_registro = date("Y-m-d");
        $Estado_evaluado = "MODIFICADO";
        $Razon = "Modificado recientemente por " . $Curp;

        $consulta_permisos = "SELECT tipo_integrante, integracion  FROM grupo_usuario_integrantes WHERE curp = :curp AND folio = :folio";
        $resultado_permisos = $conexion -> prepare($consulta_permisos);
        $resultado_permisos -> bindParam(':curp', $Curp);
        $resultado_permisos -> bindParam(':folio', $Folio);
        $resultado_permisos -> execute();

        $consulta_condicion = "SELECT estado_evaluado FROM grupo WHERE folio = :folio";
        $resultado_condicion = $conexion -> prepare($consulta_condicion);
        $resultado_condicion -> bindParam(':folio', $Folio);
        $resultado_condicion -> execute();

        if($resultado_condicion -> rowCount() > 0) {

          $estado = $resultado_condicion -> fetch(PDO::FETCH_ASSOC);
          
          if($estado['estado_evaluado'] != "REVISION") {

            if($resultado_permisos -> rowCount() > 0) {
            
              $permisos_usuario = $resultado_permisos -> fetch(PDO::FETCH_ASSOC);
              
              if($permisos_usuario['tipo_integrante'] == "CREADOR" && $permisos_usuario['integracion'] == "ACEPTADA" || ($permisos_usuario['tipo_integrante'] == "INTEGRANTE" && $permisos_usuario['integracion'] == "ACEPTADA")) {
  
                $query = "UPDATE grupo SET nombre = :nombre, rfc = :rfc, domicilio = :domicilio, no_exterior = :no_exterior, no_interior = :no_interior, codigo_postal = :codigo_postal, colonia = :colonia, municipio = :municipio, estado = :estado, telefono_residencial = :telefono_residencial, fax = :fax, correo = :correo, web = :web, tipo_grupo = :tipo_grupo, fecha_registro = :fecha_registro, respuesta1 = :respuesta1, respuesta2 = :respuesta2, respuesta3 = :respuesta3, respuesta4 = :respuesta4, respuesta5 = :respuesta5, respuesta6 = :respuesta6, respuesta7 = :respuesta7, respuesta8 = :respuesta8, respuesta9 = :respuesta9, respuesta10 = :respuesta10, estado_evaluado = :estado_evaluado, razon = :razon WHERE folio = :folio";
                $resultado = $conexion -> prepare($query);
                $resultado -> bindParam(':folio', $Folio);
                $resultado -> bindParam(':nombre', $Nombre);
                $resultado -> bindParam(':rfc', $Rfc);
                $resultado -> bindParam(':domicilio', $Domicilio);
                $resultado -> bindParam(':no_exterior', $No_exterior);
                $resultado -> bindParam(':no_interior', $No_interior);
                $resultado -> bindParam(':codigo_postal', $Codigo_postal);
                $resultado -> bindParam(':colonia', $Colonia);
                $resultado -> bindParam(':municipio', $Municipio);
                $resultado -> bindParam(':estado', $Estado);
                $resultado -> bindParam(':telefono_residencial', $Telefono_residencial);
                $resultado -> bindParam(':fax', $Fax);
                $resultado -> bindParam(':correo', $Correo);
                $resultado -> bindParam(':web', $Web);
                $resultado -> bindParam(':tipo_grupo', $Tipo_grupo);
                $resultado -> bindParam(':fecha_registro', $Fecha_registro);
                $resultado -> bindParam(':respuesta1', $Respuesta1);
                $resultado -> bindParam(':respuesta2', $Respuesta2);
                $resultado -> bindParam(':respuesta3', $Respuesta3);
                $resultado -> bindParam(':respuesta4', $Respuesta4);
                $resultado -> bindParam(':respuesta5', $Respuesta5);
                $resultado -> bindParam(':respuesta6', $Respuesta6);
                $resultado -> bindParam(':respuesta7', $Respuesta7);
                $resultado -> bindParam(':respuesta8', $Respuesta8);
                $resultado -> bindParam(':respuesta9', $Respuesta9);
                $resultado -> bindParam(':respuesta10', $Respuesta10);
                $resultado -> bindParam(':estado_evaluado', $Estado_evaluado);
                $resultado -> bindParam(':razon', $Razon);
                $resultado -> execute();
  
                if($resultado) echo "La modificación se realizó correctamente.";
                else echo "Error: Algo ocurrío.";
  
              } else echo "No tienes los permisos para modificar el proyecto / empresa";
  
            }

          } else echo "El proyecto no debe de estar en REVISION para poder modificar.";

        }

      }

    } catch(PDOException $e) {
      die("Error: ". $e);
    }

  }


  # fin de la clase
}
?>