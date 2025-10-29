$(document).ready(function() {

  $('#formulario_consulta_usuario_grupo').hide();
  $('#formulario_registro_grupo').hide();
  $('#formulario_consulta_usuario_grupo_detalles').hide();
  $('#consulta_usuario_grupo_detalle').hide();
  $('#formulario_unirse_grupo').hide();
  $('#formulario_perfil_usuario').hide();

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

  $('#enviar_archivo_perfil').on('click', function() {
    const input_documento = $('#subir_archivo_perfil')[0];
    const asunto = $('#subir_archivo_perfil_asunto').val();
    let documento = input_documento.files[0];

    let formData = new FormData();
    formData.append("subir_archivo_perfil_asunto", asunto)
    formData.append("documento", documento);

    console.log(formData.get("subir_archivo_perfil_asunto"));

    $.ajax({
      url: "../controlador/usuario/subir-archivos-perfil.php",
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

        $.ajax({
          type: 'POST',
          url: '../controlador/usuario/ver-perfil-documentos.php',
          success: function(response) {
            if(!response.error) {
              generar_tabla_archivos_perfil(response);
            }
          }
        });

      }
    });
  });
  
  $.ajax({
    url: "../controlador/usuario/ver-perfil.php",
    success: function (response) {
      if(!response.error) {
        generar_tabla_perfil(response);
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: '../controlador/usuario/ver-perfil-documentos.php',
    success: function(response) {
      if(!response.error) {
        generar_tabla_archivos_perfil(response);
      }
    }
  });

  $.ajax({
    url: "../controlador/usuario/ver-grupos-creados.php",
    success: function (response) {
      if(!response.error) {
        generar_tabla_grupos_creados(response);
      }
    }
  });
  
  $.ajax({
    type: 'POST',
    url: '../controlador/usuario/ver-grupos-integrado.php',
    success: function(response) {
      if(!response.error) {
        generar_tabla_grupos_integrados(response);
      }
    }
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
        $.ajax({
          url: "../controlador/usuario/ver-perfil.php",
          success: function (response) {
            if(!response.error) {
              generar_tabla_perfil(response);
            }
          }
        });
      }
    });
  });

  $('#registro_integracion').on('click', function () {
    folio = $('#et_integracion_folio').val();
    $.ajax({
      type: 'POST',
      url: '../controlador/usuario/unirse-grupo.php',
      data: {folio_grupo: folio},
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
        $.ajax({
          type: 'POST',
          url: '../controlador/usuario/ver-grupos-integrado.php',
          success: function(response) {
            if(!response.error) {
              generar_tabla_grupos_integrados(response);
            }
          }
        });
      }
    });
  });

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
          $.ajax({
            url: "../controlador/usuario/ver-grupos-creados.php",
            success: function (response) {
              if(!response.error) {
                generar_tabla_grupos_creados(response);
              }
            }
          });
        }
      }
    })
  });

  /* inicio functions =================================================================================== */


  function generar_tabla_perfil(response) {
    let resultado_perfil = JSON.parse(response);
    let template= '';
    if(resultado_perfil != "NADA") {
        template= `
          <tr><td class="td_titulos">Nombres:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.nombres} </td></tr>
          <tr><td class="td_titulos">Ap. Paterno:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.apellido_paterno} </td></tr>
          <tr><td class="td_titulos">Ap. Materno:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.apellido_materno} </td></tr>
          <tr><td class="td_titulos">Fecha Nacimiento:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.fecha_nacimiento} </td></tr>
          <tr><td class="td_titulos">Estado Civil:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.estado_civil} </td></tr>
          <tr><td class="td_titulos">Genero:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.genero} </td></tr>
          <tr><td class="td_titulos">Discapacidad</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.discapacidad} </td></tr>
          <tr><td class="td_titulos">RFC con Homo Clave:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.rfchomoclave} </td></tr>
          <tr><td class="td_titulos">CURP:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.curp} </td></tr>
          <tr><td class="td_titulos">Domicilio:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.domicilio} </td></tr>
          <tr><td class="td_titulos">No. Exterior:</td><td class="td_cuerpos"> ${resultado_perfil.no_exterior} </td>
              <td class="td_titulos">No. Interior:</td><td class="td_cuerpos"> ${resultado_perfil.no_interior} </td>
              <td class="td_titulos">Código Postal:</td><td class="td_cuerpos"> ${resultado_perfil.codigo_postal} </td></tr>
          <tr><td class="td_titulos">Colonia:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.colonia} </td></tr>
          <tr><td class="td_titulos">Estado:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.estado} </td></tr>
          <tr><td class="td_titulos">Municipio:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.municipio} </td></tr>
          <tr><td class="td_titulos">Telefono Residencial:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.telefono_residencial} </td></tr>
          <tr><td class="td_titulos">Telefono Celular:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.telefono_celular} </td></tr>
          <tr><td class="td_titulos">Ingresos Mes. Personales:</td><td class="td_cuerpos"> ${resultado_perfil.ingresos_mensuales_personales} </td>
              <td class="td_titulos">Ingresos Mes. Familiares:</td><td class="td_cuerpos"> ${resultado_perfil.ingresos_mensuales_familiares} </td>
              <td class="td_titulos">Dependientes Economicos:</td><td class="td_cuerpos"> ${resultado_perfil.dependientes_economicos} </td></tr>
          <tr><td class="td_titulos">Jornada Laboral: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.jornada_laboral} </td></tr>
          <tr><td class="td_titulos">Correo #1:</td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.correo_1} </td></tr>
          <tr><td class="td_titulos">Correo #2: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.correo_2} </td></tr>
          <tr><td class="td_titulos">Grado Máximo de Estudio: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.grado_maximo_estudio} </td></tr>
          <tr><td class="td_titulos">Especialidad: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.especialidad} </td></tr>
          <tr><td class="td_titulos">Institución de Egreso: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.institucion_egreso} </td></tr>
          <tr><td class="td_titulos">Fecha de Egreso: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.fecha_egreso} </td></tr>
          <tr><td class="td_titulos">Validado: </td><td class="td_cuerpos" colspan="6"> ${resultado_perfil.validado} </td></tr>
        `;
      $('#consulta_usuario_perfil').show();
      $('#consulta_usuario_perfil').html(template);
    }
  }

  function generar_tabla_grupos_creados(response) {
    let resultados = JSON.parse(response);
    let template = `
    <tr>
      <td class="td_titulos">Folio</td>
      <td class="td_titulos">Nombre</td>
      <td class="td_titulos">Tipo</td>
      <td class="td_titulos">Fecha Registro</td>
      <td class="td_titulos">Evaluación</td>
      <td class="td_titulos">Razón</td>
    </tr>
    `;
    if(resultados != "NADA") {
      for(const resultado of resultados) {
        if(resultados[0].folio != undefined) {
          template += `
              <tr>
                <td class="td_cuerpos"><a href="#" class="folio_grupos" folioGrupo=${resultado.folio}> ${resultado.folio} </a></td>
                <td class="td_cuerpos">${resultado.nombre}</td>
                <td class="td_cuerpos">${resultado.tipo_grupo}</td>
                <td class="td_cuerpos">${resultado.fecha_registro}</td>
                <td class="td_cuerpos">${resultado.estado_evaluado}</td>
                <td class="td_cuerpos">${resultado.razon}</td>
              </tr>
          `;
        }
      }
      $(document).on('click','.folio_grupos', (e) => {
        const element = document.activeElement;
        const id = $(element).attr('folioGrupo');
        $(document).off('click','.aceptar_ingreso');
        $(document).off('click','.rechazar_ingreso');
        $(document).off('click','.eliminar_documento');
        $('#btn_revision_grupo').off('click');

        asignar_folio_boton_revision(id);
        enviar_documento_grupo_boton(id);

        /* para enviar documentos desde un perfil aceptado por el proyecto */
        /* y generar la tabla de los archivos enviados para el proyecto */
        $.ajax({
          url: "../controlador/usuario/ver-grupo-detalles.php",
          data: {folio_grupo: id},
          type: "POST",
          success: function (response) {
            if(!response.error) generar_tabla_grupo_detalles(response);
            
            $.ajax({
              url: "../controlador/usuario/ver-grupo-integrantes.php",
              data: {folio_grupo: id},
              type: "POST",
              success: function (response) {
                if(!response.error) generar_tabla_grupo_integrantes(id, response);
              }
            });

            $.ajax({
              type: 'POST',
              data: {folio : id},
              url: '../controlador/usuario/ver-grupo-documentos.php',
              success: function(response) {
                if(!response.error)  generar_tabla_archivos_grupo(response);
              }
            });

          }
        });
      });

    } else {
      template += '<tr> <td class="celda_vacia" colspan="6">No hay proyectos.</td> </tr>';
    }
    $('#consulta_usuario_grupos').show();
    $('#consulta_usuario_grupos').html(template);
  }

  function generar_tabla_grupos_integrados(response) {
    let resultados_grupo_integrado = JSON.parse(response); 
    let template_grupo_integrado = `
      <tr>
        <td class="td_titulos">Folio</td>
        <td class="td_titulos">Nombre</td>
        <td class="td_titulos">Fecha Registro</td>
        <td class="td_titulos">Evaluación</td>
        <td class="td_titulos">Razón</td>
        <td class="td_titulos">Integración</td>
      </tr>
    `;
    if(resultados_grupo_integrado != "NADA") {
      for(const resultado of resultados_grupo_integrado) {
        if(resultado.folio != undefined) {
          template_grupo_integrado += `
            <tr>`;
          if(resultado.integracion == "ACEPTADA") {
            template_grupo_integrado += `<td class="td_cuerpos"><a href="#" class="folio_grupos" folioGrupo=${resultado.folio}>${resultado.folio}</a></td>`
          } else {
            template_grupo_integrado += `<td class="td_cuerpos">${resultado.folio}</td>`;
          }
          template_grupo_integrado +=`
              <td class="td_cuerpos">${resultado.nombre}</td>
              <td class="td_cuerpos">${resultado.fecha_registro}</td>
              <td class="td_cuerpos">${resultado.estado_evaluado}</td>
              <td class="td_cuerpos">${resultado.razon}</td>
              <td class="td_cuerpos">${resultado.integracion}</td>
            </tr>
          `;
        }
      }
      $(document).on('click','.folio_grupos', (e) => {
        const element = document.activeElement;
        const id = $(element).attr('folioGrupo');

        $.ajax({
          url: "../controlador/usuario/ver-grupo-detalles.php",
          data: {folio_grupo: id},
          type: "POST",
          success: function (response) {
            if(!response.error) generar_tabla_grupo_detalles(response);
          }
        });

        $.ajax({
          url: "../controlador/usuario/ver-grupo-integrantes.php",
          data: {folio_grupo: id},
          type: "POST",
          success: function (response) {
            if(!response.error) generar_tabla_grupo_integrantes(id, response);
          }
        });

        $.ajax({
          type: 'POST',
          data: {folio : id},
          url: '../controlador/usuario/ver-grupo-documentos.php',
          success: function(response) {
            if(!response.error)  generar_tabla_archivos_grupo(response);
          }
        });

      });
    } else {
      template_grupo_integrado += '<tr> <td class="celda_vacia" colspan="6">No hay proyectos.</td> </tr>';
    }
    
    
  }

  function generar_tabla_grupo_integrantes (id, response_inicial) {
    $(document).off('click','.aceptar_ingreso');
    $(document).off('click','.rechazar_ingreso');
    if(!response_inicial.error) {
      let template_integrantes = '';
      let resultados_integrantes = JSON.parse(response_inicial);
      if(resultados_integrantes != 'DESO') {
        if(resultados_integrantes != "NOPE") {
          if(resultados_integrantes[0].validado != undefined) {
            template_integrantes = `
              <tr> 
                <td class="td_titulos"> Curp </td>
                <td class="td_titulos"> Validado </td>
                <td class="td_titulos"> Integracion </td>
                <td class="td_titulos"> </td> 
              </tr>
            `;
          } else {
            template_integrantes = `
              <tr> <td class="td_titulos"> Curp </td> </tr>
              <tr> <td class="td_titulos"> Validado </td></tr>
            `;
          }
          if(resultados_integrantes != "NADA") {
            for(const resultado_integrantes of resultados_integrantes) {
              if(resultados_integrantes[0].curp != undefined) {
                if(resultados_integrantes[0].validado != undefined) {
                  template_integrantes += `
                  <tr> 
                    <td class="td_cuerpos"> ${resultado_integrantes.curp} </td>
                    <td class="td_cuerpos"> ${resultado_integrantes.validado} </td>
                    <td class="td_cuerpos"> ${resultado_integrantes.integracion} </td>
                    <td>
                `;
                if(resultado_integrantes.integracion == 'ESPERA') {
                  template_integrantes += `
                    <input type="button" curpIntegrante="${resultado_integrantes.curp}" class="aceptar_ingreso" value="ACEPTAR">
                  `;
                }
                template_integrantes += `
                  <input type="button" curpIntegrante="${resultado_integrantes.curp}" class="rechazar_ingreso" value="RECHAZAR"> </td> </tr>
                `;
                } else {
                  template_integrantes += `
                  <tr> 
                    <td class="td_cuerpos"> ${resultado_integrantes.curp} </td>
                  </tr>
                `;
                }
                
              }
            }
            
          } else {
            template_integrantes += `
              <tr><td class="celda_vacia" colspan="4"> No hay solicitudes. </td> </tr>
            `;
          }
        } else {
          template_integrantes = `
          <tr> <td class="td_titulos">INFORMACIÓN DISPONIBLE PARA EL CREADOR </td> </tr>`;
        }
      } else {
        template_integrantes = `
        <tr> <td class="td_titulos"> INFORMACIÓN DENEGADA </td> </tr>`;
      }
      
      $('#consulta_usuario_grupo_detalle_intengrantes').show();
      $('#consulta_usuario_grupo_detalle_intengrantes').html(template_integrantes);

      $(document).on('click','.aceptar_ingreso', (e) => {
        const element = document.activeElement;
        const curpSeleccionada = $(element).attr('curpIntegrante');
        const seleccion = "ACEPTADA";
        $.ajax({
          type: "POST", 
          data: { folio_grupo: id, curp: curpSeleccionada, integracion: seleccion},
          url: "../controlador/usuario/seleccion-integracion-grupo.php",
          success: function (response) {
            if(!response.error) {

              $.ajax({
                url: "../controlador/usuario/ver-grupo-integrantes.php",
                data: {folio_grupo: id},
                type: "POST",
                success: function (response) {
                  generar_tabla_grupo_integrantes(id, response);
                }
              });
              
            }
          }
        });
      });

      $(document).on('click', '.rechazar_ingreso', (e) => {
        const element = document.activeElement;
        const curpSeleccionada = $(element).attr('curpIntegrante');
        const seleccion = "RECHAZADA";
        $.ajax({
          type: "POST",
          data: { folio_grupo: id, curp: curpSeleccionada, integracion: seleccion},
          url: "../controlador/usuario/seleccion-integracion-grupo.php",
          success: function (response) {
            if(!response.error) {
              $.ajax({
                url: "../controlador/usuario/ver-grupo-integrantes.php",
                data: {folio_grupo: id},
                type: "POST",
                success: function (response) {
                  generar_tabla_grupo_integrantes(id, response);
                }
              });
            }
          }
        })
      });

    }
  }

  function generar_tabla_grupo_detalles (response) {
    let resultado_grupo = JSON.parse(response);
    let template_grupos = '';
    if(resultado_grupo != "DESO") {
      if(resultado_grupo != "NOPE") {
        if(resultado_grupo != "NADA") {
          template_grupos= `
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
        }
      } else {
        template_grupos = `
        <tr> <td class="td_titulos"> ACCESO DENEGADO </td> </tr>
        <tr> <td class="td_cuerpos"> INFORMACIÓN NO DISPONIBLE PARA USTED ~(^-^)~</td></tr>`;
      }
    } else {
      template_grupos = `
        <tr> <td class="td_titulos">INFORMACIÓN DENEGADA</td> </tr>
      `;
    }
    $('#formulario_consulta_usuario_grupo_detalles').animate({
      height: 'show'
    });
    $('#formulario_unirse_grupo').animate({
      height: 'hide'
    });

    $('#consulta_usuario_grupo_detalle').show();
    $('#consulta_usuario_grupo_detalle').html(template_grupos);

  }

  function enviar_documento_grupo_boton (id) {

    $('#enviar_archivo_grupo').off('click');
    $('#enviar_archivo_grupo').on('click', function () {

      const input_documento = $("#subir_archivo_grupo")[0];
      const asunto = $('#subir_archivo_grupo_asunto').val();
      let documento = input_documento.files[0];
  
      let formData = new FormData();
      formData.append('subir_archivo_grupo_asunto', asunto); 
      formData.append('documento', documento);
      formData.append('et_folio', id);
  
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
          $.ajax({
            type: 'POST',
            data: {folio : id},
            url: '../controlador/usuario/ver-grupo-documentos.php',
            success: function(response) {
              if(!response.error) {
                generar_tabla_archivos_grupo(response);
              }
            }
          });
        }
      });
    });
  }

  function generar_tabla_archivos_grupo (response) {
    let resultados = JSON.parse(response);
    let template = `
    <tr>
      <td class="td_titulos">Documento</td>
      <td class="td_titulos">Fecha Envio</td>
      <td class="td_titulos">Revision</td>
      <td class="td_titulos">Observaciones</td>
      <td class="td_titulos">Enviado por</td>
      <td class="td_titulos"></td>
    </tr>
    `;
    if(resultados != "NADA"){
      if(resultados != undefined) {
        for(const resultado of resultados) {
          template += `
            <tr>
              <td class="td_cuerpos">${resultado.asunto}</td>
              <td class="td_cuerpos">${resultado.fecha_envio}</td>
              <td class="td_cuerpos">${resultado.revision}</td>
              <td class="td_cuerpos">${resultado.observacion}</td>
              <td class="td_cuerpos">${resultado.enviado_por}</td>
              <td class="td_cuerpos"><input folio=${resultado.folio} asunto="${resultado.asunto}" type="button" class="eliminar_documento" value="ELIMINAR"></td>
            </tr>
          `;
        }
      } else {
        template += `
        <tr>
          <td class="celda_vacia" colspan=6>NO HAY DOCUMENTOS.</td>
        </tr>
      `;
      }
    } else {
      template += `
        <tr>
          <td class="celda_vacia" colspan=6>NO HAY DOCUMENTOS.</td>
        </tr>
      `;
    }
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
          $.ajax({
            type: 'POST',
            data: {folio : folio},
            url: '../controlador/usuario/ver-grupo-documentos.php',
            success: function(response) {
              if(!response.error) {
                generar_tabla_archivos_grupo(response);
              }
            }
          });
        }
      });
    });
    $('#consulta_usuario_grupo_detalle_documentacion_subida').show();
    $('#consulta_usuario_grupo_detalle_documentacion_subida').html(template);
  }

  function generar_tabla_archivos_perfil (response) {
    let resultados = JSON.parse(response);
    let template = `
    <tr>
      <td class="td_titulos">Documento</td>
      <td class="td_titulos">Revisión</td>
      <td class="td_titulos">Observaciones</td>
    </tr>
    `;
    if(resultados != "NADA"){
      if(resultados != undefined) {
        for(const resultado of resultados) {
          template += `
            <tr>
              <td class="td_cuerpos">${resultado.asunto}</td>
              <td class="td_cuerpos">${resultado.revision}</td>
              <td class="td_cuerpos">${resultado.observacion}</td>
            </tr>
          `;
        }
      }
    } else {
      template += `
        <tr>
          <td class="celda_vacia" colspan=3>NO HAY DOCUMENTOS.</td>
        </tr>
      `;   
    }
    $('#usuario_archivos_enviados').show();
    $('#usuario_archivos_enviados').html(template);
  }

  function asignar_folio_boton_revision(folio) {

    $('#btn_revision_grupo').on('click', function() {
     
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

          /* tabla primera en la que se visualizan los grupos creados */
          $.ajax({
            type: 'POST',
            url: '../controlador/usuario/ver-grupos-creados.php',
            success: function (response) {
              if(!response.error) generar_tabla_grupos_creados(response);
            }
          });

          /* tabla de los detalles del grupo seleccionado a revisión */
          $.ajax({
            type: 'POST',
            data: {folio_grupo: folio},
            url: '../controlador/usuario/ver-grupo-detalles.php',
            success: function (response) {
              if(!response.error) generar_tabla_grupo_detalles(response);
            }
          });

        }

      });

    });

  }

  /* fin functions */

});