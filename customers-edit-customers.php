<?php
	# скрипт оборобник редагування клієнта
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$level = $_POST['level'];
	$editCustomerID = $_POST['editCustomerID'];
	$editCustomerUserName = $_POST['editCustomerUserName'];
	$editCustomerCardNumber = $_POST['editCustomerCardNumber'];
	$editCustomerTotalSum = $_POST['editCustomerTotalSum'];
	$editCustomerTelephone = $_POST['editCustomerTelephone'];
	$editCustomerDiscount = $_POST['editCustomerDiscount'];
	$editCustomerFirstPrice = $_POST['editCustomerFirstPrice'];
	# перевірка на рівень доступу
	if($level == '0')
	{
		# перевірка на процент знижки, якщо 20% то 
		# firstPrice,totalSum,difPrice буде рівна "0"!!!!!
		if($editCustomerDiscount == '20')
		{
			# запит до бази даних на оновлення інформації про клієнта
			$updateCustomer = "UPDATE customers SET 
													userName = '".mysql_real_escape_string($editCustomerUserName)."', 
													cardNumber = '".mysql_real_escape_string($editCustomerCardNumber)."', 
													totalSum = '0',
													firstPrice = '0', 
													telephone = '".mysql_real_escape_string($editCustomerTelephone)."', 
													discount = '".mysql_real_escape_string($editCustomerDiscount)."',
													difPrice = '0'
								WHERE id='".mysql_real_escape_string($editCustomerID)."'";
		}else
		{
			# запит до бази даних на оновлення інформації про клієнта
			$updateCustomer = "UPDATE customers SET 
													userName = '".mysql_real_escape_string($editCustomerUserName)."', 
													cardNumber = '".mysql_real_escape_string($editCustomerCardNumber)."', 
													totalSum = '".mysql_real_escape_string($editCustomerTotalSum)."', 
													telephone = '".mysql_real_escape_string($editCustomerTelephone)."', 
													discount = '".mysql_real_escape_string($editCustomerDiscount)."',
													firstPrice = '".mysql_real_escape_string($editCustomerFirstPrice)."' 
								WHERE id='".mysql_real_escape_string($editCustomerID)."'";	
		}	
		 
		$updateCustomer = mysql_query($updateCustomer);
		# запит на отримання оновленої таблиці клієнтів
		$updateCustomers = "SELECT * FROM customers ORDER BY cardNumber ASC";
		$updateCustomers = mysql_query($updateCustomers);
		while($data = mysql_fetch_array($updateCustomers))
		{
			$updateCustomersInfo[] = $data;
		}	
	}else 
	{
		$updateCustomersInfo = false;
	}

	echo json_encode($updateCustomersInfo);		
?>