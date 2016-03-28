<?php
switch ($_GET['action']) {
	case 'get':
		echo json_encode(array('message' => trim(`cat message.txt`)));
		return;
	case 'set':
		shell_exec('/bin/echo -n ' . escapeshellarg($_POST['message']) . ' > message.txt');
		break;
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
	<title>Smart Mirror: Message</title>
	<style type='text/css'>
	* {
		margin:0;
		padding:0;

		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}

	html {
	    height:100%;
	}

	body {
		background: -moz-radial-gradient(center, ellipse cover,  rgba(30,47,84,0.9) 0%, rgba(30,47,84,1) 100%);
		background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(30,47,84,0.9)), color-stop(100%,rgba(30,47,84,1)));
		background: -webkit-radial-gradient(center, ellipse cover,  rgba(30,47,84,0.9) 0%,rgba(30,47,84,1) 100%);
		background: -o-radial-gradient(center, ellipse cover,  rgba(30,47,84,0.9) 0%,rgba(30,47,84,1) 100%);
		background: -ms-radial-gradient(center, ellipse cover,  rgba(30,47,84,0.9) 0%,rgba(30,47,84,1) 100%);
		background: radial-gradient(ellipse at center,  rgba(30,47,84,0.9) 0%,rgba(30,47,84,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e61e2f54', endColorstr='#1e2f54',GradientType=1 );
	}

	form {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 40%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
	}

	input {
		width: 100%;
		padding: 8px 0;
		text-indent: 10px;
		font-size: 16px;
		outline: 0;
		background: #FFF;
		border: 1px solid #CCC;
		border-radius: 5px;
		box-shadow: inset 0 1px 3px #CCC, 0px 0px 3px #CCC;
	}

	*::-webkit-input-placeholder {
		color: #888;
	}
	*:-moz-placeholder {
	    color: #888;
	    opacity: 1
	}
	*::-moz-placeholder {
	    color: #888;
	    opacity: 1
	}
	*:-ms-input-placeholder {
	    color: #888;
	}

	/* Smartphones (portrait and landscape) ----------- */
	@media only screen
	and (min-device-width : 320px)
	and (max-device-width : 480px) {
		form {
			width: 90%;
			top: 20%;
		}
	}

	/* iPads (portrait and landscape) ----------- */
	@media only screen
	and (min-device-width : 768px)
	and (max-device-width : 1024px) {
		form { width: 70%; }
	}
	</style>
</head>
<body>
	<form action='index.php?action=set' method='post'>
		<input type='text' name='message' placeholder='Message' autofocus >
	</form>
</body>
</html>