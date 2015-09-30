<?php
	# скрипт обробник отримання загальноъ сумми витрат від дати до дати
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$magazineID = $_POST['shop'];
	$sDate = $_POST['sDate'];
	$eDate = $_POST['eDate'];
	# виконуємо запит на отримання інформації з БД
	$costsPriceQuery = 'SELECT price FROM costs WHERE date >= "'.mysql_real_escape_string($sDate).'" AND date <= "'.mysql_real_escape_string($eDate).'" AND idShop = "'.mysql_real_escape_string($magazineID).'" '; 
	$costsPriceQuery = mysql_query($costsPriceQuery);
	# перевірка на існування витрат в діапазоні дат
	if(mysql_num_rows($costsPriceQuery) == '0')
	{
		$totalPrice['errorType'] = "В даному діапазоні дат, не існує жодної витрати";	
	}else
	{
		# заносимо існуючі дані
		for ($i=0; $i < mysql_num_rows($costsPriceQuery); $i++) { 
			$totalPrice[] = mysql_fetch_array($costsPriceQuery, MYSQL_ASSOC);
		}	
	}	

	# відповідь
	echo json_encode($totalPrice);
?>