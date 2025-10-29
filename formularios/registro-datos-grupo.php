<div class="formularios_">
  <?php
    if($_SESSION['usuario_validado'] == "NO") {
      echo "<p style='color: white;'>ATENCIÓN: ESTE USUARIO AÚN NO HA SIDO VÁLIDADO. SI QUIERE QUE EL PROYECTO SEA ACEPTADO DEBE DE TENER LA CUENTA VALIDADA. </p>";
    }
  ?>
    <h2 class="formularios_titulo_">
        Datos Generales del Proyecto / Empresa
    </h2>

    <div class="preguntas_">

        <div title="El nombre con el que se identificará el proyecto." class="pregunta_">
            <label class="pregunta_titulo" for="">Nombre del Proyecto / Razón Social:</label>
            <input class="pregunta_input" type="text" id="et_nombre" name="et_nombre">
        </div>

        <div title="El RFC, si es que es una empresa." class="pregunta_">
            <label class="pregunta_titulo" for="">RFC:</label>
            <input class="pregunta_input" type="text" id="et_rfc" name="et_rfc">
        </div>

        <div title="Ubicación actual del Proyecto / Empresa." class="pregunta_">
            <label class="pregunta_titulo" for="">Domicilio / Calle:</label>
            <input class="pregunta_input" type="text" id="et_domicilio" name="et_domicilio">
        </div>

    </div>

    <div class="preguntas_">

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">No. Exterior:</label>
            <input class="pregunta_input" type="text" id="et_no_exterior" name="et_no_exterior">
        </div>

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">No. Interior:</label>
            <input class="pregunta_input" type="text" id="et_no_interior" name="et_no_interior">
        </div>

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Código Postal:</label>
            <input class="pregunta_input" type="text" id="et_codigo_postal" name="et_codigo_postal">
        </div>

    </div>

    <div class="preguntas_">

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Colonia:</label>
            <input class="pregunta_input" type="text" id="et_colonia" name="et_colonia">
        </div>

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Municipio:</label>
            <input class="pregunta_input" type="text" id="et_municipio" name="et_municipio">
        </div>

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Estado:</label>
            <input class="pregunta_input" type="text" id="et_estado" name="et_estado">
        </div>

    </div>

    <div class="preguntas_">

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Teléfono Residencial</label>
            <input class="pregunta_input" type="text" id="et_telefono_residencial" name="et_telefono_residencial">
        </div>

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Fax:</label>
            <input class="pregunta_input" type="text" id="et_fax" name="et_fax">
        </div>

        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Correo:</label>
            <input class="pregunta_input" type="text" id="et_correo" name="et_correo">
        </div>

    </div>

    <div class="preguntas_">
        <div class="pregunta_">
            <label class="pregunta_titulo" for="">Web:</label>
            <input type="text" name="et_web" id="et_web" class="pregunta_input">
        </div>
        <div class="pregunta_">
          <label class="pregunta_titulo" for="">¿Qué es?</label>
          <select class="pregunta_input" id="et_tipo_grupo">
            <option value="Proyecto">Proyecto</option>
            <option value="Empresa">Empresa</option>
          </select>
        </div>
    </div>
