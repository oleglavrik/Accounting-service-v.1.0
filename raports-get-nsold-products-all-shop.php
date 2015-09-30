<?php
	# скрипт обробник отримання загальних підсумків по непроданих товарах для всіх магазинів
	# скрипт security
	require_once("security.php");
	# виконуємо sql запит на отримання інформації про непродані товари
	$sqlQuery = 'SELECT inputPrice, startingPrice FROM store WHERE dateOfSale = "0000-00-00" and salePrice = "0"';
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