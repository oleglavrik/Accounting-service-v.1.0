<?php
	# скрипт оборобник додавання нового клієнта
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$customerName = $_POST['customerName'];
	$customerNumberCard = $_POST['customerNumberCard'];
	$customerDiscount = $_POST['customerDiscount'];
	$customerTelephone = $_POST['customerNumberTelephone'];
	# виконуємо запит до бази даних
	$addCustomerQuery = 'INSERT INTO customers (userName, cardNumber, telephone, discount, totalSum )values("'.mysql_real_escape_string($customerName).'","'.mysql_real_escape_string($customerNumberCard).'", "'.mysql_real_escape_string($customerTelephone).'", "'.mysql_real_escape_string($customerDiscount).'", "0")';
	$addCustomerQuery = mysql_query($addCustomerQuery);

	#проводимо вибірку для оновленої інформації клієнтів
	$updateCustomers = 'SELECT * FROM customers ORDER BY cardNumber ASC';	
	$updateCustomers = mysql_query($updateCustomers);
	while($data = mysql_fetch_array($updateCustomers))
	{
		$updateListCustomers[] = $data;
	}

	# формуємо відповідь
	echo json_encode($updateListCustomers);	
?>