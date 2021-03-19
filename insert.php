<?php

namespace sd;
require_once 'database.php';

class Result {
	function insert_data($rock_position, $rock_size, $distance, $run_status, $time_passed) {
		$db      = new database();
		$pdo     = $db->connect();
		$sql     = "INSERT INTO runner (rock_position, rock_size, distance, run_status, time_passed) VALUES (?,?,?,?,?)";
		$execute = $pdo->prepare($sql)->execute([ $rock_position, $rock_size, $distance, $run_status, $time_passed ]);

		return [
			'execute' => $execute,
			'pdo'     => $pdo
		];
	}
}