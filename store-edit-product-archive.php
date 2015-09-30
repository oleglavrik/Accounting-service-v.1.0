<?php 
	/*
		[АРХІВ]
		* Скрипт редагування інформації про товар в архіві,
		* зміненої вже користувачем, це запис в БД вже редагованої інформації про продукт.
	*/
	# скрипт security
	require_once("security.php");
	# Отримуємо відредаговані дані про продукт
	$userLevel = $_POST['level'];
	$idShop = $_POST['idShop'];
	$id = $_POST['id'];
	$nameProduct = $_POST['productName'];
	$typeProduct = $_POST['productType'];
	$dateOfPurchase = $_POST['dateOfPurchase'];
	$barCode = $_POST['editBarCode'];
	$productSimple = $_POST['editProductSimple'];
	$weight = $_POST['editWeight'];
	$size = $_POST['editSize'];
	$inputPrice = $_POST['inputPrice'];
	$startingPrice = $_POST['startingPrice'];
	
	# запит в БД для оновлення інформації про продукт
	$editInfoQuery = "UPDATE store SET 
										productName = '".mysql_real_escape_string($nameProduct)."',
										itemType = '".mysql_real_escape_string($typeProduct)."',
										dateOfPurchase = '".mysql_real_escape_string($dateOfPurchase)."',
										barCode = '".mysql_real_escape_string($barCode)."',
										productSimple = '".mysql_real_escape_string($productSimple)."',
										weight = '".mysql_real_escape_string($weight)."',
										size = '".mysql_real_escape_string($size)."',
										inputPrice = '".mysql_real_escape_string($inputPrice)."',
										startingPrice = '".mysql_real_escape_string($startingPrice)."' 
									WHERE id='".mysql_real_escape_string($id)."' LIMIT 1 ";
					 
	$editInfoQuery = mysql_query($editInfoQuery);

	# запит в БД для отримання оновленої інформації для побудови нової таблиці продуктів певного магазину
	$updatingInfo = "SELECT typesofproducts.idProductType, store.idShop, store.productName, store.dateOfPurchase, store.inputPrice, store.startingPrice, store.itemType, store.id, store.barCode, store.productSimple, store.weight, store.size, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale = '0000-00-00' and store.archiveStatus = '1' and store.idShop = '".mysql_real_escape_string($idShop)."' ORDER BY store.productName";
	$updatingInfo = mysql_query($updatingInfo);

	# заносимо дані отримані з БД в масив товарів
	for($i=0; $i<mysql_num_rows($updatingInfo); $i++)
	{
		$productsInfo[] = mysql_fetch_array($updatingInfo, MYSQL_ASSOC);
	}
	
	# Формуємо відповідь
	echo json_encode($productsInfo);


	
?>