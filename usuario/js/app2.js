$(document).ready( function() {
  /* INICIO */

  /* INICIO FUNCIONES VISTA */
  $('#formulario_consulta_usuario_grupo').hide();
  $('#formulario_registro_grupo').hide();
  $('#formulario_consulta_usuario_grupo_detalles').hide();
  $('#consulta_usuario_grupo_detalle').hide();
  $('#formulario_unirse_grupo').hide();
  $('#formulario_perfil_usuario').hide();
  $('#formulario_modificacion_grupo').hide();
  $('#formulario_modificacion_perfil').hide();

  $('#nav_inicio').on('click', function() {
    $('#formulario_bienvenida').animate({
      height: 'show'
    });
    $('#formulario_consulta_usuario_grupo').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo_detalles').animate({
      height: 'hide'
    });
    $('#formulario_registro_grupo').animate({
      height: 'hide'
    });
    $('#formulario_perfil_usuario').animate({
      height: 'hide'
    });
  });

  $('#nav_grupo').on('click', function() {
    $('#formulario_bienvenida').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo').animate({
      height: 'show'
    });
    $('#consulta_usuario_grupos').animate({
      height: 'show'
    });
    $('#formulario_unirse_grupo').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo_detalles').animate({height: 'hide'});
    $('#formulario_registro_grupo').animate({
      height: 'hide'
    });
    $('#formulario_perfil_usuario').animate({
      height: 'hide'
    });
  });
  
  $('#nav_grupo_registro_grupo').on('click', function() {
    $('#formulario_bienvenida').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo_detalles').animate({
      height: 'hide'
    });
    $('#formulario_unirse_grupo').animate({
      height: 'hide'
    });
    $('#formulario_registro_grupo').animate({
      height: 'show'
    });
    $('#formulario_perfil_usuario').animate({
      height: 'hide'
    });
    $('#et_nombre').focus();
  });

  $('#nav_grupo_ver_grupos').on('click', function () {
    $('#formulario_bienvenida').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo').animate({
      height: 'show'
    });
    $('#formulario_registro_grupo').animate({
      height: 'hide'
    });
    $('#formulario_perfil_usuario').animate({
      height: 'hide'
    });
    $('#formulario_modificacion_grupo').animate({
      height: 'hide'
    });
  })

  $('#nav_grupo_ver_grupos2').on('click', function () {
    $('#formulario_bienvenida').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo').animate({
      height: 'show'
    });
    $('#formulario_registro_grupo').animate({
      height: 'hide'
    });
    $('#formulario_perfil_usuario').animate({
      height: 'hide'
    });
    $('#formulario_modificacion_grupo').animate({
      height: 'hide'
    });
  })

  $('#nav_grupo_integracion_grupo').on('click', function () {
    $('#formulario_unirse_grupo').animate({
      height: 'show'
    });
    $('#formulario_consulta_usuario_grupo_detalles').animate({
      height: 'hide'
    });
  })

  $('#nav_perfil').on('click', function() {
    $('#formulario_bienvenida').animate({
      height: 'hide'
    });
    $('#formulario_consulta_usuario_grupo').animate({
      height: 'hide'
    });
    $('#formulario_registro_grupo').animate({
      height: 'hide'
    });
    $('#formulario_perfil_usuario').animate({
      height: 'show'
    });
  })

  $('#nav_salir').on('click', function() {
    $.ajax({
        url: '../controlador/inicial/cerrar-sesion.php',
        type: 'POST',
        success: function(response) {
          location.reload();
        }
    });
  });

  /* FIN FUNCIONES VISTAS */

  /* INICIO INICIALES DE PERFIL */

  generar_tabla_perfil();

  /* FIN INICIALES DE PERFIL */

  /* INICIO INICIALES DE GRUPO */

  generar_tabla_grupos_creados();
  generar_tabla_grupos_integrados();

  /* FIN INICIALES DE GRUPO */

  /* INICIO FUNCIONES USUARIO */

  function generar_tabla_perfil () {

    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/ver-perfil.php',
      success: function (response) {
        
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
          <tr><td class="td_cuerpos"> <button id="btn_modificar_perfil" class="formularios_subir_sin_sombra"><span class="icon-pencil"></span>MODIFICAR</button> </td></tr>`;

          $('#consulta_usuario_perfil').show();
          $('#consulta_usuario_perfil').html(template);

          generar_tabla_perfil_documentos();

          $('#btn_modificar_perfil').off('click');
          $('#btn_modificar_perfil').on('click', function () {

            $('#formulario_modificacion_perfil').show();
            $('#formulario_perfil_usuario').hide();

            $.ajax({
              type: 'POST',
              url: '../controlador/usuario/ver-perfil.php',
              success: function (response) {

                let resultado = JSON.parse(response);

                $('#etm_nombres').val(resultado.nombres);
                $('#etm_apellido_paterno').val(resultado.apellido_paterno);
                $('#etm_apellido_materno').val(resultado.apellido_materno);
                $('#etm_fecha_nacimiento').val(resultado.fecha_nacimiento);
                $('#etm_estado_civil').val(resultado.estado_civil);
                $("input[name=generor][value='"+resultado.genero+"']").prop("checked",true);
                $('#etm_rfc_homo_clave').val(resultado.rfchomoclave);
                $('#etm_domicilio1').val(resultado.domicilio);
                $('#etm_no_exterior1').val(resultado.no_exterior);
                $('#etm_no_interior1').val(resultado.no_interior);
                $('#etm_codigo_postal1').val(resultado.codigo_postal);
                $('#etm_colonia1').val(resultado.colonia);
                $('#etm_municipio1').val(resultado.municipio);
                $('#etm_estado1').val(resultado.estado);
                $('#etm_telefono_residencial1').val(resultado.telefono_residencial);
                $('#etm_telefono_celular').val(resultado.telefono_celular);
                $('#etm_ingreso_mensual_personal').val(resultado.ingresos_mensuales_personales);
                $('#etm_ingreso_mensual_familiar').val(resultado.ingresos_mensuales_familiares);

                const discapacidad = (resultado.discapacidad).split(', ');

                $("input[name=discapacidadr][value='"+discapacidad[0]+"']").prop("checked",true);
                $('#etm_discapacidad').val(discapacidad[1]);

                const dependientes = (resultado.dependientes_economicos).split(', ');

                $("input[name=dependientes_economicosr][value='"+dependientes[0]+"']").prop("checked",true);
                $("#etm_dependientes_economicos").val(dependientes[1]);
                
                $("input[name=jornada_laboralr][value='"+resultado.jornada_laboral+"']").prop("checked", true);

                $("#etm_correo1").val(resultado.correo_1);
                $("#etm_correo2").val(resultado.correo_2);
                $("#etm_grado_maximo_estudio").val(resultado.grado_maximo_estudio);
                $("#etm_especialidad").val(resultado.especialidad);
                $("#etm_institucion_egreso").val(resultado.institucion_egreso);
                $("#etm_fecha_egreso").val(resultado.fecha_egreso);

                $('#btn_mod_perfil').off('click');
                $('#btn_mod_perfil').on('click', function () {
                  
                  nombres = $("#etm_nombres").val();
                  apellido_paterno = $('#etm_apellido_paterno').val();
                  apellido_materno = $('#etm_apellido_materno').val();
                  fecha_nacimiento = $('#etm_fecha_nacimiento').val();
                  estado_civil = $('#etm_estado_civil').val();
                  genero = $('input:radio[name=generor]:checked').val();

                  discapacidad_si_no = $('input:radio[name=discapacidadr]:checked').val();
                  discapacidadr = $('#etm_discapacidad').val();

                  if(discapacidad_si_no[0] == "Si") discapacidad = discapacidad_si_no + ", " + discapacidadr; 
                  else discapacidad[0] = discapacidad_si_no; 
                  
                  rfchomoclave = $('#etm_rfc_homo_clave').val();
                  domicilio = $('#etm_domicilio1').val();
                  no_exterior = $('#etm_no_exterior1').val();
                  no_interior = $('#etm_no_interior1').val();
                  codigo_postal = $('#etm_codigo_postal1').val();
                  colonia = $('#etm_colonia1').val();
                  municipio = $('#etm_municipio1').val();
                  estado = $('#etm_estado1').val();
                  telefono_residencial = $('#etm_telefono_residencial1').val();
                  telefono_celular = $('#etm_telefono_celular').val();
                  ingresos_mensuales_personales = $('#etm_ingreso_mensual_personal').val();
                  ingresos_mensuales_familiares = $('#etm_ingreso_mensual_familiar').val();

                  dependientes_economicos_tipos = $('input:radio[name=dependientes_economicosr]:checked').val();
                  dependientes_economicosr = $('#etm_dependientes_economicos').val();

                  dependientes[0] = dependientes_economicos_tipos + ", " + dependientes_economicosr;

                  jornada_laboral = $('input:radio[name=jornada_laboralr]:checked').val();
                  correo1 = $('#etm_correo1').val();
                  correo2 = $('#etm_correo2').val();
                  grado_maximo_estudio = $('#etm_grado_maximo_estudio').val();
                  especialidad = $('#etm_especialidad').val();
                  institucion_egreso = $('#etm_institucion_egreso').val();
                  fecha_egreso = $('#etm_fecha_egreso').val();

                  $.ajax({
                    type: "POST",
                    url: "../controlador/usuario/modificar-perfil.php",
                    data: {
                      etm_nombres: nombres,
                      etm_apellido_paterno: apellido_paterno,
                      etm_apellido_materno: apellido_materno,
                      etm_fecha_nacimiento: fecha_nacimiento,
                      etm_estado_civil: estado_civil,
                      etm_genero: genero,
                      etm_discapacidad: discapacidad[0],
                      etm_rfchomoclave: rfchomoclave,
                      etm_domicilio: domicilio,
                      etm_no_exterior: no_exterior,
                      etm_no_interior: no_interior,
                      etm_codigo_postal: codigo_postal,
                      etm_colonia: colonia,
                      etm_municipio: municipio,
                      etm_estado: estado,
                      etm_telefono_residencial: telefono_residencial,
                      etm_telefono_celular: telefono_celular,
                      etm_ingresos_mensuales_personales: ingresos_mensuales_personales,
                      etm_ingresos_mensuales_familiares: ingresos_mensuales_familiares,
                      etm_dependientes_economicos: dependientes[0],
                      etm_jornada_laboral: jornada_laboral,
                      etm_correo_1: correo1,
                      etm_correo_2: correo2,
                      etm_grado_maximo_estudio: grado_maximo_estudio,
                      etm_especialidad: especialidad,
                      etm_institucion_egreso: institucion_egreso,
                      etm_fecha_egreso: fecha_egreso
                    },
                    success: function (response) { 
                      if(!response.error) {
                        Swal.fire({
                          background: "#000",
                          text: response,
                          title: "ATENCIÓN",
                          color: "#fff"
                        });

                        generar_tabla_perfil();

                      }
                    }
                  });

                  $('#formulario_modificacion_perfil').hide();
                  $('#formulario_perfil_usuario').show();

                });
              }
            });        

          });

        }
      }
    });

  }

  function generar_tabla_perfil_documentos () {

    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/ver-perfil-documentos.php',
      success: function (response) {
        
        let resultados = JSON.parse(response);
        let template = `
        <tr>
          <td class="td_titulos"> Documento </td>
          <td class="td_titulos"> Revisión </td>
          <td class="td_titulos"> Observaciones </td>
        </tr>`;

        if(resultados != "NADA") {
          for(const resultado of resultados) {
            template += `
            <tr>
              <td class="td_cuerpos"> ${resultado.asunto} </td>
              <td class="td_cuerpos"> ${resultado.revision} </td>
              <td class="td_cuerpos"> ${resultado.observacion} </td>
            </tr>
            `;
          }
        } else {
          template += `
          <tr>
            <td class="td_cuerpos"> NO HAY DOCUMENTOS </td>
          </tr>`;
        }

        $('#usuario_archivos_enviados').show();
        $('#usuario_archivos_enviados').html(template);

      }
    });

  }

  /* FIN FUNCIONES USUARIO */

  /* INICIO FUNCIONES GRUPOS */

  function generar_tabla_grupos_creados () {

    $.ajax({
      url: '../controlador/usuario/ver-grupos-creados.php',
      success: function (response) {
        if(!response.error) {
          
          let resultados = JSON.parse(response);
          let template = `
            <tr>
              <td class="td_titulos"> Folio </td>
              <td class="td_titulos"> Nombre </td>
              <td class="td_titulos"> Tipo </td>
              <td class="td_titulos"> Fecha registro</td>
              <td class="td_titulos"> Evaluación </td>
              <td class="td_titulos"> Razón </td>
            </tr>
            `;
          
          if(resultados != "NADA") {
            for(const resultado of resultados) {

              template += `
                <tr>
                  <td class="td_cuerpos"><a href="#" class="folio" folio=${resultado.folio}> ${resultado.folio} </a></td>
                  <td class="td_cuerpos"> ${resultado.nombre} </td>
                  <td class="td_cuerpos"> ${resultado.tipo_grupo} </td>
                  <td class="td_cuerpos"> ${resultado.fecha_registro} </td>
                  <td class="td_cuerpos"> ${resultado.estado_evaluado} </td>
                  <td class="td_cuerpos"> ${resultado.razon} </td>
                </tr>
              `;

            }

          } else template += `<tr> <td class="td_cuerpos" colspan="5"> No hay proyectos. </td> </tr>`; 

          $('#consulta_usuario_grupos').show();
          $('#consulta_usuario_grupos').html(template);
          
          $(document).off('click', '.folio');
          $(document).on('click', '.folio', (e) => {
              
            const element = document.activeElement;
            const folio = $(element).attr('folio');

            asignar_folio_btn_revision_grupo(folio);
            asignar_folio_btn_enviar_documento_grupo(folio);

            generar_tabla_grupo_detalles(folio);

          });

        }
      }
    });

  }

  function generar_tabla_grupos_integrados () {

    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/ver-grupos-integrado.php',
      success: function (response) {
        let resultados = JSON.parse(response);
        let template = `
        <tr>
          <td class="td_titulos">Folio</td>
          <td class="td_titulos">Nombre</td>
          <td class="td_titulos">Fecha registro</td>
          <td class="td_titulos">Evaluación</td>
          <td class="td_titulos">Razón</td>
          <td class="td_titulos">Integración</td>
        </tr>`;

        if(resultados != "NADA") {
          for(const resultado of resultados) {

            if(resultado.folio != undefined) {
              
              if(resultado.integracion == "ACEPTADA") template += `<tr> <td class="td_cuerpos"><a href="#" class="folio" folio="${resultado.folio}">${resultado.folio}</a></td>`;
              else template += `<tr><td class="td_cuerpos"> ${resultado.folio} </td>`
              
              template += `
                <td class="td_cuerpos"> ${resultado.nombre} </td>
                <td class="td_cuerpos"> ${resultado.fecha_registro} </td>
                <td class="td_cuerpos"> ${resultado.estado_evaluado} </td>
                <td class="td_cuerpos"> ${resultado.razon} </td>
                <td class="td_cuerpos"> ${resultado.integracion} </td>
              </tr>
              `;

            }

          }
        
        } else template += `<tr> <td class="td_cuerpos" colspan="6"> No hay proyectos. </td> </tr>` 

        $('#consulta_usuario_grupos_integrados').show();
        $('#consulta_usuario_grupos_integrados').html(template);

        $(document).on('click', '.folio', (e) => {
                  
          const element = document.activeElement;
          const folio = $(element).attr('folio');

          asignar_folio_btn_enviar_documento_grupo(folio);
          generar_tabla_grupo_detalles(folio);

        });

      }
    });

  }

  function generar_tabla_grupo_detalles (folio) {

    $.ajax({
      url: '../controlador/usuario/ver-grupo-detalles.php',
      data: {folio: folio},
      type: 'POST',
      success: function (response) {
        if(!response.error) {

          let resultado = JSON.parse(response);
          let template = '';

          if(resultado.folio != undefined) {
            if(resultado != "NADA") {

              template = `
                <tr><td class="td_titulos">Folio:</td><td class="td_cuerpos">${resultado.folio}</tr>
                <tr><td class="td_titulos">Nombre:</td><td class="td_cuerpos">${resultado.nombre}</tr>
                <tr><td class="td_titulos">RFC:</td><td class="td_cuerpos">${resultado.rfc}</tr>
                <tr><td class="td_titulos">Domicilio / Calle:</td><td class="td_cuerpos">${resultado.domicilio}</tr>
                <tr><td class="td_titulos">No. exterior:</td><td class="td_cuerpos">${resultado.no_exterior}</tr>
                <tr><td class="td_titulos">No. interior:</td><td class="td_cuerpos">${resultado.no_interior}</tr>
                <tr><td class="td_titulos">Código Postal:</td><td class="td_cuerpos">${resultado.codigo_postal}</tr>
                <tr><td class="td_titulos">Colonia:</td><td class="td_cuerpos">${resultado.colonia}</tr>
                <tr><td class="td_titulos">Municipio:</td><td class="td_cuerpos">${resultado.municipio}</tr>
                <tr><td class="td_titulos">Estado:</td><td class="td_cuerpos">${resultado.estado}</tr>
                <tr><td class="td_titulos">Telefono Residencial:</td><td class="td_cuerpos">${resultado.telefono_residencial}</tr>
                <tr><td class="td_titulos">Fax:</td><td class="td_cuerpos">${resultado.fax}</tr>
                <tr><td class="td_titulos">Correo:</td><td class="td_cuerpos">${resultado.correo}</tr>
                <tr><td class="td_titulos">Página Web:</td><td class="td_cuerpos">${resultado.web}</tr>
                <tr><td class="td_titulos">Tipo:</td><td class="td_cuerpos">${resultado.tipo_grupo}</tr>
                <tr><td class="td_titulos">Fecha de registro:</td><td class="td_cuerpos">${resultado.fecha_registro}</tr>
                <tr><td class="td_titulos">Nombre tentativo o definitivo del negocio:</td><td class="td_cuerpos">${resultado.respuesta1}</tr>
                <tr><td class="td_titulos">¿Cuál es la necesidad que has detectado y quieres satisfacer o resolver generando algún producto o servicio?</td><td class="td_cuerpos">${resultado.respuesta2}</tr>
                <tr><td class="td_titulos">¿Cuál es la innovación de tu producto(s) y servicio(s) para satisfacer la necesidad detectada?</td><td class="td_cuerpos">${resultado.respuesta3}</tr>
                <tr><td class="td_titulos">¿Donde pretenden ubicar el proyecto y cuál es el alcance geográfico de su mercado?</td><td class="td_cuerpos">${resultado.respuesta4}</tr>
                <tr><td class="td_titulos">¿Cuál es la ventaja competitiva de tu producto y/o servicio (ventajas geográficas, productivas, tecnológicas, técnicas, logísticas, financieras, organizacionales, patrimoniales y legales)?</td><td class="td_cuerpos">${resultado.respuesta5}</tr>
                <tr><td class="td_titulos">¿Qué experiencia práctica y profesional tienes tu, tu socio y la familia de tu socio en el tipo de mercado donde piensan ofrecer los producto(s) o servicio(s) qué describes?</td><td class="td_cuerpos">${resultado.respuesta6}</tr>
                <tr><td class="td_titulos">¿Qué experiencia empresarial tienes tú. tu socio y la familia de tu socio?</td><td class="td_cuerpos">${resultado.respuesta7}</tr>
                <tr><td class="td_titulos">¿Qué te motiva a crear tu propia empresa?</td><td class="td_cuerpos">${resultado.respuesta8}</tr>
                <tr><td class="td_titulos">¿Cuál es la motivación de tu socio?</td><td class="td_cuerpos">${resultado.respuesta9}</tr>
                <tr><td class="td_titulos">¿Cuál es el objetivo del proyecto?</td><td class="td_cuerpos">${resultado.respuesta10}</tr>
                <tr><td class="td_titulos">Evaluado:</td><td class="td_cuerpos">${resultado.estado_evaluado}</tr>
                <tr><td class="td_titulos">Razón:</td><td class="td_cuerpos">${resultado.razon}</tr>
                <tr><td class="td_cuerpos" colspan=2><button class="formularios_subir_sin_sombra" id="btn_modificar_grupo_detalles"><span class="icon-pencil"></span>MODIFICAR</button></td></tr>`;
              
              generar_tabla_grupo_integrantes(folio);
              generar_tabla_grupo_documentos(folio);
  
            } else template = `<tr> <td class="td_cuerpos"> INFORMACIÓN NO DISPONIBLE </td></tr>`;
          } else template = `<tr> <td class="td_cuerpos"> INFORMACIÓN NO DISPONIBLE </td></tr>`;
          
          
          $('#formulario_consulta_usuario_grupo_detalles').show();
          $('#formulario_unirse_grupo').hide();

          $('#consulta_usuario_grupo_detalle').show();
          $('#consulta_usuario_grupo_detalle').html(template);

          asignar_folio_btn_modificar_grupo_detalles(folio);

        }
      }
    });

  }

  function generar_tabla_grupo_integrantes (folio) {

    $(document).off('click', '.aceptar_ingreso');
    $(document).off('click', '.rechazar_ingreso');

    $.ajax({
      url: '../controlador/usuario/ver-grupo-integrantes.php',
      data: {folio: folio},
      type: 'POST',
      success: function(response) {
        if(!response.error) { 
          
          let template = '';
          let resultados = JSON.parse(response);

          if(resultados[0].integracion != undefined)
            template = `
            <tr>
              <td class="td_titulos"> Curp </td>
              <td class="td_titulos"> Validado </td>
              <td class="td_titulos"> Integracion </td>
              <td class="td_titulos">  </td>
            </tr>
            `;
          else 
            template = `
            <tr><td class="td_titulos"> Curp </td>
                <td class="td_titulos"> Validado </td></tr>
            `;
          
          if(resultados != "NOPE") {
            if(resultados != "NADA") {
              for(const resultado of resultados) {
  
                if(resultados[0].integracion != undefined) {
  
                  template += `
                    <tr>
                      <td class="td_cuerpos"> ${resultado.curp} </td>
                      <td class="td_cuerpos"> ${resultado.validado} </td>
                      <td class="td_cuerpos"> ${resultado.integracion} </td>
                      <td>
                  `;
  
                  if(resultado.integracion == "ESPERA")  template += `<button curp="${resultado.curp}" class="aceptar_ingreso"> <span class="icon-checkmark"></span></button>`;
                  
                  template += `<button curp="${resultado.curp}" class="rechazar_ingreso"> <span class="icon-cross"></span></button></td></tr>`;
  
                } else template += `
                <tr> 
                  <td class="td_cuerpos"> ${resultado.curp} </td>
                  <td class="td_cuerpos"> ${resultado.validado} </td> 
                </tr>`;
  
              }
  
            } else template += `
                <tr>
                  <td class="td_cuerpos"> No hay integrantes. </td>
                </tr>`;
          } else template = `
            <tr>
              <td class="td_cuerpos"> INFORMACIÓN NO DISPONIBLE </td>
            </tr>`;
          
          $('#consulta_usuario_grupo_detalle_intengrantes').show();
          $('#consulta_usuario_grupo_detalle_intengrantes').html(template);

          $(document).on('click', '.aceptar_ingreso', (e) => {
            
            const element = document.activeElement;
            const curp =  $(element).attr('curp');
            const integracion = "ACEPTADA";

            $.ajax({
              type: 'POST',
              data: {folio: folio, curp: curp, integracion: integracion},
              url: '../controlador/usuario/seleccion-integracion-grupo.php',
              success: function (response) {
                if(!response.error) {

                  generar_tabla_grupo_integrantes(folio);

                }
              }
            })

          });

          $(document).on('click', '.rechazar_ingreso', (e) => {
          
            const element = document.activeElement;
            const curp =  $(element).attr('curp');
            const integracion = "RECHAZADA";

            $.ajax({
              type: 'POST',
              data: {folio: folio, curp: curp, integracion: integracion},
              url: '../controlador/usuario/seleccion-integracion-grupo.php',
              success: function (response) {
                if(!response.error) {

                  generar_tabla_grupo_integrantes(folio);

                }
              }
            })

          });

        }
      }
    });

  }

  function generar_tabla_grupo_documentos(folio) {
    
    $.ajax({
      type: 'POST',
      data: {folio: folio},
      url: '../controlador/usuario/ver-grupo-documentos.php',
      success: function (response) {
        let resultados = JSON.parse(response);
        let template = `
        <tr>
          <td class="td_titulos"> Documento </td>
          <td class="td_titulos"> Fecha envio </td>
          <td class="td_titulos"> Revisión </td>
          <td class="td_titulos"> Observación </td>
          <td class="td_titulos"> Enviado por </td>
          <td class="td_titulos">  </td>
        </tr>`;

        if(resultados != "NADA") {
          if(resultados != undefined) {
            for(const resultado of resultados) {
              template += `
              <tr>
                <td class="td_cuerpos">${resultado.asunto}</td>
                <td class="td_cuerpos">${resultado.fecha_envio}</td>
                <td class="td_cuerpos">${resultado.revision}</td>
                <td class="td_cuerpos">${resultado.observacion}</td>
                <td class="td_cuerpos">${resultado.enviado_por}</td>
                <td class="td_cuerpos"><button folio="${resultado.folio}" asunto="${resultado.asunto}" class="eliminar_documento"> <span class="icon-bin"></span> </button></td> 
              </tr>`;
            }

          } else template +=
          `<tr>
            <td class="td_cuerpos" colspan=6> NO HAY DOCUMENTOS </td>
          </tr>`;
        } else template += 
        `<tr>
          <td class="td_cuerpos" colspan=6> NO HAY DOCUMENTOS </td>
        </tr>`

        $('#consulta_usuario_grupo_detalle_documentacion_subida').show();
        $('#consulta_usuario_grupo_detalle_documentacion_subida').html(template);
        
        $(document).off('click', '.eliminar_documento');
        $(document).on('click', '.eliminar_documento',  (e) => {
        const element = document.activeElement;
        const folio = $(element).attr('folio');
        const asunto = $(element).attr('asunto');
        $.ajax({
          type: 'POST',
          data: {folio: folio, asunto: asunto},
          url: '../controlador/usuario/eliminar-documento-grupo.php',
          success: function(response) {
            Swal.fire({
              title: "ATENCIÓN",
              text: response,
              background: "#000",
              color: "#fff"
            });
            
            generar_tabla_grupo_documentos(folio);

          }
        });
        });

      }
    });

  }

  function asignar_folio_btn_revision_grupo (folio) {

    $('#btn_revision_grupo').on('click', function () {
      $.ajax({
        type: 'POST',
        url: '../controlador/usuario/revision-grupo.php',
        data: {folio: folio},
        success: function (response) {
          
          Swal.fire({
            title: 'ATENCIÓN',
            text: response,
            background: "#000",
            color: '#fff'
          });

          generar_tabla_grupos_creados();
          generar_tabla_grupo_detalles(folio);

        }
      })
    });

  }

  function asignar_folio_btn_enviar_documento_grupo (folio) {

    $('#enviar_archivo_grupo').off('click');
    $('#enviar_archivo_grupo').on('click', function () {

      const input_documento = $("#subir_archivo_grupo")[0];
      const asunto = $('#subir_archivo_grupo_asunto').val();
      let documento = input_documento.files[0];
  
      let formData = new FormData();
      formData.append('subir_archivo_grupo_asunto', asunto); 
      formData.append('documento', documento);
      formData.append('et_folio', folio);
  
      $.ajax({
        url: "../controlador/usuario/subir-archivos-grupo.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          Swal.fire({
            title: 'ATENCIÓN',
            color: "#fff",
            text: response,
            background: "#000"
          });
          generar_tabla_grupo_documentos(folio);
        }
      });
    });

  }

  function asignar_folio_btn_modificar_grupo_detalles (folio) {
    $('#btn_modificar_grupo_detalles').off('click');
    $('#btn_modificar_grupo_detalles').on('click', function () {

      // console.log("Estoy en ello.");
      // Swal.fire({
      //   title: "ATENCION",
      //   text: "En desarrollo.",
      //   background: "#000",
      //   color: "#fff"
      // });

      $.ajax({
        type: 'POST',
        url: '../controlador/usuario/ver-grupo-detalles.php',
        data: {folio: folio},
        success: function (response) {
          let resultado = JSON.parse(response);
          
          if(resultado != "NADA") {

            /* DATOS PROYECTO */
  
            $('#etm_nombre').val(resultado.nombre);
            $('#etm_rfc').val(resultado.rfc);
            $('#etm_domicilio').val(resultado.domicilio);
            $('#etm_no_exterior').val(resultado.no_exterior);
            $('#etm_no_interior').val(resultado.no_interior);
            $('#etm_codigo_postal').val(resultado.codigo_postal);
            $('#etm_colonia').val(resultado.colonia);
            $('#etm_municipio').val(resultado.municipio);
            $('#etm_estado').val(resultado.estado);
            $('#etm_telefono_residencial').val(resultado.telefono_residencial);
            $('#etm_fax').val(resultado.fax);
            $('#etm_correo').val(resultado.correo);
            $('#etm_web').val(resultado.web);
            $('#etm_tipo_grupo').val(resultado.tipo_grupo);

            /* DESCRIPCIÓN PROYECTO */

            $('#etm_respuesta1').val(resultado.respuesta1);
            $('#etm_respuesta2').val(resultado.respuesta2);
            $('#etm_respuesta3').val(resultado.respuesta3);
            $('#etm_respuesta4').val(resultado.respuesta4);
            $('#etm_respuesta5').val(resultado.respuesta5);
            $('#etm_respuesta6').val(resultado.respuesta6);
            $('#etm_respuesta7').val(resultado.respuesta7);
            $("input[name=etm_respuesta8][value='"+resultado.respuesta8+"']").prop("checked",true);
            $("input[name=etm_respuesta9][value='"+resultado.respuesta9+"']").prop("checked",true);
            $('#etm_respuesta10').val(resultado.respuesta10);
            
            $('#modificar_grupo').off('click');
            $('#modificar_grupo').on('click', function () {
              /* DATOS GRUPO */

               nombre = $('#etm_nombre').val();
               rfc = $('#etm_rfc').val();
               domicilio = $('#etm_domicilio').val();
               no_exterior = $('#etm_no_exterior').val();
               no_interior = $('#etm_no_interior').val();
               codigo_postal = $('#etm_codigo_postal').val();
               colonia = $('#etm_colonia').val();
               municipio = $('#etm_municipio').val();
               estado = $('#etm_estado').val();
               telefono_residencial = $('#etm_telefono_residencial').val();
               fax = $('#etm_fax').val();
               correo = $('#etm_correo').val();
               web = $('#etm_web').val();
               tipo_grupo = $('#etm_tipo_grupo').val();

              /* DESCRIPCION GRUPO */

              respuesta1 = $('#etm_respuesta1').val();
              respuesta2 = $('#etm_respuesta2').val();
              respuesta3 = $('#etm_respuesta3').val();
              respuesta4 = $('#etm_respuesta4').val();
              respuesta5 = $('#etm_respuesta5').val();
              respuesta6 = $('#etm_respuesta6').val();
              respuesta7 = $('#etm_respuesta7').val();
              respuesta8 = $('input:radio[name=etm_respuesta8]:checked').val();
              respuesta9 = $('input:radio[name=etm_respuesta9]:checked').val();
              respuesta10 = $('#etm_respuesta10').val();

              $.ajax({
                type: 'POST',
                url: '../controlador/usuario/modificar-grupo.php',
                data: {
                  folio: folio,
                  nombre: nombre,
                  et_rfc: rfc,
                  et_domicilio: domicilio,
                  et_no_exterior: no_exterior,
                  et_no_interior: no_interior,
                  et_codigo_postal: codigo_postal,
                  et_colonia: colonia,
                  et_municipio: municipio,
                  et_estado: estado,
                  et_telefono_residencial: telefono_residencial,
                  et_fax: fax,
                  et_correo: correo,
                  et_web: web,
                  et_tipo_grupo: tipo_grupo,
                  et_respuesta1: respuesta1,
                  et_respuesta2: respuesta2,
                  et_respuesta3: respuesta3,
                  et_respuesta4: respuesta4,
                  et_respuesta5: respuesta5,
                  et_respuesta6: respuesta6,
                  et_respuesta7: respuesta7,
                  et_respuesta8: respuesta8,
                  et_respuesta9: respuesta9,
                  et_respuesta10: respuesta10
                },
                success: function (response) {
                  if(!response.error) { 
                    
                    Swal.fire({
                      title: "ATENCIÓN",
                      text: response,
                      background: "#000",
                      color: "#fff"
                    });

                    $('#formulario_consulta_usuario_grupo_detalles').show();
                    $('#formulario_modificacion_grupo').hide();

                    generar_tabla_grupo_detalles(folio);
                    generar_tabla_grupos_creados();
                    generar_tabla_grupos_integrados();

                  }
                }
              });
            });

            $('#formulario_consulta_usuario_grupo_detalles').hide();
            $('#formulario_modificacion_grupo').show();
  
          } else 
            Swal.fire({
              title: "ATENCION",
              text: "Error: " + response,
              background: "#000",
              color: "#fff"
            });
        }
      });

    });

  }


  /* FIN FUNCIONES GRUPOS */

  /* INICIO ACTIONLISTENERS DE LOS BOTONES EN PERFIL */

  $('#enviar_archivo_perfil').on('click', function() {
    
    const input_file = $('#subir_archivo_perfil')[0];
    const asunto = $('#subir_archivo_perfil_asunto').val();
    let documento = input_file.files[0];

    let formData = new FormData();
    formData.append('subir_archivo_perfil_asunto', asunto);
    formData.append('documento', documento);

    $.ajax({
      url: '../controlador/usuario/subir-archivos-perfil.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {

        Swal.fire({
          title: 'ATENCIÓN',
          color: '#fff',
          text: response,
          background: "#000"
        });

        generar_tabla_perfil_documentos();

      }
    });

  });

  $('#btn_revision_perfil').on('click', function () {
    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/revision-perfil.php',
      success: function(response) {
        Swal.fire({
          title: "ATENCIÓN",
          color: "#fff",
          text: response,
          background: "#000"
        });
        
        generar_tabla_perfil();

      }
    });
  });

  /* FIN ACTIONLISTENERS DE LOS BOTONES EN PERFIL */

  /* INICIO ACTIONLISTENERS DE LOS BOTONES EN GRUPO */

  $('#registro_grupo').on('click', function () {
    nombre = $('#et_nombre').val();
    rfc = $('#et_rfc').val();
    domicilio = $('#et_domicilio').val();
    no_exterior = $('#et_no_exterior').val();
    no_interior = $('#et_no_interior').val();
    codigo_postal = $('#et_codigo_postal').val();
    colonia = $('#et_colonia').val();
    municipio = $('#et_municipio').val();
    estado = $('#et_estado').val();
    telefono_residencial = $('#et_telefono_residencial').val();
    fax = $('#et_fax').val();
    correo = $('#et_correo').val();
    web = $('#et_web').val();
    tipo_grupo = $('#et_tipo_grupo').val();
    respuesta1 = $('#et_respuesta1').val();
    respuesta2 = $('#et_respuesta2').val();
    respuesta3 = $('#et_respuesta3').val();
    respuesta4 = $('#et_respuesta4').val();
    respuesta5 = $('#et_respuesta5').val();
    respuesta6 = $('#et_respuesta6').val();
    respuesta7 = $('#et_respuesta7').val();
    respuesta8 = $('input:radio[name=et_respuesta8]:checked').val();
    respuesta9 = $('input:radio[name=et_respuesta9]:checked').val();
    respuesta10 = $('#et_respuesta10').val();
    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/registrar-grupo.php',
      data: {
        et_nombre: nombre,
        et_rfc: rfc,
        et_domicilio: domicilio,
        et_no_exterior: no_exterior,
        et_no_interior: no_interior,
        et_codigo_postal: codigo_postal,
        et_colonia: colonia,
        et_municipio: municipio,
        et_estado: estado,
        et_telefono_residencial: telefono_residencial,
        et_fax: fax,
        et_correo: correo,
        et_web: web,
        et_tipo_grupo: tipo_grupo,
        et_respuesta1: respuesta1,
        et_respuesta2: respuesta2,
        et_respuesta3: respuesta3,
        et_respuesta4: respuesta4,
        et_respuesta5: respuesta5,
        et_respuesta6: respuesta6,
        et_respuesta7: respuesta7,
        et_respuesta8: respuesta8,
        et_respuesta9: respuesta9,
        et_respuesta10: respuesta10
      },
      success: function (response) {
        if(!response.error) {
          Swal.fire({
            title: "ATENCIÓN",
            color: "#fff",
            text: response,
            background: "#000"
          });
         generar_tabla_grupos_creados();
        }
      }
    })
  });

  $('#registro_integracion').on('click', function () {
    folio = $('#et_integracion_folio').val();
    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/unirse-grupo.php',
      data: {folio: folio},
      success: function (response) {
        $('#formulario_unirse_grupo').animate({
          height: 'hide'
        });
        Swal.fire({
          title: "ATENCIÓN",
          color: "#fff",
          text: response,
          background: "#000"
        });

        generar_tabla_grupos_integrados();

      }
    });
  });

  /* FIN ACTIONLISTENERS DE LOS BOTONES EN GRUPO*/

  /* FIN */
});