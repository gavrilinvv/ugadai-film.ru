<?php
	require '../vendor/autoload.php';
	use Cloudinary\Configuration\Configuration;
	use Cloudinary\Api\Upload\UploadApi;

	Configuration::instance([
		'cloud' => [
			'cloud_name' => 'ddu8qv5kp',
			'api_key' => '221715221119194',
			'api_secret' => 'v_gqRwHZClp_6GOPfKiU-pgdj5g'],
		'url' => [
			'secure' => true]]);

	$cloudinary = new UploadApi();

	// $dir    = '../dest/img/screens/';
	// $files1 = scandir($dir);

	// var_dump($files1);

	foreach(glob('../dest/img/screens/*', GLOB_ONLYDIR) as $dir) {
		$dirname = basename($dir);

		$framesInFolder = array_diff( scandir( '../dest/img/screens/' . $dirname), array('.', '..') );

		foreach($framesInFolder as $frameFullName) {
			$frame = '../dest/img/screens/' . $dirname . '/' . $frameFullName;
			$frameName = pathinfo($frame, PATHINFO_FILENAME);
			$cloudinary->upload($frame, ['public_id' => $dirname . '/' . $frameName]);
		}
	}

?>
