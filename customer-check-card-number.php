<?php
	# скрипт обробник перевірка чи існує нововедена клієнська картка в БД
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$checkCardNumber = $_POST['checkCustomerNumberCard'];
	$checkNumberQuery = "SELECT cardNumber FROM customers WHERE cardNumber = '".mysql_real_escape_string($checkCardNumber)."' LIMIT 1";
	$checkNumberQuery = mysql_query($checkNumberQuery);
	if(mysql_num_rows($checkNumberQuery) > 0)
	{
		// даний номер картки вже існує в БД
		$data = false;
	}	
	else
	{
		// даний номер картки не існує в БД 
		$data = true;
	}		
		
	echo json_encode($data);
?>