<?php
	# скрипт обробник отримання загальних підсумків по непроданих товарах для поточного магазину
	# скрипт security
	require_once("security.php");
	# отримуємо вхідні данні
	$magazineID = $_POST['idShop'];
	# виконуємо sql запит на отримання інформації про непродані товари
	$sqlQuery = 'SELECT inputPrice, startingPrice FROM store WHERE dateOfSale = "0000-00-00" and salePrice = "0" and idShop = "'.mysql_real_escape_string($magazineID).'" ';
	$sqlQuery = mysql_query($sqlQuery);
	# перевірка на існування непроданих товарів
	if(mysql_num_rows($sqlQuery) == '0')
	{
		$updatingData['errorType'] = "Товарів не має";
	}else
	{
		while($data = mysql_fetch_array($sqlQuery))
		{
			$updatingData[] = $data;
		}		
	}	
		
	echo json_encode($updatingData);
?>