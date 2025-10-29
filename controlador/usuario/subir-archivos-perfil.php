<?php
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if($_SESSION['usuario_validado'] == "NO") {
    if(!empty($_POST['subir_archivo_perfil_asunto']) && !empty($_FILES['documento']['name'])) {
      if(($_FILES['documento']['type'] == "application/pdf") && $_FILES["documento"]["size"] < 1000000) {
        
        require_once '../../modelo/base-de-datos.php';
        require_once '../../modelo/usuario.php';

        $Curp = $_SESSION['usuario_curp'];
        
        $documento_name = $_FILES['documento']["name"];
        $documento_tmp_name = $_FILES['documento']["tmp_name"];
        $documento_asunto = $_POST['subir_archivo_perfil_asunto'];

        $Curp = strtoupper($Curp);

        $directorio = "../../files/usuarios/" . $Curp . "/";
        if(!is_dir($directorio)) {
          mkdir($directorio, 0777);
        }

        $documento = $directorio . $documento_name;

        move_uploaded_file($documento_tmp_name, $documento);

        $extension = pathinfo($documento)['extension'];
        
        $documento_nombre_nuevo = $directorio . $Curp . " - " . $documento_asunto . "." . $extension;

        rename($documento, $documento_nombre_nuevo);

        if($extension == "pdf") {
          if(file_exists($directorio . $Curp . " - " . $documento_asunto . "." . "doc")) 
            unlink($directorio . $Curp . " - " . $documento_asunto . "." . "doc");
          else if(file_exists($directorio . $Curp . " - " . $documento_asunto . "." . "docx"))
            unlink($directorio . $Curp . " - " . $documento_asunto . "." . "docx");
        } else if($extension == "doc") {
          if(file_exists($directorio . $Curp . " - " . $documento_asunto . "." . "pdf")) 
            unlink($directorio . $Curp . " - " . $documento_asunto . "." . "pdf");
          else if(file_exists($directorio . $Curp . " - " . $documento_asunto . "." . "docx"))
            unlink($directorio . $Curp . " - " . $documento_asunto . "." . "docx");
        } else if($extension == "docx") {
          if(file_exists($directorio . $Curp . " - " . $documento_asunto . "." . "pdf")) 
            unlink($directorio . $Curp . " - " . $documento_asunto . "." . "pdf");
          else if(file_exists($directorio . $Curp . " - " . $documento_asunto . "." . "doc")) 
            unlink($directorio . $Curp . " - " . $documento_asunto . "." . "doc");
        }

        $usuario = new usuario();
        $usuario -> subir_documento_perfil($Curp,$Curp . " - " . $documento_asunto . "." . $extension, $documento_asunto);

      } else echo "Documento no permitido.";
    } else echo "Debes de ingresar un documento para subir.";
  } else echo "Usted está en revisión, debe de esperar para poder enviar o reemplazar un documento.";
}
?>