<?php
	# Скрипт обробник розархівації продуктів на складі
	# скрипт security
	require_once("security.php");
	# Приймаємо вхідні дані
	$productIDArray = $_POST['unArchiveIDProducts'];
	$userLevel = $_POST['level'];
	# Цикл цикл розархівування
	for($i = 0; $i < count($productIDArray); $i++)
	{
			# розархівовуємо поточний товар
			$unArchivQuery = 'UPDATE store SET archiveStatus = "0" WHERE id = "'.mysql_real_escape_string($productIDArray[$i]).'"';
			$unArchivQuery = mysql_query($unArchivQuery);

			# перевірка рівня доступу для користувача, в залежності від рівня доступу виконуємо різні запити
			if($userLevel == '0')
			{
				// ВИБІРКА ДЛЯ АДМІНА
				# Вибірка даних про продукт(и) для передачі в JS і перевід в таблицю простих товарів
				$unArchivIdProductQuery =  'SELECT typesofproducts.idProductType, store.productName, store.dateOfPurchase, store.inputPrice, store.startingPrice, store.itemType, store.id, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = "'.mysql_real_escape_string($productIDArray[$i]).'" ORDER BY store.productName';
			}elseif($userLevel == '1') 
			{
				// ВИБІРКА ДЛЯ МОДЕРАТОРА
				# Вибірка даних про продукт(и) для передачі в JS і перевід в таблицю простих товарів
				$unArchivIdProductQuery =  'SELECT typesofproducts.idProductType, store.productName, store.dateOfPurchase, store.startingPrice, store.itemType, store.id, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = "'.mysql_real_escape_string($productIDArray[$i]).'" ORDER BY store.productName';
			}	
			
			$unArchivIdProductQuery = mysql_query($unArchivIdProductQuery);
			#заносимо дані отримані з БД в масив товарів для виводу в таблицю товарів
			for($k=0; $k<mysql_num_rows($unArchivIdProductQuery); $k++)
			{
				$unArchiveProduct[] = mysql_fetch_array($unArchivIdProductQuery, MYSQL_ASSOC);
			}
	}
	# формуємо поточну відповідь
	echo json_encode($unArchiveProduct);
?>