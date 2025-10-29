<?php

    require_once "../../config/configuraciones_480212.php";

    class base_de_datos {

        private $host;
        private $db;
        private $user;
        private $pass;
        public $conexion;

        public function conexionDB () {

            $this -> host = constant('DB_HOST');
            $this -> db = constant('DB');
            $this -> user = constant('DB_USER');
            $this -> pass = constant('DB_PASS');

            try {
                $this -> conexion = new PDO('mysql:host='.$this->host.'; dbname='.$this->db,$this->user, $this->pass);
            } catch (Exception $e){
                die('Error '. $e -> GetMessage());
            }
            return $this -> conexion;
        }

    }
?>
