<?php
	session_start();
	if(isset($_SESSION['usuario_curp'])) {
		unset($_SESSION['usuario_curp']);
	  unset($_SESSION['usuario_tipo']);
		unset($_SESSION['usuario_validado']);
	  session_destroy();
	  echo "La sesion ha sido cerrada";
	} else {
 		echo "HUBO UN PROBLEMA. SI ESTE MENSAJE APARECE, POR FAVOR CONTACTE AL DESARROLLADOR. :(";
	}
?>
