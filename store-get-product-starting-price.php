<?php
	# Скрипт обробник який отримує вихідну ціну для певного товару по його ID, використовуэться при продажі товару
	# скрипт security
	require_once("security.php");
	# отримуємо вхідні дані
	$productID = $_POST['sPriceProductID'];
	# проводимо запит до БД
	$sql = "SELECT startingPrice FROM store WHERE id = '".mysql_real_escape_string($productID)."'";
	$sqlQuery = mysql_query($sql);
	$productStartingPrice = mysql_fetch_array($sqlQuery);
	# відповідь в JS
	echo json_encode($productStartingPrice);
?>
