<?php
	# Скрипт видалення магазину в налаштуваннях для адміна
	# скрипт security
	require_once("security.php");
	# отримуємо вхідні данні
	$magazineID = $_POST['magazineID'];
	#виконуємо запит до БД
	$deleteQuery = 'DELETE FROM shops WHERE id="'.mysql_real_escape_string($magazineID).'"';
	$deleteQuery = mysql_query($deleteQuery);
	# видалємо типи продуктів з БД
	$deleteTypesProducts = 'DELETE FROM typesofproducts WHERE shopId = "'.mysql_real_escape_string($magazineID).'"';
	$deleteTypesProducts = mysql_query($deleteTypesProducts);
	echo json_encode($deleteQuery);
?>