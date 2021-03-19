<?php
if (!empty($_POST) && isset($_POST['rock_position']) && isset($_POST['rock_size']) && isset($_POST['distance']) && isset($_POST['run_status']) && isset($_POST['time_passed'])) {
	require_once 'insert.php';

	$results = new sd\Result();
	$result  = $results->insert_data($_POST['rock_position'], $_POST['rock_size'], $_POST['distance'], $_POST['run_status'], $_POST['time_passed']);

	if ($result['execute']){
		echo json_encode( [
			'success' => true,
		] );
	} else {
		echo json_encode([
			'success' => false,
			'error'   => $result['pdo']->errorCode(),
		] );
	}
} else {
	echo json_encode([
		'success' => false,
		'error'   => 'Not enough data',
	] );
}