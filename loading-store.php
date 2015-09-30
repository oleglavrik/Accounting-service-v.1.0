<?php 
	/*	
		* Скрипт загрузки даних з магазину який вибраний в селекті або первинна загрузка сторінки, [НЕ АРХІВНИЙ]
		* приймається значення вибраного селекта магазину або загруженого при первинні загрузці сторінці
		* обробляєтся, проводиться вибірка з БД і заноситься в масив, 
		* масив виводяьбся в шаблоні [store.tpl]	
	*/
	# скрипт security
	require_once("security.php");
	# Прийом значення назви магазину
	$magazine = $_POST['magazine'];
	$userLevel = $_POST['level'];
	# перевірка рівня доступу користувача, в залежності від рівня доступу виконуємо різні запити
	if($userLevel == '0')
	{
		# Виводимо не продані речів в склад [dateOfSale = 0000-00-00 для адміна]
		$querySale = "SELECT  store.id, store.idShop, store.productName, store.dateOfPurchase, store.inputPrice, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale = '0000-00-00' AND store.archiveStatus = '0' AND store.idShop = '".$magazine."' ORDER BY store.productName";
	}elseif($userLevel == '1')
	{
		# Виводимо не продані речів в склад [dateOfSale = 0000-00-00 для модератора]
		$querySale = "SELECT  store.id, store.idShop, store.productName, store.dateOfPurchase, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale = '0000-00-00' AND store.archiveStatus = '0' AND store.idShop = '".$magazine."' ORDER BY store.productName";
	}	
	
	$querySale = mysql_query($querySale);

	# перевіряємо чи існують дані, якщо ні то, вказуємо що таблиця архівів пуста, інакше заносимо дані по товарах в масив
	if(mysql_num_rows($querySale) == '0')
	{
		$productsSale['errorType'] = "Не має жодного товару";
	}else
	{
		# заносимо дані отримані з БД в масив товарів
		for($i=0; $i<mysql_num_rows($querySale); $i++)
		{
			$productsSale[] = mysql_fetch_array($querySale, MYSQL_ASSOC);
		}	
	}

	# формуємо відповідь
	echo json_encode($productsSale);
?>