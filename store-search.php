<?php
	// Скрипт обробник пошуку по складу
	# скрипт security
	require_once("security.php");
	# приймаємо пошуковий запит
	$searchString = trim($_POST['searchString']);
	$magazine = trim($_POST['magazine']);
	$userLevel = $_POST['level'];

	# взалежності від рівня доступу користувача виконуємо різні sql запити
	if($userLevel == '0')
	{
		// ВИБІРКА ДЛЯ АДМІНА
		# формуємо пошуковий запит до БД
		$sql = "SELECT  store.id, store.idShop, store.productName, store.dateOfPurchase, store.dateOfSale, store.salePrice, store.inputPrice, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType,  typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.idShop = '".mysql_real_escape_string($magazine)."' AND  store.productName LIKE '%".mysql_real_escape_string($searchString)."%' OR store.barCode LIKE '%".mysql_real_escape_string($searchString)."%' OR store.dateOfPurchase LiKE STR_TO_DATE('".mysql_real_escape_string($searchString)."', '%Y-%m-%d') ORDER BY store.productName";
	}elseif($userLevel == '1')
	{
		// ВИБІРКА ДЛЯ МОДЕРАТОРА
		# формуємо пошуковий запит до БД
		$sql = "SELECT  store.id, store.idShop, store.productName, store.dateOfPurchase, store.dateOfSale, store.salePrice, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType,  typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.idShop = '".mysql_real_escape_string($magazine)."' AND  store.productName LIKE '%".mysql_real_escape_string($searchString)."%' OR store.barCode LIKE '%".mysql_real_escape_string($searchString)."%' OR store.dateOfPurchase LiKE STR_TO_DATE('".mysql_real_escape_string($searchString)."', '%Y-%m-%d') ORDER BY store.productName";
	}	
	
	
	$sqlQuery = mysql_query($sql);
	if(mysql_num_rows($sqlQuery) == '0')
	{
		$searchProductsInfo['errorType'] = "Не Знайдено жодного товару, спробуйте інший пошуковий запит";
	}else
	{
		# заносимо дані отримані з БД в масив товарів
		for($i=0; $i<mysql_num_rows($sqlQuery); $i++)
		{
			$searchProductsInfo[] = mysql_fetch_array($sqlQuery, MYSQL_ASSOC);
		}
	}	
	
	# Формуємо відповідь
	echo json_encode($searchProductsInfo);
?>