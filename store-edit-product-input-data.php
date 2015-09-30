<?php 
	/*
		* Скрипт отримання даних про продукт з БД
		* підчас редагування продукту
	*/
	# скрипт security
	require_once("security.php");
	# приймаємо ід продукта для редагування
	$editProductID = $_POST['productID'];
	$level = $_POST['level'];
	# перевірка рівня доступу користувача, взалежності від рівня доступу виконуємо різні запити
	if($level == '0')
	{
		# Виконуємо запит до БД і отримуємо інформацію про продукт
		$editProductQuery = "SELECT store.id, store.idShop, store.productName, store.dateOfPurchase, store.inputPrice, store.startingPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = '".$editProductID."'";
	}elseif($level == '1') 
	{
		# Виконуємо запит до БД і отримуємо інформацію про продукт
		$editProductQuery = "SELECT store.id, store.idShop, store.productName, store.dateOfPurchase, store.inputPrice, store.itemType, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = '".$editProductID."'";
	}	
	
	$editProductQuery = mysql_query($editProductQuery);
	# заносимо дані отримані з БД в масив товарів
	$editProductInfo = array();
	for($i = 0; $i < mysql_num_rows($editProductQuery); $i++)
	{
		$editProductInfo = mysql_fetch_array($editProductQuery, MYSQL_ASSOC);
	}
	
	# Формуємо відповідь в js
	echo json_encode($editProductInfo);
?>