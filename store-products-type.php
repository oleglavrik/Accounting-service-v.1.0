<?php
	/*
		* Скрипт обробник який виягує типи товарі для конкретного магазину
	*/
	# скрипт security
	require_once("security.php");
	# отримуємо вхідні дані
	$productID = $_POST['productID'];
	$magazine = $_POST['magazineID'];
	$productType = "SELECT typesofproducts.idProductType, typesofproducts.productTypesDescription FROM store LEFT JOIN typesofproducts ON store.itemType = typesofproducts.idProductType WHERE store.id = '".$productID."' ";
	$row = mysql_query($productType);
	$data = array();
	for($i = 0; $i < mysql_num_rows($row); $i++)
	{
		$data[] = mysql_fetch_array($row, MYSQL_ASSOC);
	}
	$magazineTypeQuery = "SELECT typesofproducts.idProductType, typesofproducts.productTypesDescription FROM typesofproducts WHERE shopId = '".$magazine."' ";
	$magazineTypeQuery = mysql_query($magazineTypeQuery);
	for($i = 0; $i < mysql_num_rows($magazineTypeQuery); $i++)
	{
		$magType[] = mysql_fetch_array($magazineTypeQuery, MYSQL_ASSOC);
	}
	$data = array_merge($data, $magType);
	$result = array_reduce($data, function($a, $b) {
	    static $stored = array();
	    
	    $hash = md5(serialize($b));
	    
	    if (!in_array($hash, $stored)) {
	        $stored[] = $hash;
	        $a[] = $b;
	    }
	    
	    return $a;
	}, array());
	# Перевід назви магазину з строки в число
	/*$typeQuery = "SELECT * FROM bugaltery.typesofproducts WHERE shopId = '".$magazine."' ";
	$typeQuery = mysql_query($typeQuery);
	for($i = 0; $i < mysql_num_rows($typeQuery); $i++)
	{
		$data[] = mysql_fetch_array($typeQuery, MYSQL_ASSOC);
	}
	echo json_encode($data);
	*/
	echo json_encode($result);
?>