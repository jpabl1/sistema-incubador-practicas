<?php 
session_start();
if(isset($_SESSION['usuario_curp'])) {
  if(!empty($_POST['imagen'])) {

    if(uploadImgBase64($_POST['imagen'], "img-temp.png")) echo "Se guardó con exito.";
    else echo ":(";

  } else echo "No tenemos nada";
}

function uploadImgBase64 ($base64, $name){
  // decodificamos el base64
  $datosBase64 = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64));
  // definimos la ruta donde se guardara en el server
  $path= '../../src/images/'.$name;
  // guardamos la imagen en el server
  if(!file_put_contents($path, $datosBase64)){
      // retorno si falla
      return false;
  }
  else{
      // retorno si todo fue bien
      return true;
  }
}

?>