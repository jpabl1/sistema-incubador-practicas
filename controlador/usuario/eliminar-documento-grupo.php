<?php 
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['folio']) && !empty($_POST['asunto'])) {

    require_once '../../modelo/base-de-datos.php';
    require_once '../../modelo/grupo.php';

    $Folio = $_POST['folio'];
    $Asunto = $_POST['asunto'];
    $Curp = $_SESSION['usuario_curp'];

    $directorio = '../../files/proyectos/' . $Folio . '/';
    if(is_dir($directorio)) {
      $documento = $directorio . $Folio . " - " . $Asunto;
      if(is_file($documento . ".pdf") || is_file($documento . ".doc") || is_file($documento . ".docx")) {

        if(is_file($documento . ".pdf")) unlink($documento . ".pdf");
        if(is_file($documento . ".doc")) unlink($documento . ".doc");
        if(is_file($documento . ".docx")) unlink($documento . ".docx"); 

        $grupo = new grupo();
        $grupo -> eliminar_documento_grupo($Folio, $Asunto, $Curp);

      } else echo "El documento no existe.";
    } else echo "El proyecto aún no tiene documentos.";
  } else echo "Algo ocurrío. :(";
}
?>