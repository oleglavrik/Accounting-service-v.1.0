<?php
	# Срипт обробник, відправляємо продукт/продукти в архів
	# скрипт security
	require_once("security.php");
	# Приймаємо вхідні дані
	$productIDArray = $_POST['archivIdProducts'];
	$userLevel = $_POST['level'];
	# Цикл запису в архів
	for($i = 0; $i < count($productIDArray); $i++)
	{
			# записуємо товар до архіву
			$archivQuery = 'UPDATE store SET archiveStatus = "1" WHERE id = "'.mysql_real_escape_string($productIDArray[$i]).'"';
			$archivQuery = mysql_query($archivQuery);
			# перевірка рівня доступу користувача, взалежності від рівня користувача виконуємо різні запити
			if($userLevel == '0')
			{
				# ВИБІРКА ДЛЯ АДМІНА
				# Вибірка даних про продукт(и) для передачі в JS і перевід в таблицю архіву
				$archivIdProductQuery = 'SELECT typesofproducts.idProductType, store.productName, store.dateOfPurchase, store.inputPrice, store.startingPrice, store.itemType, store.id, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = "'.mysql_real_escape_string($productIDArray[$i]).'" ORDER BY store.productName';
			}elseif($userLevel == '1') 
			{
				# ВИБІРКА ДЛЯ МОДЕРАТОРА
				# Вибірка даних про продукт(и) для передачі в JS і перевід в таблицю архіву
				$archivIdProductQuery = 'SELECT typesofproducts.idProductType, store.productName, store.dateOfPurchase, store.startingPrice, store.itemType, store.id, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = "'.mysql_real_escape_string($productIDArray[$i]).'" ORDER BY store.productName';
			}	
			
			$archivIdProductQuery = mysql_query($archivIdProductQuery);
			#заносимо дані отримані з БД в масив товарів для виводу в таблицю товарів
			for($k = 0; $k < mysql_num_rows($archivIdProductQuery); $k++)
			{
				$archiveProduct[] = mysql_fetch_array($archivIdProductQuery, MYSQL_ASSOC);
			}

	}
	# формуємо відповіль json
	echo json_encode($archiveProduct);

?>