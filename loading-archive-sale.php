<?php
	# скрипт обробник завантаження архіву проданих товарів при загрузці сторінки
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні дані
	$magazineID = $_POST['shopID'];
	# відправляємо запит на отримання таблиці архіву проданих товарів
	$archiveSaleQuery = 'SELECT 
								id, 
								productName, 
								dateOfSale, 
								barCode, 
								salePrice 
						FROM 
								store 
						WHERE 
								dateOfSale != "0000-00-00" AND
								salePrice !="0" AND
								archiveStatus !="1" AND
								idShop = "'.mysql_real_escape_string($magazineID).'"
						ORDER BY dateOfSale DESC';
	$archiveSaleQuery	= mysql_query($archiveSaleQuery);
	# перевірка чи є хотя б один проданий товар 
	if(mysql_num_rows($archiveSaleQuery) == '0')
	{
		$loadingArchiveSale['errorType'] = "Не має жодного проданого товару";
	}else
	{
		# заносимо в масив отриманні дані з БД
		while($data = mysql_fetch_array($archiveSaleQuery))
		{
			$loadingArchiveSale[] = $data;
		}	
	}	
		
	echo json_encode($loadingArchiveSale);
?>