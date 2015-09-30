<?php
	# скрипт обробник отримання типів товарів для поточного магазину, використання добавлення нового товару
	# скрипт security
	require_once("security.php");
	# отримаэмо вхідні дані
	$idShop = $_POST['shopID'];
	// виконуємо і обробляємо запит до БД
	$magazineTypeQuery = "SELECT typesofproducts.idProductType, typesofproducts.productTypesDescription FROM typesofproducts WHERE shopId = '".mysql_real_escape_string($idShop)."'";
	$magazineTypeQuery = mysql_query($magazineTypeQuery);
	// заносимо отриманні данні в масив 
	for($i = 0; $i < mysql_num_rows($magazineTypeQuery); $i++)
	{
		$magType[] = mysql_fetch_array($magazineTypeQuery, MYSQL_ASSOC);
	}
	// формуємо відповідь в js
	echo json_encode($magType);

?>