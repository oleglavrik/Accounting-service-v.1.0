<?php 
	# скрипт обролбник додавання нового продукту
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$IDShop = $_POST['nShopID'];
	$productName = $_POST['nProductName'];
	$productType = $_POST['nProducType'];
	$productDateOfPurchase = $_POST['nProductDateOfPurchase'];
	$productBarCode = $_POST['nProductBarCode'];
	$productProductSimple = $_POST['nProductProductSimple'];
	$productWeight = $_POST['nProductWeight'];
	$productSize = $_POST['nProductSize'];
	$productInputPrice = $_POST['nProductInputPrice'];
	$productOutputPrice = $_POST['nProductOutputPrice'];

	# виконуємо запит до БД
	$addSql = 'INSERT INTO store (
									idShop,
									productName,
									itemType,
									dateOfPurchase,
									barCode,
									productSimple,
									weight,
									size,
									inputPrice,
									startingPrice)
							values(
									'.mysql_real_escape_string($IDShop).',
									"'.mysql_real_escape_string($productName).'",
									'.mysql_real_escape_string($productType).',
									"'.mysql_real_escape_string($productDateOfPurchase).'",
									"'.mysql_real_escape_string($productBarCode).'",
									'.mysql_real_escape_string($productProductSimple).',
									'.mysql_real_escape_string($productWeight).',
									'.mysql_real_escape_string($productSize).', 
									'.mysql_real_escape_string($productInputPrice).', 
									'.mysql_real_escape_string($productOutputPrice).'
								)';
	$addSqlQuery = mysql_query($addSql);
	# виконуємо запит на оновлення таблиці товарів
	$updateStore = "SELECT 
							store.id, 
							store.idShop, 
							store.productName, 
							store.dateOfPurchase, 
							store.inputPrice, 
							store.startingPrice, 
							store.itemType, 
							store.barCode, 
							store.productSimple, 
							store.weight, 
							store.size, 
							typesofproducts.idProductType, 
							typesofproducts.productTypesDescription
						FROM store 
						LEFT JOIN typesofproducts 
						ON store.itemType = typesofproducts.idProductType 
						WHERE store.dateOfSale = '0000-00-00' AND 
						store.archiveStatus = '0' AND
						store.idShop = '".mysql_real_escape_string($IDShop)."' ORDER BY store.productName";
	$updateStore = mysql_query($updateStore);
	
	# перевіряємо чи існують дані, якщо ні то, вказуємо що таблиця архівів пуста, інакше заносимо дані по товарах в масив
	if(mysql_num_rows($updateStore) == '0')
	{
		$updateProduct['errorType'] = "Не має жодного товару";
	}else
	{
		# заносимо дані отримані з БД в масив товарів
		for($i=0; $i<mysql_num_rows($updateStore); $i++)
		{
			$updateProduct[] = mysql_fetch_array($updateStore, MYSQL_ASSOC);
		}	
	}
	echo json_encode($updateProduct);
?>	