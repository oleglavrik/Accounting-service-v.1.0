<?php
	/*
		* Скрипт обробник, видалення продуктів зі складу
	*/
	# скрипт security
	require_once("security.php");
	# отримуємо ID продукта який будемо видаляти
	$productID = $_POST['productId'];
	# Виконуємо запит на видалення продукту по його ID
	$deleteProduct = 'DELETE FROM store WHERE id="'.mysql_real_escape_string($productID).'"';
	$deleteProduct = mysql_query($deleteProduct);
	# відповідь
	echo json_encode($deleteProduct);
?>