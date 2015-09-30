<?php
	# скрипт обробник отримання інформації про клієгта для редагування
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$level = $_POST['level'];
	$customerID = $_POST['editCustomerID'];
	if($level == '0')
	{
		# виконуємо запит на отримання інформації про клієнта
		$editCustomerQuery = 'SELECT * FROM customers WHERE id = "'.mysql_real_escape_string($customerID).'"';
		$editCustomerQuery = mysql_query($editCustomerQuery);
		$customerInfo = array();
		while($data = mysql_fetch_array($editCustomerQuery))
		{
			$customerInfo = $data;
		}
	}else
	{
		$customerInfo = fasle;
	}
	echo json_encode($customerInfo);		
?>