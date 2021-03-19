<?php
namespace sd;

use PDO;
$host = 'localhost';
$user = '';
$dbname = '';
$pass = '';
class database {
	function connect() {
		return $database = new PDO( 'mysql:host=localhost;dbname='.$dbname. , $user, $pass);
	}
}
