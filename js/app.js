$(document).ready( function () {
  $('#btn_iniciar_sesion').on('click', function () {
  curp = $('#et_curp').val();
  contra = $('#et_contra').val();
  $.ajax({
    type: 'POST',
    url: './controlador/inicial/iniciar-sesion.php',
    data: {
      et_curp: curp,
      et_contra: contra
    },
    success: function (response) {
      if(!response.error) {
        let usuario = JSON.parse(response);
        if(usuario.tipo_usuario == "Solicitante" || usuario.tipo_usuario == "Socio" || usuario.tipo_usuario == "Administrador") {
          location.reload();
        } else {
          Swal.fire("Lo sentimos.", "La contraseña o el usuario son incorrectos.", "error");
          $('#mensaje').show();
          $('#mensaje').html("El usuario/contraseña es incorrecta.");
        }
      }
    }});
  });

  $('#registrar_usuario').on('click', function() {
    nombres = $('#et_nombres').val();
    apellido_paterno = $('#et_apellido_paterno').val();
    apellido_materno = $('#et_apellido_materno').val();
    fecha_nacimiento = $('#et_fecha_nacimiento').val();
    estado_civil = $('#et_estado_civil').val();
    genero = $('input:radio[name=generor]:checked').val();
    discapacidad_si_no = $('input:radio[name=discapacidadr]:checked').val();
    discapacidad = $('#et_discapacidad').val();
    rfc_homo_clave = $('#et_rfc_homo_clave').val();
    curp = $('#et_curp').val();
    domicilio = $('#et_domicilio').val();
    no_exterior = $('#et_no_exterior').val();
    no_interior = $('#et_no_interior').val();
    codigo_postal = $('#et_codigo_postal').val();
    colonia = $('#et_colonia').val();
    municipio = $('#et_municipio').val();
    estado = $('#et_estado').val();
    telefono_residencial = $('#et_telefono_residencial').val();
    telefono_celular = $('#et_telefono_celular').val();
    ingreso_mes_personal = $('#et_ingreso_mensual_personal').val();
    ingreso_mes_familiar = $('#et_ingreso_mensual_familiar').val();
    dependientes_economicos_tipos = $('input:radio[name=dependientes_economicosr]:checked').val();
    dependientes_economicos = $('#et_dependientes_economicos').val();
    jornada_laboral = $('input:radio[name=jornada_laboralr]:checked').val();
    correo1 = $('#et_correo1').val();
    correo2 = $('#et_correo2').val();
    grado_maximo_estudio = $('#et_grado_maximo_estudio').val();
    especialidad = $('#et_especialidad').val();
    institucion_egreso = $('#et_institucion_egreso').val();
    fecha_egreso = $('#et_fecha_egreso').val()
    tipo_cuenta = $('#et_tipo_cuenta').val();
    contra = $('#et_contra').val();
    $.ajax({
      type: 'POST',
      url: './controlador/inicial/registro-usuario.php',
      data: {
        et_nombre: nombres,
        et_apellido_paterno: apellido_paterno,
        et_apellido_materno: apellido_materno,
        et_fecha_nacimiento: fecha_nacimiento,
        et_estado_civil: estado_civil,
        et_genero: genero,
        et_discapacidad_si_no: discapacidad_si_no,
        et_discapacidad: discapacidad,
        et_rfc_homo_clave: rfc_homo_clave,
        et_curp: curp,
        et_domicilio: domicilio,
        et_no_exterior: no_exterior,
        et_no_interior: no_interior,
        et_codigo_postal: codigo_postal,
        et_colonia: colonia,
        et_municipio: municipio,
        et_estado: estado,
        et_telefono_residencial: telefono_residencial,
        et_telefono_celular: telefono_celular,
        et_ingreso_mensual_personal: ingreso_mes_personal,
        et_ingreso_mensual_familiar: ingreso_mes_familiar,
        et_dependientes_economicos_tipos: dependientes_economicos_tipos,
        et_dependientes_economicos: dependientes_economicos,
        et_jornada_laboral: jornada_laboral,
        et_correo1: correo1,
        et_correo2: correo2,
        et_grado_maximo_estudio: grado_maximo_estudio,
        et_especialidad: especialidad,
        et_institucion_egreso: institucion_egreso,
        et_fecha_egreso: fecha_egreso,
        et_contra: contra,
        et_tipo_cuenta: tipo_cuenta
      },
      success: function (response) {
        if(!response.error) {
          Swal.fire({
            title: 'ATENCIÓN',
            color: "#fff",
            text: response,
            background: "#000"
          });
        }
      }
    })
  });
});