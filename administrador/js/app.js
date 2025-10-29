$(document).ready(function () {

  /* INICIO ================== */

  $('#formulario_consulta').hide();
  $('#contenedor_consulta_usuario_detalles').hide();
  $('#contenedor_consulta_grupo_detalles').hide();

  $('#nav_consulta').on('click', function () {
    $('#formulario_consulta').show();
    $('#formulario_bienvenida').hide();
    $('#in_busqueda').focus();
  });
  
  $('#nav_inicio').on('click', function () {
    $('#formulario_consulta').hide();
    $('#formulario_bienvenida').show();
  });
  
  $('#nav_salir').on('click', function() {
    $.ajax({
        url: '../controlador/inicial/cerrar-sesion.php',
        type: 'POST',
        success: function(response) {
          location.reload();
        }
      })
  });

  $('#in_busqueda').keyup(function () {
    if($('#in_busqueda').val()) {
      
      let texto = $('#in_busqueda').val();
      
      generar_tabla_busqueda_usuarios(texto);
      generar_tabla_busqueda_grupos(texto);

    }
  })

  /* INICIO FUNCTIONS */

  /* USUARIOS */

  function generar_tabla_busqueda_usuarios(texto) {
    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-usuarios.php',
      data: {busqueda: texto},
      success: function(response) {
        if(!response.error) {
          let resultados = JSON.parse(response);
          let template = `
          <tr>
            <td class="td_titulos">CURP</td>
            <td class="td_titulos">Nombre</td>
            <td class="td_titulos">Validado</td>
          </tr>
          `;
          if(resultados != "NADA") {
            for(const resultado of resultados) {  
              template += `
                <tr>
                  <td class="td_cuerpos"><a href="#" class="curp" curp=${resultado.curp}>${resultado.curp}</td>
                  <td class="td_cuerpos">${resultado.nombres} ${resultado.apellido_paterno} ${resultado.apellido_materno}</td>
                  <td class="td_cuerpos">${resultado.validado}</td>
                </tr>
              `;
              generar_tabla_usuario_perfil();
            }
          } else {
            template += `
              <tr>
                <td class="celda_vacia" colspan=3>NO HAY USUARIOS.</td>
              </tr>
            `;
          }
          $('#consulta_administrador_usuarios').show();
          $('#consulta_administrador_usuarios').html(template);
        }
      }
    });
  }

  function generar_tabla_usuario_perfil() {
    $(document).off('click', '.curp');
    $(document).on('click', '.curp', (e) => {

      const elemento = document.activeElement;
      const curp = $(elemento).attr('curp');

      generar_tabla_usuario_documentos(curp);
      generar_tabla_usuario_grupos_creados_integrados(curp);
      generar_exportacion_pdf_usuario(curp);

      $.ajax({
        type: 'POST',
        url: '../controlador/administrador/ver-usuario-perfil.php',
        data: {curp: curp},
        success: function(response) {
          if(!response.error) {
            let resultado = JSON.parse(response);
            let template = '';
            if(resultado != "NADA") {
              template= `
                <tr><td class="td_titulos">Nombres:</td><td class="td_cuerpos" colspan="6"> ${resultado.nombres} </td></tr>
                <tr><td class="td_titulos">Ap. Paterno:</td><td class="td_cuerpos" colspan="6"> ${resultado.apellido_paterno} </td></tr>
                <tr><td class="td_titulos">Ap. Materno:</td><td class="td_cuerpos" colspan="6"> ${resultado.apellido_materno} </td></tr>
                <tr><td class="td_titulos">Fecha Nacimiento:</td><td class="td_cuerpos" colspan="6"> ${resultado.fecha_nacimiento} </td></tr>
                <tr><td class="td_titulos">Estado Civil:</td><td class="td_cuerpos" colspan="6"> ${resultado.estado_civil} </td></tr>
                <tr><td class="td_titulos">Genero:</td><td class="td_cuerpos" colspan="6"> ${resultado.genero} </td></tr>
                <tr><td class="td_titulos">Discapacidad</td><td class="td_cuerpos" colspan="6"> ${resultado.discapacidad} </td></tr>
                <tr><td class="td_titulos">RFC con Homo Clave:</td><td class="td_cuerpos" colspan="6"> ${resultado.rfchomoclave} </td></tr>
                <tr><td class="td_titulos">CURP:</td><td class="td_cuerpos" colspan="6"> ${resultado.curp} </td></tr>
                <tr><td class="td_titulos">Domicilio:</td><td class="td_cuerpos" colspan="6"> ${resultado.domicilio} </td></tr>
                <tr><td class="td_titulos">No. Exterior:</td><td class="td_cuerpos"> ${resultado.no_exterior} </td>
                    <td class="td_titulos">No. Interior:</td><td class="td_cuerpos"> ${resultado.no_interior} </td>
                    <td class="td_titulos">Código Postal:</td><td class="td_cuerpos"> ${resultado.codigo_postal} </td></tr>
                <tr><td class="td_titulos">Colonia:</td><td class="td_cuerpos" colspan="6"> ${resultado.colonia} </td></tr>
                <tr><td class="td_titulos">Estado:</td><td class="td_cuerpos" colspan="6"> ${resultado.estado} </td></tr>
                <tr><td class="td_titulos">Municipio:</td><td class="td_cuerpos" colspan="6"> ${resultado.municipio} </td></tr>
                <tr><td class="td_titulos">Telefono Residencial:</td><td class="td_cuerpos" colspan="6"> ${resultado.telefono_residencial} </td></tr>
                <tr><td class="td_titulos">Telefono Celular:</td><td class="td_cuerpos" colspan="6"> ${resultado.telefono_celular} </td></tr>
                <tr><td class="td_titulos">Ingresos Mes. Personales:</td><td class="td_cuerpos"> ${resultado.ingresos_mensuales_personales} </td>
                    <td class="td_titulos">Ingresos Mes. Familiares:</td><td class="td_cuerpos"> ${resultado.ingresos_mensuales_familiares} </td>
                    <td class="td_titulos">Dependientes Economicos:</td><td class="td_cuerpos"> ${resultado.dependientes_economicos} </td></tr>
                <tr><td class="td_titulos">Jornada Laboral: </td><td class="td_cuerpos" colspan="6"> ${resultado.jornada_laboral} </td></tr>
                <tr><td class="td_titulos">Correo #1:</td><td class="td_cuerpos" colspan="6"> ${resultado.correo_1} </td></tr>
                <tr><td class="td_titulos">Correo #2: </td><td class="td_cuerpos" colspan="6"> ${resultado.correo_2} </td></tr>
                <tr><td class="td_titulos">Grado Máximo de Estudio: </td><td class="td_cuerpos" colspan="6"> ${resultado.grado_maximo_estudio} </td></tr>
                <tr><td class="td_titulos">Especialidad: </td><td class="td_cuerpos" colspan="6"> ${resultado.especialidad} </td></tr>
                <tr><td class="td_titulos">Institución de Egreso: </td><td class="td_cuerpos" colspan="6"> ${resultado.institucion_egreso} </td></tr>
                <tr><td class="td_titulos">Fecha de Egreso: </td><td class="td_cuerpos" colspan="6"> ${resultado.fecha_egreso} </td></tr>
                <tr><td class="td_titulos">Validado: </td><td class="td_cuerpos" colspan="6"> ${resultado.validado} </td></tr>
              `;
              
              if(resultado.validado == "REVISION") {
                template += `
                <tr>
                  <td class="td_opciones" colspan="7">
                    <button class="formularios_subir_sin_sombra" id="btn_si_validar_usuario"> <span class="icon-checkmark"></span> ACEPTAR </button>
                    <button class="formularios_subir_sin_sombra" id="btn_no_validar_usuario"> <span class="icon-cross"></span> RECHAZAR </button>
                    <button class="formularios_subir_sin_sombra" id="btn_eliminar_usuario"> <span class="icon-bin"></span> ELIMINAR</button>
                  </td>
                </tr>
                `;
              }
            }
            
            $('#contenedor_consulta_usuario_detalles').show();
            $('#contenedor_consulta_grupo_detalles').hide();
            $('#consulta_administrador_usuario_detalles').show();
            $('#consulta_administrador_usuario_detalles').html(template);
            
            asignar_curp_btn_si_validar_usuario(curp);
            asignar_curp_btn_no_validar_usuario(curp);
            asignar_curp_btn_eliminar_usuario(curp);

          }
        }
      });
    });
    
  }

  function generar_tabla_usuario_perfil_opcion2 (curp) {
    generar_tabla_usuario_documentos(curp);
    generar_tabla_usuario_grupos_creados_integrados(curp);
    generar_exportacion_pdf_usuario(curp);

    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-usuario-perfil.php',
      data: {curp: curp},
      success: function(response) {
        if(!response.error) {
          let resultado = JSON.parse(response);
          let template = '';
          if(resultado != "NADA") {
            template= `
              <tr><td class="td_titulos">Nombres:</td><td class="td_cuerpos" colspan="6"> ${resultado.nombres} </td></tr>
              <tr><td class="td_titulos">Ap. Paterno:</td><td class="td_cuerpos" colspan="6"> ${resultado.apellido_paterno} </td></tr>
              <tr><td class="td_titulos">Ap. Materno:</td><td class="td_cuerpos" colspan="6"> ${resultado.apellido_materno} </td></tr>
              <tr><td class="td_titulos">Fecha Nacimiento:</td><td class="td_cuerpos" colspan="6"> ${resultado.fecha_nacimiento} </td></tr>
              <tr><td class="td_titulos">Estado Civil:</td><td class="td_cuerpos" colspan="6"> ${resultado.estado_civil} </td></tr>
              <tr><td class="td_titulos">Genero:</td><td class="td_cuerpos" colspan="6"> ${resultado.genero} </td></tr>
              <tr><td class="td_titulos">Discapacidad</td><td class="td_cuerpos" colspan="6"> ${resultado.discapacidad} </td></tr>
              <tr><td class="td_titulos">RFC con Homo Clave:</td><td class="td_cuerpos" colspan="6"> ${resultado.rfchomoclave} </td></tr>
              <tr><td class="td_titulos">CURP:</td><td class="td_cuerpos" colspan="6"> ${resultado.curp} </td></tr>
              <tr><td class="td_titulos">Domicilio:</td><td class="td_cuerpos" colspan="6"> ${resultado.domicilio} </td></tr>
              <tr><td class="td_titulos">No. Exterior:</td><td class="td_cuerpos"> ${resultado.no_exterior} </td>
                  <td class="td_titulos">No. Interior:</td><td class="td_cuerpos"> ${resultado.no_interior} </td>
                  <td class="td_titulos">Código Postal:</td><td class="td_cuerpos"> ${resultado.codigo_postal} </td></tr>
              <tr><td class="td_titulos">Colonia:</td><td class="td_cuerpos" colspan="6"> ${resultado.colonia} </td></tr>
              <tr><td class="td_titulos">Estado:</td><td class="td_cuerpos" colspan="6"> ${resultado.estado} </td></tr>
              <tr><td class="td_titulos">Municipio:</td><td class="td_cuerpos" colspan="6"> ${resultado.municipio} </td></tr>
              <tr><td class="td_titulos">Telefono Residencial:</td><td class="td_cuerpos" colspan="6"> ${resultado.telefono_residencial} </td></tr>
              <tr><td class="td_titulos">Telefono Celular:</td><td class="td_cuerpos" colspan="6"> ${resultado.telefono_celular} </td></tr>
              <tr><td class="td_titulos">Ingresos Mes. Personales:</td><td class="td_cuerpos"> ${resultado.ingresos_mensuales_personales} </td>
                  <td class="td_titulos">Ingresos Mes. Familiares:</td><td class="td_cuerpos"> ${resultado.ingresos_mensuales_familiares} </td>
                  <td class="td_titulos">Dependientes Economicos:</td><td class="td_cuerpos"> ${resultado.dependientes_economicos} </td></tr>
              <tr><td class="td_titulos">Jornada Laboral: </td><td class="td_cuerpos" colspan="6"> ${resultado.jornada_laboral} </td></tr>
              <tr><td class="td_titulos">Correo #1:</td><td class="td_cuerpos" colspan="6"> ${resultado.correo_1} </td></tr>
              <tr><td class="td_titulos">Correo #2: </td><td class="td_cuerpos" colspan="6"> ${resultado.correo_2} </td></tr>
              <tr><td class="td_titulos">Grado Máximo de Estudio: </td><td class="td_cuerpos" colspan="6"> ${resultado.grado_maximo_estudio} </td></tr>
              <tr><td class="td_titulos">Especialidad: </td><td class="td_cuerpos" colspan="6"> ${resultado.especialidad} </td></tr>
              <tr><td class="td_titulos">Institución de Egreso: </td><td class="td_cuerpos" colspan="6"> ${resultado.institucion_egreso} </td></tr>
              <tr><td class="td_titulos">Fecha de Egreso: </td><td class="td_cuerpos" colspan="6"> ${resultado.fecha_egreso} </td></tr>
              <tr><td class="td_titulos">Validado: </td><td class="td_cuerpos" colspan="6"> ${resultado.validado} </td></tr>
            `;
            
            if(resultado.validado == "REVISION") {
              template += `
              <tr>
                <td class="td_opciones" colspan="7">
                  <button class="formularios_subir_sin_sombra" id="btn_si_validar_usuario"> <span class="icon-checkmark"></span> ACEPTAR </button>
                  <button class="formularios_subir_sin_sombra" id="btn_no_validar_usuario"> <span class="icon-cross"></span> RECHAZAR </button>
                  <button class="formularios_subir_sin_sombra" id="btn_eliminar_usuario"> <span class="icon-bin"></span> ELIMINAR</button>
                </td>
              </tr>
              `;
            }
          }
          
          $('#contenedor_consulta_usuario_detalles').show();
          $('#contenedor_consulta_grupo_detalles').hide();
          $('#consulta_administrador_usuario_detalles').show();
          $('#consulta_administrador_usuario_detalles').html(template);
          
          asignar_curp_btn_si_validar_usuario(curp);
          asignar_curp_btn_no_validar_usuario(curp);
          asignar_curp_btn_eliminar_usuario(curp);

        }
      }
    });
  }

  function asignar_curp_btn_si_validar_usuario (curp) {
    $('#btn_si_validar_usuario').off('click');
    $('#btn_si_validar_usuario').on('click', function() {
      
      const revision = "SI";
      
      $.ajax({
        type: 'POST',
        url: '../controlador/administrador/validar-usuario.php',
        data: {curp: curp, revision: revision},
        success: function(response) {
          
          Swal.fire({
            title: "ATENCIÓN",
            text: response,
            background: "#000",
            color: "#fff",
          });
  
        }
      });

      generar_tabla_usuario_perfil_opcion2(curp);

    });
  };


  function asignar_curp_btn_no_validar_usuario (curp) {
    $('#btn_no_validar_usuario').off('click');
    $('#btn_no_validar_usuario').on('click', function() {

      const revision = "NO";

      $.ajax({
        type: "POST",
        data: { curp: curp, revision: revision },
        url: "../controlador/administrador/validar-usuario.php",
        success: function(response) { 
          if(!response.error) { 
            Swal.fire({
              title: "ATENCIÓN",
              text: response,
              background: "#000",
              color: "#fff",
            }) 
          } 
        }
      });

      generar_tabla_usuario_perfil_opcion2(curp);

    })

  };

  function asignar_curp_btn_eliminar_usuario (curp) {
    $('#btn_eliminar_usuario').off('click');
    $('#btn_eliminar_usuario').on('click', function () {

      const revision = "ELIMINAR"

      $.ajax({
        type: 'POST',
        url: '../controlador/administrador/validar-usuario.php',
        data: {curp: curp, revision: revision},
        success: function(response) {
          Swal.fire({
            title: "ATENCIÓN",
            text: response,
            background: "#000",
            color: "#fff"
          });
        }
      });

      generar_tabla_usuario_perfil_opcion2(curp);

    });

  }

  function generar_tabla_usuario_documentos (curp) {
    
    $.ajax({
      type: 'POST', 
      url: '../controlador/administrador/ver-usuario-perfil-documentos.php',
      data: {curp: curp},
      success: function(response) {
        if(!response.error) {
          let resultados = JSON.parse(response);
          let template = `
            <tr>
              <td class="td_titulos">Documento</td>
              <td class="td_titulos">Fecha</td>
              <td class="td_titulos">Asunto</td>
              <td class="td_titulos">Revisión</td>
              <td class="td_titulos">Observación</td>
            </tr>
          `;
          if(resultados != "NADA") {
            for(const resultado of resultados) {
              template += `
                <tr>
                  <td class="td_cuerpos"><a href="../files/usuarios/${curp}/${resultado.documento}" target="_blank">${resultado.documento}</a></td>
                  <td class="td_cuerpos">${resultado.fecha_envio}</td>
                  <td class="td_cuerpos">${resultado.asunto}</td>
                  <td class="td_cuerpos">${resultado.revision}</td>
                  <td class="td_cuerpos">${resultado.observacion}</td>
                </tr>
              `;
            }
          }

          $('#consulta_administrador_usuario_documentos').show();
          $('#consulta_administrador_usuario_documentos').html(template);

        }
      }
    });
    
  }

  function generar_tabla_usuario_grupos_creados_integrados (curp) {

    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-usuario-perfil-grupos.php',
      data: {curp: curp},
      success: function(response) {
        let resultados = JSON.parse(response);
        let template = `
          <tr>
            <td class="td_titulos">Folio</td>
            <td class="td_titulos">Tipo Integrante</td>
            <td class="td_titulos">Integracion</td>
          </tr>
        `;
        if(resultados != "NADA") {
          for(const resultado of resultados) {
            template += `
              <tr>
                <td class="td_cuerpos">${resultado.folio}</td>
                <td class="td_cuerpos">${resultado.tipo_integrante}</td>
                <td class="td_cuerpos">${resultado.integracion}</td>
              </tr>
            `;
          }
        }

        $('#consulta_administrador_usuario_proyectos').show();
        $('#consulta_administrador_usuario_proyectos').html(template);

      }
    });

  }

  /* FIN USUARIOS */

  /* GRUPOS */

  function generar_tabla_busqueda_grupos (texto) {
    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-grupos.php',
      data: {busqueda: texto},
      success: function(response) {
        if(!response.error) {
          let resultados = JSON.parse(response);
          let template = `
            <tr>
              <td class="td_titulos">Folio</td>
              <td class="td_titulos">Nombre</td>
              <td class="td_titulos">RFC</td>
              <td class="td_titulos">Evaluación</td>
              <td class="td_titulos">Razón</td>
            </tr>
          `;
          if(resultados != "NADA") {
            for(const resultado of resultados) {
              template += `
                <tr>
                  <td class="td_cuerpos"><a href="#" class="folio" folio="${resultado.folio}">${resultado.folio}</a></td>
                  <td class="td_cuerpos">${resultado.nombre}</td>
                  <td class="td_cuerpos">${resultado.rfc}</td>
                  <td class="td_cuerpos">${resultado.estado_evaluado}</td>
                  <td class="td_cuerpos">${resultado.razon}</td>
                </tr>
              ` ;
              
            }
            generar_tabla_grupo_detalles();
          } else {
            template += `
              <tr>
                <td class="celda_vacia" colspan=5>NO HAY GRUPOS.</td> 
              </tr>
            `;
          }
          $('#consulta_administrador_grupos').show();
          $('#consulta_administrador_grupos').html(template);
        }
      }
    });
  }

  function generar_tabla_grupo_detalles () {
    $(document).off('click', '.folio');
    $(document).on('click', '.folio', (e) => {
      
      const elemento = document.activeElement;
      const folio = $(elemento).attr('folio');
      
      generar_exportacion_pdf_grupo(folio);

      $.ajax({
        type: 'POST',
        url: '../controlador/administrador/ver-grupo-detalles.php',
        data: {folio: folio},
        success: function (response) {
          if(!response.error) {
            let resultado_grupo = JSON.parse(response);
            console.log(folio);
            console.log(response);
            let template = '';
            if(resultado_grupo != "NADA") {
              template = `
                <tr><td class="td_titulos">Folio:</td><td class="td_cuerpos">${resultado_grupo.folio}</tr>
                <tr><td class="td_titulos">Nombre:</td><td class="td_cuerpos">${resultado_grupo.nombre}</tr>
                <tr><td class="td_titulos">RFC:</td><td class="td_cuerpos">${resultado_grupo.rfc}</tr>
                <tr><td class="td_titulos">Domicilio / Calle:</td><td class="td_cuerpos">${resultado_grupo.domicilio}</tr>
                <tr><td class="td_titulos">No. exterior:</td><td class="td_cuerpos">${resultado_grupo.no_exterior}</tr>
                <tr><td class="td_titulos">No. interior:</td><td class="td_cuerpos">${resultado_grupo.no_interior}</tr>
                <tr><td class="td_titulos">Código Postal:</td><td class="td_cuerpos">${resultado_grupo.codigo_postal}</tr>
                <tr><td class="td_titulos">Colonia:</td><td class="td_cuerpos">${resultado_grupo.colonia}</tr>
                <tr><td class="td_titulos">Municipio:</td><td class="td_cuerpos">${resultado_grupo.municipio}</tr>
                <tr><td class="td_titulos">Estado:</td><td class="td_cuerpos">${resultado_grupo.estado}</tr>
                <tr><td class="td_titulos">Telefono Residencial:</td><td class="td_cuerpos">${resultado_grupo.telefono_residencial}</tr>
                <tr><td class="td_titulos">Fax:</td><td class="td_cuerpos">${resultado_grupo.fax}</tr>
                <tr><td class="td_titulos">Correo:</td><td class="td_cuerpos">${resultado_grupo.correo}</tr>
                <tr><td class="td_titulos">Página Web:</td><td class="td_cuerpos">${resultado_grupo.web}</tr>
                <tr><td class="td_titulos">Tipo:</td><td class="td_cuerpos">${resultado_grupo.tipo_grupo}</tr>
                <tr><td class="td_titulos">Fecha de registro:</td><td class="td_cuerpos">${resultado_grupo.fecha_registro}</tr>
                <tr><td class="td_titulos">Nombre tentativo o definitivo del negocio:</td><td class="td_cuerpos">${resultado_grupo.respuesta1}</tr>
                <tr><td class="td_titulos">¿Cuál es la necesidad que has detectado y quieres satisfacer o resolver generando algún producto o servicio?</td><td class="td_cuerpos">${resultado_grupo.respuesta2}</tr>
                <tr><td class="td_titulos">¿Cuál es la innovación de tu producto(s) y servicio(s) para satisfacer la necesidad detectada?</td><td class="td_cuerpos">${resultado_grupo.respuesta3}</tr>
                <tr><td class="td_titulos">¿Donde pretenden ubicar el proyecto y cuál es el alcance geográfico de su mercado?</td><td class="td_cuerpos">${resultado_grupo.respuesta4}</tr>
                <tr><td class="td_titulos">¿Cuál es la ventaja competitiva de tu producto y/o servicio (ventajas geográficas, productivas, tecnológicas, técnicas, logísticas, financieras, organizacionales, patrimoniales y legales)?</td><td class="td_cuerpos">${resultado_grupo.respuesta5}</tr>
                <tr><td class="td_titulos">¿Qué experiencia práctica y profesional tienes tu, tu socio y la familia de tu socio en el tipo de mercado donde piensan ofrecer los producto(s) o servicio(s) qué describes?</td><td class="td_cuerpos">${resultado_grupo.respuesta6}</tr>
                <tr><td class="td_titulos">¿Qué experiencia empresarial tienes tú. tu socio y la familia de tu socio?</td><td class="td_cuerpos">${resultado_grupo.respuesta7}</tr>
                <tr><td class="td_titulos">¿Qué te motiva a crear tu propia empresa?</td><td class="td_cuerpos">${resultado_grupo.respuesta8}</tr>
                <tr><td class="td_titulos">¿Cuál es la motivación de tu socio?</td><td class="td_cuerpos">${resultado_grupo.respuesta9}</tr>
                <tr><td class="td_titulos">¿Cuál es el objetivo del proyecto?</td><td class="td_cuerpos">${resultado_grupo.respuesta10}</tr>
                <tr><td class="td_titulos">Evaluado:</td><td class="td_cuerpos">${resultado_grupo.estado_evaluado}</tr>
                <tr><td class="td_titulos">Razón:</td><td class="td_cuerpos">${resultado_grupo.razon}</tr>`;

                generar_tabla_grupo_detalles_archivos_subidos(resultado_grupo.folio);
                generar_tabla_grupo_detalles_integrantes(resultado_grupo.folio);

                if(resultado_grupo.estado_evaluado == "REVISION") {
                  template += `
                    <tr>
                      <td class="td_cuerpos" colspan="3">
                        <label for="in_observacion">Observación:</label>
                        <textarea class="pregunta_textarea" id="in_observacion"> </textarea>
                        <label for="">¿Validar?</label>
                        <button class="formularios_subir_sin_sombra" id="btn_si_validar_grupo"> <span class="icon-checkmark"></span>  ACEPTAR  </button>
                        <button class="formularios_subir_sin_sombra" id="btn_no_validar_grupo"> <span class="icon-cross"></span>  RECHAZAR  </button>
                        <button class="formularios_subir_sin_sombra" id="btn_eliminar_grupo"> <span class="icon-bin"></span>  ELIMINAR  </button>
                      </td>
                    </tr>
                  `;
                }

            } else template = `<tr> <td class="celda_vacia">Error: No hay información.</td> </tr>`;

            $('#contenedor_consulta_grupo_detalles').show();
            $('#contenedor_consulta_usuario_detalles').hide();
            $('#consulta_administrador_grupo_detalles').show();
            $('#consulta_administrador_grupo_detalles').html(template);

            asignar_folio_btn_si_validar_grupo(folio);
            asignar_folio_btn_no_validar_grupo(folio);
            asignar_folio_btn_eliminar_grupo(folio);

          }
        }
      });
    })
  }
  
  function generar_tabla_grupo_detalles_opcion2 (folio) {

    generar_exportacion_pdf_grupo(folio);

    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-grupo-detalles.php',
      data: {folio: folio},
      success: function (response) {
        if(!response.error) {
          let resultado_grupo = JSON.parse(response);
          console.log(folio);
          console.log(response);
          let template = '';
          if(resultado_grupo != "NADA") {
            template = `
              <tr><td class="td_titulos">Folio:</td><td class="td_cuerpos">${resultado_grupo.folio}</tr>
              <tr><td class="td_titulos">Nombre:</td><td class="td_cuerpos">${resultado_grupo.nombre}</tr>
              <tr><td class="td_titulos">RFC:</td><td class="td_cuerpos">${resultado_grupo.rfc}</tr>
              <tr><td class="td_titulos">Domicilio / Calle:</td><td class="td_cuerpos">${resultado_grupo.domicilio}</tr>
              <tr><td class="td_titulos">No. exterior:</td><td class="td_cuerpos">${resultado_grupo.no_exterior}</tr>
              <tr><td class="td_titulos">No. interior:</td><td class="td_cuerpos">${resultado_grupo.no_interior}</tr>
              <tr><td class="td_titulos">Código Postal:</td><td class="td_cuerpos">${resultado_grupo.codigo_postal}</tr>
              <tr><td class="td_titulos">Colonia:</td><td class="td_cuerpos">${resultado_grupo.colonia}</tr>
              <tr><td class="td_titulos">Municipio:</td><td class="td_cuerpos">${resultado_grupo.municipio}</tr>
              <tr><td class="td_titulos">Estado:</td><td class="td_cuerpos">${resultado_grupo.estado}</tr>
              <tr><td class="td_titulos">Telefono Residencial:</td><td class="td_cuerpos">${resultado_grupo.telefono_residencial}</tr>
              <tr><td class="td_titulos">Fax:</td><td class="td_cuerpos">${resultado_grupo.fax}</tr>
              <tr><td class="td_titulos">Correo:</td><td class="td_cuerpos">${resultado_grupo.correo}</tr>
              <tr><td class="td_titulos">Página Web:</td><td class="td_cuerpos">${resultado_grupo.web}</tr>
              <tr><td class="td_titulos">Tipo:</td><td class="td_cuerpos">${resultado_grupo.tipo_grupo}</tr>
              <tr><td class="td_titulos">Fecha de registro:</td><td class="td_cuerpos">${resultado_grupo.fecha_registro}</tr>
              <tr><td class="td_titulos">Nombre tentativo o definitivo del negocio:</td><td class="td_cuerpos">${resultado_grupo.respuesta1}</tr>
              <tr><td class="td_titulos">¿Cuál es la necesidad que has detectado y quieres satisfacer o resolver generando algún producto o servicio?</td><td class="td_cuerpos">${resultado_grupo.respuesta2}</tr>
              <tr><td class="td_titulos">¿Cuál es la innovación de tu producto(s) y servicio(s) para satisfacer la necesidad detectada?</td><td class="td_cuerpos">${resultado_grupo.respuesta3}</tr>
              <tr><td class="td_titulos">¿Donde pretenden ubicar el proyecto y cuál es el alcance geográfico de su mercado?</td><td class="td_cuerpos">${resultado_grupo.respuesta4}</tr>
              <tr><td class="td_titulos">¿Cuál es la ventaja competitiva de tu producto y/o servicio (ventajas geográficas, productivas, tecnológicas, técnicas, logísticas, financieras, organizacionales, patrimoniales y legales)?</td><td class="td_cuerpos">${resultado_grupo.respuesta5}</tr>
              <tr><td class="td_titulos">¿Qué experiencia práctica y profesional tienes tu, tu socio y la familia de tu socio en el tipo de mercado donde piensan ofrecer los producto(s) o servicio(s) qué describes?</td><td class="td_cuerpos">${resultado_grupo.respuesta6}</tr>
              <tr><td class="td_titulos">¿Qué experiencia empresarial tienes tú. tu socio y la familia de tu socio?</td><td class="td_cuerpos">${resultado_grupo.respuesta7}</tr>
              <tr><td class="td_titulos">¿Qué te motiva a crear tu propia empresa?</td><td class="td_cuerpos">${resultado_grupo.respuesta8}</tr>
              <tr><td class="td_titulos">¿Cuál es la motivación de tu socio?</td><td class="td_cuerpos">${resultado_grupo.respuesta9}</tr>
              <tr><td class="td_titulos">¿Cuál es el objetivo del proyecto?</td><td class="td_cuerpos">${resultado_grupo.respuesta10}</tr>
              <tr><td class="td_titulos">Evaluado:</td><td class="td_cuerpos">${resultado_grupo.estado_evaluado}</tr>
              <tr><td class="td_titulos">Razón:</td><td class="td_cuerpos">${resultado_grupo.razon}</tr>`;

              generar_tabla_grupo_detalles_archivos_subidos(resultado_grupo.folio);
              generar_tabla_grupo_detalles_integrantes(resultado_grupo.folio);

              if(resultado_grupo.estado_evaluado == "REVISION") {
                template += `
                <tr>
                <td class="td_cuerpos" colspan="3">
                  <label for="in_observacion">Observación:</label>
                  <input class="pregunta_input" type="text" id="in_observacion">
                  <label for="">¿Validar?</label>
                  <button class="formularios_subir_sin_sombra" id="btn_si_validar_grupo"> <span class="icon-checkmark"></span>  ACEPTAR  </button>
                  <button class="formularios_subir_sin_sombra" id="btn_no_validar_grupo"> <span class="icon-cross"></span>  RECHAZAR  </button>
                  <button class="formularios_subir_sin_sombra" id="btn_eliminar_grupo"> <span class="icon-bin"></span>  ELIMINAR  </button>
                </td>
              </tr>
                `;
              }

          } else template = `<tr> <td class="celda_vacia">Error: No hay información.</td> </tr>`;

          $('#contenedor_consulta_grupo_detalles').show();
          $('#contenedor_consulta_usuario_detalles').hide();
          $('#consulta_administrador_grupo_detalles').show();
          $('#consulta_administrador_grupo_detalles').html(template);

          asignar_folio_btn_si_validar_grupo(folio);
          asignar_folio_btn_no_validar_grupo(folio);
          asignar_folio_btn_eliminar_grupo(folio);

        }
      }
    });
  }

  function asignar_folio_btn_si_validar_grupo (folio) {
    $('#btn_si_validar_grupo').off('click');
    $('#btn_si_validar_grupo').on('click', function() {
      const revision = "ACEPTADO";
      const observacion = $('#in_observacion').val();
      
      $.ajax({
        type: 'POST',
        data: {folio: folio, revision: revision, observacion: observacion},
        url: '../controlador/administrador/validar-grupo.php',
        success: function(response) { 
          Swal.fire({
            title: "ATENCIÓN",
            text: response,
            background: "#000",
            color: "#fff"
          });
        }
      });

      generar_tabla_grupo_detalles_opcion2 (folio);

    });
  }

  function asignar_folio_btn_no_validar_grupo (folio) {
    $('#btn_no_validar_grupo').off('click');
    $('#btn_no_validar_grupo').on('click', function() {
      const revision = "RECHAZADO";
      const observacion = $('#in_observacion').val();
      
      $.ajax({
        type: 'POST',
        data: {folio: folio, revision: revision, observacion: observacion},
        url: '../controlador/administrador/validar-grupo.php',
        success: function(response) { 
          Swal.fire({
            title: "ATENCIÓN",
            text: response,
            background: "#000",
            color: "#fff"
          });
        }
      });

      generar_tabla_grupo_detalles_opcion2 (folio);

    });
  }

  function asignar_folio_btn_eliminar_grupo (folio) {
    $('#btn_eliminar_grupo').off('click');
    $('#btn_eliminar_grupo').on('click', function() {
      const revision = "ELIMINAR";
      const observacion = $('#in_observacion').val();
      
      $.ajax({
        type: 'POST',
        data: {folio: folio, revision: revision, observacion: observacion},
        url: '../controlador/administrador/validar-grupo.php',
        success: function(response) {
          Swal.fire({
            title: "ATENCIÓN",
            text: response,
            background: "#000",
            color: "#fff"
          });
        }
      });

      generar_tabla_grupo_detalles_opcion2 (folio);

    });
  }

  function generar_tabla_grupo_detalles_integrantes (folio) {
    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-grupo-detalles-integrantes.php',
      data: {folio: folio},
      success: function(response) {

        if(!response.error) {
          let resultados = JSON.parse(response);
          let template = '';

          if(resultados != "NADA") {
            template = `
              <tr>
                <td class="td_titulos"> Curp </td>
                <td class="td_titulos"> Tipo Integrante </td>
                <td class="td_titulos"> Integración</td>
              </tr>
            `;
            for(const resultado of resultados) {
              template += `
                <tr> 
                  <td class="td_cuerpos"> ${resultado.curp} </td>
                  <td class="td_cuerpos"> ${resultado.tipo_integrante} </td>
                  <td class="td_cuerpos"> ${resultado.integracion} </td>
                </tr>
              `;
            }
          }

          $('#consulta_administrador_grupo_integrantes').show();
          $('#consulta_administrador_grupo_integrantes').html(template);

        }
      }
    });
  }

  function generar_tabla_grupo_detalles_archivos_subidos(folio) {
    $.ajax({
      type: 'POST',
      url: '../controlador/administrador/ver-grupo-detalles-archivos.php',
      data: {folio: folio},
      success: function(response) {
        if(!response.error) {
          let resultados = JSON.parse(response);
          let template = '';
          
          if(resultados != "NADA") {
            template = `
            <tr>
              <td class="td_titulos">Documento</td>
              <td class="td_titulos">Fecha de Envío</td>
              <td class="td_titulos">Asunto</td>
              <td class="td_titulos">Enviado por</td>
              <td class="td_titulos">Revisión</td>
              <td class="td_titulos">Asunto</td>
            </tr>
          `;
            for(const resultado of resultados) {
              template += `
                <tr>
                  <td class="td_cuerpos"> <a href='../files/proyectos/${folio}/${resultado.documento}' target='_blank'>${resultado.documento}</a> </td>
                  <td class="td_cuerpos"> ${resultado.fecha_envio} </td>
                  <td class="td_cuerpos"> ${resultado.asunto} </td>
                  <td class="td_cuerpos"> ${resultado.enviado_por} </td>
                  <td class="td_cuerpos"> ${resultado.revision} </td>
                  <td class="td_cuerpos"> ${resultado.observacion} </td>
                </tr>
              `;
            }
          }

          $('#consulta_administrador_grupo_documentos').show();
          $('#consulta_administrador_grupo_documentos').html(template);

        }
      }
    });
  }

  /** INICIO EXPORTAR PDF */
  function generar_exportacion_pdf_usuario(curp) {
    $('#exportar_pdf_usuario').off('click');
    $('#exportar_pdf_usuario').on('click', function (){
      
      $('#btn_si_validar_usuario').hide();
      $('#btn_no_validar_usuario').hide();
      $('#btn_eliminar_usuario').hide();

      $('#exportar_pdf_usuario').hide();

      html2canvas(document.querySelector('#consulta_administrador_usuario_detalles')).then(canvas => {
        var img = canvas.toDataURL("image/png");
  
        let formData = new FormData();
        formData.append('imagen', img);

        $.ajax({
          url: '../controlador/administrador/guarda-img.php',
          type: 'POST',
          data: formData,
          cache: false,
          processData: false,
          contentType: false
        });
  
        crear_pdf_usuario(img, curp);
  
      })
  
      $('#btn_si_validar_usuario').show();
      $('#btn_no_validar_usuario').show();
      $('#btn_eliminar_usuario').show();

      $('#exportar_pdf_usuario').show();
  
    });
  }

  async function crear_pdf_usuario(img, curp) {
        
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage(PDFLib.PageSizes.Letter);

    const directorio1 = '../files/usuarios/' + curp + '/'+ curp +' - CURP.pdf';
    const directorio2 = '../files/usuarios/' + curp + '/'+ curp +' - RFC.pdf';
    const directorio3 = '../files/usuarios/' + curp + '/'+ curp +' - Credencial del INE.pdf';
    const directorio4 = '../files/usuarios/' + curp + '/'+ curp +' - Acta de Nacimiento.pdf';
    const directorio5 = '../files/usuarios/' + curp + '/'+ curp +' - Comprobante de domicilio.pdf';
    const directorio6 = '../files/usuarios/' + curp + '/'+ curp +' - Fotografías de tamaño infantil.pdf';
    const directorio7 = '../files/usuarios/' + curp + '/'+ curp +' - Currículo Vitae.pdf';
    const directorio8 = '../files/usuarios/' + curp + '/'+ curp +' - Recibo de Pago del Servicio de Incubación.pdf';

    if(urlexists(directorio1)) {
      const copiarPagina = await fetch(directorio1).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio2)) {
      const copiarPagina = await fetch(directorio2).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio3)) {
      const copiarPagina = await fetch(directorio3).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio4)) {
      const copiarPagina = await fetch(directorio4).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio5)) {
      const copiarPagina = await fetch(directorio5).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }
    
    if(urlexists(directorio6)) {
      const copiarPagina = await fetch(directorio6).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio7)) {
      const copiarPagina = await fetch(directorio7).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio8)) {
      const copiarPagina = await fetch(directorio8).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    const pngImage = await pdfDoc.embedPng(img);
    const pngDims = pngImage.scale(0.45);

    page.drawImage(pngImage, {
      x: ((page.getWidth() / 2) - (pngDims.width / 2)),
      y: ((page.getHeight() / 2) - (pngDims.height / 2)),
      width: pngDims.width,
      height: pngDims.height
    });
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    let pdfWindow = window.open("")
    pdfWindow.document.write(
      `<html>
        <head>
          <title>Información en PDF</title>
        </head>
        <iframe width='100%' height='100%' src='`+ encodeURI(pdfDataUri) + `'></iframe>
      </html>`
    )
    
  }


  function generar_exportacion_pdf_grupo(folio) {
    $('#exportar_pdf_grupo').off('click');
    $('#exportar_pdf_grupo').on('click', function (){
      
      $('#btn_si_validar_grupo').hide();
      $('#btn_no_validar_grupo').hide();
      $('#btn_eliminar_grupo').hide();

      $('#exportar_pdf_grupo').hide();

      html2canvas(document.querySelector('#consulta_administrador_grupo_detalles')).then(canvas => {
        var img = canvas.toDataURL("image/png");
  
        let formData = new FormData();
        formData.append('imagen', img);

        $.ajax({
          url: '../controlador/administrador/guarda-img.php',
          type: 'POST',
          data: formData,
          cache: false,
          processData: false,
          contentType: false
        });
  
        crear_pdf_grupo(img, folio);
  
      })
  
      $('#btn_si_validar_grupo').show();
      $('#btn_no_validar_grupo').show();
      $('#btn_eliminar_grupo').show();

      $('#exportar_pdf_grupo').show();
  
    });
  }


  async function crear_pdf_grupo(img, folio) {
        
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage(PDFLib.PageSizes.Letter);

    const directorio1 = '../files/proyectos/' + folio + '/'+ folio +' - Cotizaciones.pdf';
    const directorio2 = '../files/proyectos/' + folio + '/'+ folio +' - Planos.pdf';
    const directorio3 = '../files/proyectos/' + folio + '/'+ folio +' - Programa de Trabajo.pdf';
    const directorio4 = '../files/proyectos/' + folio + '/'+ folio +' - Plan de Negocio.pdf';
    const directorio5 = '../files/proyectos/' + folio + '/'+ folio +' - Plan de Mercadotecnia.pdf';
    const directorio6 = '../files/proyectos/' + folio + '/'+ folio +' - Proyecto de Extenso.pdf';
    const directorio7 = '../files/proyectos/' + folio + '/'+ folio +' - Estudios de Factibilidad Técnico.pdf';
    const directorio8 = '../files/proyectos/' + folio + '/'+ folio +' - Estudios de Factibilidad Económico.pdf';

    if(urlexists(directorio1)) {
      const copiarPagina = await fetch(directorio1).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio2)) {
      const copiarPagina = await fetch(directorio2).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio3)) {
      const copiarPagina = await fetch(directorio3).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio4)) {
      const copiarPagina = await fetch(directorio4).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio5)) {
      const copiarPagina = await fetch(directorio5).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }
    
    if(urlexists(directorio6)) {
      const copiarPagina = await fetch(directorio6).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio7)) {
      const copiarPagina = await fetch(directorio7).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    if(urlexists(directorio8)) {
      const copiarPagina = await fetch(directorio8).then(res => res.arrayBuffer());
      const pagina = await PDFLib.PDFDocument.load(copiarPagina);
      const [pegaPagina] = await pdfDoc.copyPages(pagina, [0]);
      pdfDoc.addPage(pegaPagina);
    }

    const pngImage = await pdfDoc.embedPng(img);

    page.drawImage(pngImage, {
      x: ((page.getWidth() / 2) - ((page.getWidth() - 50) / 2)),
      y: ((page.getHeight() / 2) - ((page.getHeight() - 50) / 2)),
      width: page.getWidth() -50,
      height: page.getHeight() -50
    });

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    let pdfWindow = window.open("")
    pdfWindow.document.write(
      `<html>
        <head>
          <title>Información en PDF</title>
        </head>
        <iframe width='100%' height='100%' src='`+ encodeURI(pdfDataUri) + `'></iframe>
      </html>`
    )
    
  }


  function urlexists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if(http.status != 404) {
      return true;
    } else {
      return false;
    }
  }

  /** FIN EXPORTAR PDF */

  /* FIN GRUPOS */

  /* FIN FUNCTIONS */

  /* FIN DOCUMENT READY */

});