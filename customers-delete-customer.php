<?php
	# скрипт обробник видаення клієнта
	# скрипт security
	require_once("security.php");
	# отримуємо ID продукта який будемо видаляти
	$level = $_POST['level'];
	$productID = $_POST['productID'];
	# перевірка на рівень доступу
	if($level == '0')
	{
		# Виконуємо запит на видалення клієнта по його ID
		$deleteQuery = 'DELETE FROM customers WHERE id="'.mysql_real_escape_string($productID).'"';
		$deleteQuery = mysql_query($deleteQuery);
	}else
	{
		$deleteQuery = false;
	}	
	
	# відповідь
	echo json_encode($deleteQuery);
?>