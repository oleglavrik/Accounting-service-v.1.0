<?php
	# скрипт обробник завантаження витрат при загрузці сторінки
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні дані
	$magazineID = $_POST['shopID'];
	# відправляємо запит на отримання таблиці витрат для поточного магазину
	$costsQuery = 'SELECT * FROM costs WHERE idShop = "'.mysql_real_escape_string($magazineID).'" ORDER BY date DESC';
	$costsQuery	= mysql_query($costsQuery);
	# перевірка чи є хотя б одна витрата в БД
	if(mysql_num_rows($costsQuery) == '0')
	{
		$loadingCosts['errorType'] = "Не має жодної витрати";
	}else
	{
		# заносимо в масив отриманні дані з БД
		while($data = mysql_fetch_array($costsQuery))
		{
			$loadingCosts[] = $data;
		}	
	}	
		
	echo json_encode($loadingCosts);
?>