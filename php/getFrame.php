<?php
	require '../vendor/autoload.php';
	// use Cloudinary\Configuration\Configuration;
	// use Cloudinary\Api\Search\SearchApi;
	// use Cloudinary\Api\Admin\AdminApi;

	$filmId = $_GET['id'];


	$directory = '../dest/img/screens/' . $filmId . '/';
	$files = glob($directory . '*.jpg');

	$frameNumber = random_int(1,  count( $files ));
	print_r( json_encode('/dest/img/screens/' . $filmId . '/' . $frameNumber . '.jpg') );

	// Configuration::instance([
	// 	'cloud' => [
	// 		'cloud_name' => 'ddu8qv5kp',
	// 		'api_key' => '221715221119194',
	// 		'api_secret' => 'v_gqRwHZClp_6GOPfKiU-pgdj5g'],
	// 	'url' => [
	// 		'secure' => true]]);

	// $cloudinary = new SearchApi();

	// $result = $cloudinary
	// 	->expression('folder:' . $filmId  . '/*')
	// 	->sortBy('public_id','desc')
	// 	->execute();

	// $totalCount = json_encode($result['total_count']);
	// $frameNumber = random_int(0, $totalCount-1);

	// print_r( json_encode($result['resources'][$frameNumber]['url']) );
?>
