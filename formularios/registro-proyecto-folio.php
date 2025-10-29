<div class="formularios_">
    
    <h2>Primeramente...</h2>
    
    <table class="formularios_preguntas_" border="2">
        
        <tr>
            <td>
                <div class="pregunta_">

                    <label for="">¿El proyecto ha sido registrado anteriormente?</label><br>
                    <input type="radio" name="et_si_no_folio_proyecto" id="confolio" value="Si" ><label for="" class="pregunta_label">Si</label>
                    <input type="radio" name="et_si_no_folio_proyecto" id="sinfolio" value="No"><label for="" class="pregunta_label">No</label><br>

                    <div id="si_folio">
                        <label for="">Ingrese el Folio en el que debe estar integrado:</label>
                        <input type="text" name="et_folio_proyecto" class="pregunta_input" id="ingresa_folio" autocomplete="none">
                    </div>

                </div>
            </td>
        </tr>
        <tr>
            <td>
    
                <div class="pregunta_">

                    <label for="">¿Eres solicitante o socio?</label><br>
                    <input type="radio" name="et_solicitante_socio_proyecto" id="solicitante" value="Si"><label for="" class="pregunta_label">Solicitante</label>
                    <input type="radio" name="et_solicitante_socio_proyecto" id="socio" value="No"><label for="" class="pregunta_label">Socio</label><br>

                </div>
            
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <div class="pregunta_">

                    <input type="submit" class="formularios_subir" name="checa_folio" id="botonconfirmar" value="ACEPTAR">

                </div>
            </td>
        </tr>

    </table>
</div>