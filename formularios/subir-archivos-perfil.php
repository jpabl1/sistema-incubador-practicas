<h2 class="formularios_titulo_">
  Ingrese los archivos requeridos:
</h2>
<form id="formulario_subir_archivos_perfil" enctype="multipart/form-data">
  <label for="" class="pregunta_titulo">Adjunte el documento (permitidos solamente .pdf):</label>
  <input class="pregunta_input_archivo" accept=".pdf" type="file" name="" id="subir_archivo_perfil">
  <label for="" class="pregunta_titulo">Y seleccione el asunto del archivo que va a mandar:</label>
  <select class="pregunta_input" name="" id="subir_archivo_perfil_asunto">
    <option value="RFC">RFC</option>
    <option value="CURP">CURP</option>
    <option value="Credencial del INE">Credencial del INE</option>
    <option value="Acta de Nacimiento">Acta de Nacimiento</option>
    <option value="Comprobante de domicilio">Comprobante de domicilio</option>
    <option value="Fotografías de tamaño infantil">Fotografías de tamaño infatil</option>
    <option value="Currículo Vitae">Currículo Vitae</option>
    <option value="Recibo de Pago del Servicio de Incubación">Recibo de Pago del Servicio de Incubación</option>
  </select>
  <input type="button" class="formularios_subir_sin_sombra" id="enviar_archivo_perfil" value="ENVIAR">
</form>