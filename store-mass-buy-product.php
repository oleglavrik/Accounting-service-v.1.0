<?php 
	# Скрипт обробник, масової поккупки товарів на складі
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні дані
	$productIDArray = $_POST['massIDArray'];
	$productDateOfSaleArray = $_POST['massDateArray'];
	$productPriceArray = $_POST['massPraceArray'];
	$customerID = $_POST['customerID'];
	for($i = 0; $i < count($productIDArray); $i++)
	{
		$buyQuery = 'UPDATE store SET dateOfSale = "'.mysql_real_escape_string($productDateOfSaleArray[$i]).'", salePrice = "'.mysql_real_escape_string($productPriceArray[$i]).'", idCustomer = "'.mysql_real_escape_string($customerID).'" WHERE id = "'.mysql_real_escape_string($productIDArray[$i]).'"';
		$buyQuery = mysql_query($buyQuery);
	}
	echo json_encode($buyQuery);

?>