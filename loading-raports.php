<?php
	# Скрипт обробник завантаження при обновленні/завантаженні сторінки "ЗВІТИ"
	# скрипт security
	require_once("security.php");
	# Приймаємо вхідні данні
	$magazine = $_POST['magazine'];
	$startDate = $_POST['startDate'];
	$endDate = $_POST['endDate'];
	$level = $_POST['level'];
	# взалежності від рівня доступу виконуємо різні запити
	if($level == '0')
	{
		$raportQuery = "SELECT store.id, store.productName, store.dateOfPurchase, store.dateOfSale, store.startingPrice, store.inputPrice, store.salePrice, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale >= '".mysql_real_escape_string($startDate)."' AND  store.dateOfSale <= '".mysql_real_escape_string($endDate)."' AND store.idShop = '".mysql_real_escape_string($magazine)."' ORDER BY dateOfSale ASC";
	}
	else if ($level == '1')
	{
		$raportQuery = "SELECT store.id, store.productName, store.dateOfPurchase, store.dateOfSale, store.salePrice, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.dateOfSale >= '".mysql_real_escape_string($startDate)."' AND store.dateOfSale <= '".mysql_real_escape_string($endDate)."' AND store.idShop = '".mysql_real_escape_string($magazine)."' ORDER BY dateOfSale ASC";	

	}
	# створює багатомірний масив
	$raportsProducts['0'] = array();
	$raportsProducts['1'] = array();
	# перевірка на існування товарів в межах діапазону дат	
	$raportQuery = mysql_query($raportQuery);
	if(mysql_num_rows($raportQuery) == '0')
	{
		# якщо товарів немає записуємо помилку
		$raportsProducts['0']['errorType'] = "Не продано жодного товару";
	}else
	{
		# заносимо існуючі дані
		for ($i=0; $i < mysql_num_rows($raportQuery); $i++) { 
			$raportsProducts['0'][] = mysql_fetch_array($raportQuery, MYSQL_ASSOC);
		}
	}

	# виклнуємо запит на отримання загальної ціни на витрати 
	$costsPriceQuery = 'SELECT price FROM costs WHERE date >= "'.mysql_real_escape_string($startDate).'" AND date <= "'.mysql_real_escape_string($endDate).'" AND idShop = "'.mysql_real_escape_string($magazine).'" '; 
	$costsPriceQuery = mysql_query($costsPriceQuery);

	# перевірка на існування витрат в діапазоні дат
	if(mysql_num_rows($costsPriceQuery) == '0')
	{
		$raportsProducts['1']['errorType'] = "Витрат немає";	
	}else
	{
		# заносимо існуючі дані
		for ($k=0; $k < mysql_num_rows($costsPriceQuery); $k++) { 
			$raportsProducts['1'][] = mysql_fetch_array($costsPriceQuery, MYSQL_ASSOC);
		}	
	}
	echo json_encode($raportsProducts);
?>