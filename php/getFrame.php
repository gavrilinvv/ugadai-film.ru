<?php
	$filmId = $_GET['id'];
	$directory = '../dest/img/screens/' . $filmId . '/';
	$files = glob($directory . '*.webp');

	$frameNumber = random_int(1,  count( $files ));
	print_r( json_encode('/dest/img/screens/' . $filmId . '/' . $frameNumber . '.webp') )
?>
