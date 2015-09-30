<?php
	# Скрипт-обробник добавлення нового магазину
	# скрипт security
	require_once("security.php");
	# отримуємо вхідні дані
	$magazineName = $_POST['magazineName'];
	$typesProducts = $_POST['typesProducts'];
	# перевіряємо чи вхідні дані не пусті
	if($magazineName != '')
	{
		# виконуємо допи до БД
		$newMagazineQuery = 'INSERT INTO shops (name)VALUES("'.mysql_real_escape_string($magazineName).'")';
		$newMagazineQuery = mysql_query($newMagazineQuery);
		
		# отримуємо ід даного магазину
		$IDMagazine = 'SELECT id FROM shops WHERE name = "'.mysql_real_escape_string($magazineName).'"';
		$IDMagazine = mysql_query($IDMagazine);
		while($info = mysql_fetch_array($IDMagazine))
		{
			$newMagazineID = $info;
		}

		# вносимо типи продуктів для нового магазину
		for($i = 0; $i < count($typesProducts); $i++)
		{
			$magazineTypes = 'INSERT INTO typesofproducts (productTypesDescription, shopId)VALUES("'.mysql_real_escape_string($typesProducts[$i]).'", "'.mysql_real_escape_string($newMagazineID['id']).'")';
			$magazineTypes = mysql_query($magazineTypes);
		}	

		# запит на виведення обновленої таблиці
		$magazinesQuery = "SELECT * FROM shops ORDER BY NAME DESC";
		$magazinesQuery = mysql_query($magazinesQuery);
		while($data = mysql_fetch_array($magazinesQuery)) {
		 	$magazinesList[] = $data;
		}
		
	}
	
	echo json_encode($magazinesList);
?>