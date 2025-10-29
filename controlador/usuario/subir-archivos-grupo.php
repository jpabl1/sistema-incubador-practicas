<?php
session_start(); 
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['subir_archivo_grupo_asunto']) && !empty($_FILES['documento']['name']) && !empty($_POST['et_folio'])) {
    if(($_FILES['documento']['type'] == "application/pdf") && $_FILES["documento"]["size"] < 3000000) {
      
      require_once '../../modelo/base-de-datos.php';
      require_once '../../modelo/grupo.php';

      $Folio = $_POST['et_folio'];
      $Enviado_por = $_SESSION['usuario_curp'];
      $documento_name = $_FILES['documento']['name'];
      $documento_tmp_name = $_FILES['documento']['tmp_name'];
      $documento_asunto = $_POST['subir_archivo_grupo_asunto'];

      $directorio = '../../files/proyectos/' . $Folio . '/';

      if(!is_dir($directorio)) {
        mkdir($directorio, 0777);
      }

      $documento = $directorio . $documento_name;
      move_uploaded_file($documento_tmp_name, $documento);

      $extension = pathinfo($documento)['extension'];
      
      $documento_nombre_nuevo = $directorio . $Folio . " - " . $documento_asunto . "." . $extension;
      rename($documento, $documento_nombre_nuevo);

      if($extension == "pdf") {
        if(file_exists($directorio . $Folio . " - " . $documento_asunto . "." . "doc")) 
          unlink($directorio . $Folio . " - " . $documento_asunto . "." . "doc");
        else if(file_exists($directorio . $Folio . " - " . $documento_asunto . "." . "docx"))
          unlink($directorio . $Folio . " - " . $documento_asunto . "." . "docx");
      } else if($extension == "doc") {
        if(file_exists($directorio . $Folio . " - " . $documento_asunto . "." . "pdf")) 
          unlink($directorio . $Folio . " - " . $documento_asunto . "." . "pdf");
        else if(file_exists($directorio . $Folio . " - " . $documento_asunto . "." . "docx"))
          unlink($directorio . $Folio . " - " . $documento_asunto . "." . "docx");
      } else if($extension == "docx") {
        if(file_exists($directorio . $Folio . " - " . $documento_asunto . "." . "pdf")) 
          unlink($directorio . $Folio . " - " . $documento_asunto . "." . "pdf");
        else if(file_exists($directorio . $Folio . " - " . $documento_asunto . "." . "doc")) 
          unlink($directorio . $Folio . " - " . $documento_asunto . "." . "doc");
      }

      $grupo = new grupo();
      $grupo -> subir_documento_grupo($Folio, $Folio . " - " . $documento_asunto . "." . $extension, $documento_asunto, $Enviado_por);

    } else echo "Documento no permitido.";
  } else echo "Debe de ingresar un documento para subir.";
}
?>