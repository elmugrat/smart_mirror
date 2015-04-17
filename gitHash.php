<?php
	echo json_encode(array('latestGitHash' => trim(`git rev-parse HEAD`)));
?>
