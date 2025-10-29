<?php
if(isset($_POST['et_curp']) && isset($_POST['et_contra'])) {
  require_once '../../modelo/base-de-datos.php';
  require_once '../../modelo/usuario.php';
  $curp = $_POST['et_curp'];
  $contra = $_POST['et_contra'];
  $usuario = new usuario();
  $usuario -> validar_usuario($curp, $contra);
} else {
  echo "HUBO UN PROBLEMA. INTENTASTE ENTRAR CONTACTE CON EL DESARROLLADOR :(";
}
?>
