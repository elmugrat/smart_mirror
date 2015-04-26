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
	<title>Smart Mirror: Message</title>
	<style type='text/css'>
	input {
		position: absolute;
		top: 40%;
		left: 30%;
		width: 40%;
		padding: 3px 6px;
		font-size: 18pt;
		outline: 0;
		border: 1px solid #CCC;
		border-radius: 5px;
		box-shadow: 1px 1px 4px #CCC;
	}
	
	input:hover, input:active {
		box-shadow: 1px 1px 4px #999;
	}
	
	*::-webkit-input-placeholder {
		color: #777;
	}
	</style>
</head>
<body>
	<form action='message.php?action=set' method='post'>
		<input type='text' name='message' placeholder='Message'></input>
	</form>
</body>
</html>