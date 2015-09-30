<?php
	# скрипт обробник повернення продукту на склад
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні данні
	$backProductID = $_POST['backProductID'];
	# проводимо sql запит
	$backSql = 'UPDATE store SET dateOfSale = "0000-00-00", salePrice = "0", idCustomer = "0" WHERE id = "'.mysql_real_escape_string($backProductID).'"';
	$backSql = mysql_query($backSql);
	echo json_encode($backSql);
?>