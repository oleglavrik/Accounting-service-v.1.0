<?php
	/*	
		* Скрипт загрузки даних з магазину який вибраний в селекті або первинна загрузка сторінки, [АРХІВ, ЦЕ СКЛАД ТОВАРІВ ЯКІ ЗАНЕСЕННІ В АРХІВ]
		* приймається значення вибраного селекта магазину або загруженого при первинні загрузці сторінці
		* обробляєтся, проводиться вибірка з БД і заноситься в масив, 
		* масив виводяьбся в шаблоні [store.tpl]	
	*/
	# скрипт security
	require_once("security.php");
	# Отримуэмо вхідні дані [ID магазину] [рівень доступу користувача]
	$magazine = $_POST['loadMagazine'];
	$userLevel = $_POST['level'];
	if($userLevel == '0')
	{
		// виконуэмо запит для адміна
		# Виводимо не продані речів в склад [dateOfSale = 0000-00-00]
		$querySaleArchive = "SELECT store.id, store.idShop, store.productName, store.dateOfPurchase, store.inputPrice, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale = '0000-00-00' AND store.archiveStatus = '1' AND store.idShop = '".$magazine."' ORDER BY store.productName";
	}elseif ($userLevel == '1')
	{
		// виконуємо запит для модератора
		# Виводимо не продані речів в склад [dateOfSale = 0000-00-00]
		$querySaleArchive = "SELECT store.id, store.idShop, store.productName, store.dateOfPurchase, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale = '0000-00-00' AND store.archiveStatus = '1' AND store.idShop = '".$magazine."' ORDER BY store.productName";
	}	
	
	//$querySale = "SELECT id, idShop, art, productName, dateOfPurchase, inputPrice, startingPrice FROM store WHERE dateOfSale = 0 and idShop = '".$magazine."' "; 
	$querySaleArchive = mysql_query($querySaleArchive);
	// перевіряємо чи існують дані, якщо ні то, вказуємо що таблиця архівів пуста, інакше заносимо дані по товарах в масив
	if(mysql_num_rows($querySaleArchive) == '0')
	{
		$productsSale['errorType'] = "Не занесено жодного товару в архів";
	}else
	{
		#заносимо дані отримані з БД в масив товарів
		for($i=0; $i<mysql_num_rows($querySaleArchive); $i++)
		{
			$productsSale[] = mysql_fetch_array($querySaleArchive, MYSQL_ASSOC);
		}
	}	
		
	# Формуємо відповідь в store.js
	echo json_encode($productsSale);
?>
