<?php 
	# Скрипт обробник масового видалення продуктів зі архіву продаж
	# скрипт security
	require_once("security.php");
	# приймаємо вхідні дані
	$productIDArray = $_POST['deleteIDProducts'];
	for($i = 0; $i < count($productIDArray); $i++)
	{
		$deleteQuery = 'DELETE FROM store WHERE id="'.mysql_real_escape_string($productIDArray[$i]).'"';
		$deleteQuery = mysql_query($deleteQuery);
	}
	echo json_encode($deleteQuery);
?>