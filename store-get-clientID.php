<?php
	# скрипт обробник певірки існування ід клієнта по номеру картки
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні дані
	$clientCardNubmer = $_POST['clientCardNubmer'];
	# проводимо вибірку ід клієнта по номеру картки
	$checkQuery = 'SELECT id,discount FROM customers WHERE cardNumber = "'.mysql_real_escape_string($clientCardNubmer).'" LIMIT 1';
	$checkQuery = mysql_query($checkQuery);
	# перевірка на існування ід клієната по номеру карти
	if(mysql_num_rows($checkQuery) == 0)
	{
		$clientID['errorType'] = "false";
	}else
	{
		while($data = mysql_fetch_assoc($checkQuery))
		{
			$clientID = $data;
		}	
	}	
		
	echo json_encode($clientID);
?>